#!/usr/bin/env node

/**
 * Script de test pour Analytics et Zapier
 * 
 * Usage:
 * node scripts/test-analytics-zapier.js
 * 
 * Teste:
 * - Variables d'environnement
 * - Webhook Zapier
 * - URLs A/B testing
 * - Analytics configuration
 */

const fs = require('fs');
const path = require('path');

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bright: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvFile() {
  log('\n🔍 Vérification du fichier .env.local...', 'blue');
  
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    log('❌ Fichier .env.local introuvable', 'red');
    log('💡 Copiez env.example vers .env.local et configurez vos variables', 'yellow');
    return false;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const variables = [
    'NEXT_PUBLIC_GA_ID',
    'NEXT_PUBLIC_META_PIXEL_ID', 
    'NEXT_PUBLIC_CLARITY_ID',
    'ZAPIER_WEBHOOK_URL'
  ];
  
  let allConfigured = true;
  
  variables.forEach(variable => {
    const regex = new RegExp(`${variable}=(.+)`);
    const match = envContent.match(regex);
    
    if (match && match[1] && !match[1].includes('XXXXXXXXXX') && match[1] !== 'your-webhook-url') {
      log(`✅ ${variable} configuré`, 'green');
    } else {
      log(`❌ ${variable} manquant ou non configuré`, 'red');
      allConfigured = false;
    }
  });
  
  return allConfigured;
}

async function testZapierWebhook() {
  log('\n🔗 Test du webhook Zapier...', 'blue');
  
  // Charger les variables d'environnement
  require('dotenv').config({ path: '.env.local' });
  
  const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
  
  if (!webhookUrl || webhookUrl.includes('YOUR_WEBHOOK_ID')) {
    log('❌ ZAPIER_WEBHOOK_URL non configuré', 'red');
    return false;
  }
  
  try {
    const testData = {
      name: 'Test User',
      email: 'test@kiwoor.com',
      phone: '221777123456', 
      role: 'Gérant de boutique',
      variant: 'test-script',
      source: 'test-script',
      timestamp: new Date().toISOString()
    };
    
    log('📤 Envoi des données de test...', 'yellow');
    console.log(JSON.stringify(testData, null, 2));
    
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    if (response.ok) {
      log('✅ Webhook Zapier fonctionne', 'green');
      return true;
    } else {
      log(`❌ Erreur webhook: ${response.status} ${response.statusText}`, 'red');
      return false;
    }
    
  } catch (error) {
    log(`❌ Erreur webhook: ${error.message}`, 'red');
    return false;
  }
}

function generateTestUrls() {
  log('\n🧪 URLs de test A/B générées:', 'blue');
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const variants = [
    { name: 'Control', variant: 'control', description: 'Version actuelle' },
    { name: 'Hero Direct', variant: 'test-hero-direct', description: 'Titre plus direct' },
    { name: 'Offre Gratuite', variant: 'test-offer-gratuit', description: 'Essai gratuit 7 jours' },
    { name: 'CTA Urgent', variant: 'test-cta-urgent', description: 'Call-to-action urgent' },
    { name: 'Social Proof', variant: 'test-social-proof', description: 'Plus de témoignages' }
  ];
  
  variants.forEach(({ name, variant, description }) => {
    const url = `${baseUrl}/campaign/diaspora?variant=${variant}`;
    log(`\n📱 ${name}:`, 'bright');
    log(`   ${description}`, 'yellow');
    log(`   ${url}`, 'green');
  });
}

function generateCampaignUrls() {
  log('\n🎯 URLs pour campagnes publicitaires:', 'blue');
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const campaigns = [
    {
      platform: 'Facebook Ads',
      campaigns: [
        { name: 'FB - Control', url: `${baseUrl}/campaign/diaspora?variant=control&utm_source=facebook&utm_medium=cpc&utm_campaign=diaspora-control` },
        { name: 'FB - Hero Direct', url: `${baseUrl}/campaign/diaspora?variant=test-hero-direct&utm_source=facebook&utm_medium=cpc&utm_campaign=diaspora-hero` },
        { name: 'FB - Gratuit', url: `${baseUrl}/campaign/diaspora?variant=test-offer-gratuit&utm_source=facebook&utm_medium=cpc&utm_campaign=diaspora-gratuit` }
      ]
    },
    {
      platform: 'Google Ads', 
      campaigns: [
        { name: 'Google - Control', url: `${baseUrl}/campaign/diaspora?variant=control&utm_source=google&utm_medium=cpc&utm_campaign=diaspora-control` },
        { name: 'Google - Hero Direct', url: `${baseUrl}/campaign/diaspora?variant=test-hero-direct&utm_source=google&utm_medium=cpc&utm_campaign=diaspora-hero` }
      ]
    }
  ];
  
  campaigns.forEach(({ platform, campaigns }) => {
    log(`\n📢 ${platform}:`, 'bright');
    campaigns.forEach(({ name, url }) => {
      log(`   ${name}:`, 'yellow');
      log(`   ${url}`, 'green');
    });
  });
}

function generateAnalyticsChecklist() {
  log('\n📊 Checklist de vérification Analytics:', 'blue');
  
  const checks = [
    '1. Ouvrir la console du navigateur',
    '2. Aller sur votre page de campagne',
    '3. Vérifier les logs d\'initialisation:',
    '   ✅ Google Analytics initialized: G-...',
    '   ✅ Meta Pixel initialized: ...',
    '   ✅ Microsoft Clarity initialized: ...',
    '4. Tester un événement:',
    '   - Cliquer sur un bouton',
    '   - Voir: 📊 Analytics Event: ... dans la console',
    '5. Vérifier dans les dashboards:',
    '   - GA4: analytics.google.com → Reports → Realtime',
    '   - Meta: business.facebook.com → Events Manager',
    '   - Clarity: clarity.microsoft.com → Dashboard'
  ];
  
  checks.forEach(check => log(`   ${check}`, 'yellow'));
}

async function main() {
  log('🚀 Test Analytics & Zapier - kiwoor', 'bright');
  log('=' .repeat(50), 'blue');
  
  // Vérifier .env.local
  const envOk = checkEnvFile();
  
  // Tester Zapier (seulement si env OK)
  let zapierOk = false;
  if (envOk) {
    zapierOk = await testZapierWebhook();
  }
  
  // Générer les URLs de test
  generateTestUrls();
  
  // Générer les URLs de campagne
  generateCampaignUrls();
  
  // Checklist Analytics
  generateAnalyticsChecklist();
  
  // Résumé final
  log('\n📋 RÉSUMÉ:', 'bright');
  log('=' .repeat(30), 'blue');
  log(`Variables d'environnement: ${envOk ? '✅' : '❌'}`, envOk ? 'green' : 'red');
  log(`Webhook Zapier: ${zapierOk ? '✅' : '❌'}`, zapierOk ? 'green' : 'red');
  log('URLs A/B générées: ✅', 'green');
  
  if (envOk && zapierOk) {
    log('\n🎉 Tout est prêt ! Vous pouvez lancer vos campagnes A/B', 'green');
  } else {
    log('\n⚠️  Configurez les éléments manquants avant de lancer', 'yellow');
  }
  
  log('\n📚 Guides disponibles:', 'blue');
  log('   - CONFIGURATION_ANALYTICS_ZAPIER.md', 'yellow');
  log('   - ANALYTICS_SYSTEM.md', 'yellow'); 
  log('   - AB_TESTING_GUIDE.md', 'yellow');
}

// Exécuter le script
main().catch(console.error);
