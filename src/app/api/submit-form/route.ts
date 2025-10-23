import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

interface FormData {
  userType: 'diaspora' | 'local';
  fullName: string;
  email: string;
  phone: string;
  country: string;
  jobType: string;
  location: string;
  salary: string;
  startDate: string;
  urgency: string;
  experience: string;
  availability: string;
  hasReferences: string;
  willingToPay: string;
  maxBudget: string;
  mainConcern: string;
  comments: string;
}

export async function POST(request: NextRequest) {
  try {
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

    // Préparer les données pour Google Sheets
    const timestamp = new Date().toLocaleString('fr-FR', {
      timeZone: 'Africa/Dakar',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const rowData = [
      timestamp,
      formData.userType,
      formData.fullName,
      formData.email,
      formData.phone,
      formData.country,
      formData.jobType || '',
      formData.location || '',
      formData.salary || '',
      formData.startDate || '',
      formData.urgency || '',
      formData.experience || '',
      formData.availability || '',
      formData.hasReferences || '',
      formData.willingToPay || '',
      formData.maxBudget || '',
      formData.mainConcern || '',
      formData.comments || ''
    ];

    // Déterminer la feuille selon le type d'utilisateur
    const sheetName = formData.userType === 'diaspora' ? 'Diaspora' : 'Locaux';
    
    // Ajouter la ligne à la feuille
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:R`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData]
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Données sauvegardées avec succès' 
    });

  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
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
