const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function setupGoogleSheets() {
  try {
    console.log('🔧 Configuration de Google Sheets...');

    // Configuration de l'authentification
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
      throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID non configuré dans .env.local');
    }

    // En-têtes pour la feuille Diaspora (UPDATED avec lead_type, variant, utm)
    const diasporaHeaders = [
      'Timestamp',
      'Type User',
      'Lead Type',
      'Variant',
      'Nom complet',
      'Email',
      'Téléphone',
      'Pays',
      'Type de poste',
      'Localisation Sénégal',
      'Salaire',
      'Date de début',
      'Urgence',
      'Expérience',
      'Disponibilité',
      'Références',
      'Prêt à payer',
      'Budget max',
      'Préoccupation principale',
      'Commentaires',
      'UTM Source'
    ];

    // En-têtes pour la feuille Locaux (UPDATED)
    const localHeaders = [
      'Timestamp',
      'Type User',
      'Lead Type',
      'Variant',
      'Nom complet',
      'Email',
      'Téléphone',
      'Région',
      'Type de poste recherché',
      'Localisation',
      'Salaire souhaité',
      'Date de début',
      'Urgence',
      'Expérience',
      'Disponibilité',
      'Références',
      'Prêt à payer',
      'Budget max',
      'Préoccupation principale',
      'Commentaires',
      'UTM Source'
    ];

    // En-têtes pour la nouvelle feuille MicroLeads
    const microLeadsHeaders = [
      'Timestamp',
      'Type',
      'Variant',
      'Poste recherché',
      'Ville',
      'Contact',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'UTM Full'
    ];

    // Vérifier les onglets existants et créer ceux manquants
    console.log('📊 Vérification des onglets...');
    
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const existingSheets = spreadsheet.data.sheets.map(sheet => sheet.properties.title);
    console.log('📋 Onglets existants:', existingSheets);

    // Créer l'onglet "Locaux" s'il n'existe pas
    if (!existingSheets.includes('Locaux')) {
      console.log('➕ Création de l\'onglet "Locaux"...');
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: 'Locaux'
              }
            }
          }]
        }
      });
    }

    // Créer l'onglet "MicroLeads" s'il n'existe pas
    if (!existingSheets.includes('MicroLeads')) {
      console.log('➕ Création de l\'onglet "MicroLeads"...');
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: 'MicroLeads'
              }
            }
          }]
        }
      });
    }

    // Ajouter les en-têtes à la feuille Diaspora
    console.log('📝 Configuration de l\'onglet "Diaspora"...');
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Diaspora!A1:U1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [diasporaHeaders]
      }
    });

    // Ajouter les en-têtes à la feuille Locaux
    console.log('📝 Configuration de l\'onglet "Locaux"...');
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Locaux!A1:U1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [localHeaders]
      }
    });

    // Ajouter les en-têtes à la feuille MicroLeads
    console.log('📝 Configuration de l\'onglet "MicroLeads"...');
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'MicroLeads!A1:J1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [microLeadsHeaders]
      }
    });

    // Mettre en forme les en-têtes
    console.log('🎨 Mise en forme des en-têtes...');
    
    // Récupérer les IDs des onglets après création
    const updatedSpreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const formatRequests = updatedSpreadsheet.data.sheets.map(sheet => ({
      repeatCell: {
        range: {
          sheetId: sheet.properties.sheetId,
          startRowIndex: 0,
          endRowIndex: 1,
          startColumnIndex: 0,
          endColumnIndex: 25 // Enough columns for all sheets
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.2, green: 0.6, blue: 0.2 },
            textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } }
          }
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat)'
      }
    }));

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: formatRequests
      }
    });

    console.log('✅ Configuration terminée !');
    console.log(`📋 Feuille Diaspora: https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=0`);
    console.log(`📋 Feuille Locaux: https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`);
    console.log(`📋 Feuille MicroLeads: https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`);

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message);
    console.log('\n🔧 Vérifiez que:');
    console.log('1. Votre fichier .env.local est configuré correctement');
    console.log('2. Votre service account a accès à la feuille');
    console.log('3. La feuille Google Sheets existe et est accessible');
  }
}

setupGoogleSheets();
