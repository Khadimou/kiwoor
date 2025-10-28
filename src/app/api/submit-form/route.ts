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

    const formData: FormData = await request.json();
    
    // Configuration Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID not configured');
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

    let rowData: string[];
    let sheetName: string;
    let range: string;

    // Handle different form types
    if (formData.type === 'micro') {
      // Micro-lead format (simplified)
      const microData = formData as MicroLeadData;
      sheetName = 'MicroLeads';
      range = `${sheetName}!A:J`;
      
      rowData = [
        timestamp,
        'micro',
        variant,
        microData.role,
        microData.city,
        microData.contact,
        utmSource,
        utmMedium,
        utmCampaign,
        JSON.stringify(formData.utm || {}),
      ];
    } else {
      // Full form format (existing)
      const fullData = formData as FullFormData;
      const leadType = fullData.type || 'full';
      sheetName = fullData.userType === 'diaspora' ? 'Diaspora' : 'Locaux';
      range = `${sheetName}!A:U`;
      
      rowData = [
        timestamp,
        fullData.userType,
        leadType,
        variant,
        fullData.fullName,
        fullData.email,
        fullData.phone,
        fullData.country,
        fullData.jobType || '',
        fullData.location || '',
        fullData.salary || '',
        fullData.startDate || '',
        fullData.urgency || '',
        fullData.experience || '',
        fullData.availability || '',
        fullData.hasReferences || '',
        fullData.willingToPay || '',
        fullData.maxBudget || '',
        fullData.mainConcern || '',
        fullData.comments || '',
        utmSource,
      ];
    }

    // Ajouter la ligne à la feuille
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData]
      }
    });

    console.log(`✅ Lead saved to ${sheetName} (type: ${formData.type || 'full'}, variant: ${variant})`);

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
