import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

interface BaseFormData {
  type?: 'micro' | 'full';
  variant?: string;
  utm?: Record<string, string>;
}

interface MicroLeadData extends BaseFormData {
  type: 'micro';
  role: string;
  city: string;
  contact: string;
}

interface FullFormData extends BaseFormData {
  type?: 'full';
  userType: 'diaspora' | 'local';
  fullName: string;
  email: string;
  phone: string;
  country: string;
  jobType?: string;
  location?: string;
  salary?: string;
  startDate?: string;
  urgency?: string;
  experience?: string;
  availability?: string;
  hasReferences?: string;
  willingToPay?: string;
  maxBudget?: string;
  mainConcern?: string;
  comments?: string;
}

type FormData = MicroLeadData | FullFormData;

export async function POST(request: NextRequest) {
  try {
    // Feature flag: allow disabling direct Google Sheets writes in production
    if (process.env.NEXT_PUBLIC_USE_SHEETS !== 'true') {
      return NextResponse.json({
        success: true,
        message: 'Sheets write disabled (using Zapier only)',
      });
    }

    const formData: any = await request.json();
    
    // Configuration Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Choose target spreadsheet by payload type
    const spreadsheetIdDiaspora = process.env.GOOGLE_SHEETS_SPREADSHEET_ID_DIASPORA || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const spreadsheetIdCandidats = process.env.GOOGLE_SHEETS_SPREADSHEET_ID_CANDIDATS || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    const isDiaspora = formData?.type === 'diaspora';
    const isCandidats = formData?.type === 'candidats';

    const spreadsheetId = isDiaspora ? spreadsheetIdDiaspora : isCandidats ? spreadsheetIdCandidats : (process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '');

    if (!spreadsheetId) {
      throw new Error('No target spreadsheet ID configured');
    }

    // Timestamp
    const timestamp = new Date().toLocaleString('fr-FR', {
      timeZone: 'Africa/Dakar',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Extract variant and UTM
    const variant = formData.variant || 'default';
    const utmSource = formData.utm?.utm_source || '';
    const utmMedium = formData.utm?.utm_medium || '';
    const utmCampaign = formData.utm?.utm_campaign || '';

    // Determine worksheet title (first sheet) dynamically
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetTitle = meta.data.sheets?.[0]?.properties?.title || 'Sheet1';

    // Build row according to simplified schemas
    let rowData: any[];
    if (isDiaspora) {
      // Headers expected (suggested): Timestamp | Type | Name | Email | Phone | Role | City | Country | ActivityType | Budget | Variant | Source | NotifiedAt
      rowData = [
        timestamp,
        'diaspora',
        formData.name || '',
        formData.email || '',
        formData.phone || formData.contact || '',
        formData.role || '',
        formData.city || '',
        formData.country || '',
        formData.activityType || '',
        formData.budget || '',
        variant,
        formData.source || 'website',
        formData.notifiedAt || new Date().toISOString(),
      ];
    } else if (isCandidats) {
      // Headers expected (suggested): Timestamp | Type | Name | Email | Phone | Role/Profil | City | Experience | Availability | Skills | Variant | Source | NotifiedAt
      rowData = [
        timestamp,
        'candidats',
        formData.name || '',
        formData.email || '',
        formData.phone || formData.contact || '',
        formData.role || '',
        formData.city || '',
        formData.experience || '',
        formData.availability || '',
        formData.skills || '',
        variant,
        formData.source || 'website',
        formData.notifiedAt || new Date().toISOString(),
      ];
    } else if (formData.type === 'micro') {
      rowData = [
        timestamp,
        'micro',
        variant,
        formData.role || '',
        formData.city || '',
        formData.contact || '',
        utmSource,
        utmMedium,
        utmCampaign,
        JSON.stringify(formData.utm || {}),
      ];
    } else {
      // Fallback
      rowData = [timestamp, 'unknown', variant, JSON.stringify(formData)];
    }

    // Ajouter la ligne à la feuille
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetTitle}!A:Z`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
      insertDataOption: 'INSERT_ROWS',
      includeValuesInResponse: false,
    });

    console.log(`✅ Lead saved (type: ${formData.type || 'unknown'}) to sheet ${sheetTitle}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Données sauvegardées avec succès',
      type: formData.type || 'full',
      variant: variant,
    });

  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de la sauvegarde des données',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
