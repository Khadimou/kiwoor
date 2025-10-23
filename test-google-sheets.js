// Test simple pour vérifier la configuration Google Sheets
const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function testGoogleSheets() {
  try {
    console.log('🧪 Test de la configuration Google Sheets...');

    // Vérifier les variables d'environnement
    const requiredVars = [
      'GOOGLE_SHEETS_PRIVATE_KEY',
      'GOOGLE_SHEETS_CLIENT_EMAIL', 
      'GOOGLE_SHEETS_SPREADSHEET_ID'
    ];

    for (const varName of requiredVars) {
      if (!process.env[varName]) {
        throw new Error(`Variable d'environnement manquante: ${varName}`);
      }
    }

    console.log('✅ Variables d\'environnement configurées');

    // Test de l'authentification
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    // Test de lecture de la feuille
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    console.log('✅ Connexion à Google Sheets réussie');
    console.log(`📊 Titre de la feuille: ${response.data.properties.title}`);
    console.log(`📋 Nombre d'onglets: ${response.data.sheets.length}`);

    // Lister les onglets
    console.log('\n📋 Onglets disponibles:');
    response.data.sheets.forEach((sheet, index) => {
      console.log(`  ${index + 1}. ${sheet.properties.title}`);
    });

    console.log('\n🎉 Configuration Google Sheets OK !');
    console.log('\n📝 Prochaines étapes:');
    console.log('1. Exécutez: npm run setup-sheets');
    console.log('2. Démarrez: npm run dev');
    console.log('3. Testez un formulaire sur http://localhost:3000');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    console.log('\n🔧 Vérifiez que:');
    console.log('1. Le fichier .env.local existe et est configuré');
    console.log('2. Les variables d\'environnement sont correctes');
    console.log('3. Le service account a accès à la feuille');
    console.log('4. L\'API Google Sheets est activée');
  }
}

testGoogleSheets();
