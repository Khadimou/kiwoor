import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    // Zapier webhook URL from env
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;

    if (!zapierWebhookUrl) {
      console.warn('⚠️ ZAPIER_WEBHOOK_URL not configured, skipping notification');
      return NextResponse.json({ 
        success: true, 
        message: 'Webhook URL not configured (skipped)' 
      });
    }

    // Send to Zapier
    const response = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        notifiedAt: new Date().toISOString(),
        source: 'kiwoor-campaign',
      }),
    });

    if (!response.ok) {
      throw new Error(`Zapier webhook failed: ${response.statusText}`);
    }

    console.log('✅ Zapier notification sent successfully');

    return NextResponse.json({ 
      success: true, 
      message: 'Notification envoyée à Zapier' 
    });

  } catch (error) {
    console.error('❌ Zapier notification error:', error);
    
    // Don't fail the form submission if Zapier fails
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur notification Zapier (non bloquant)',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 200 } // Return 200 to not block the form
    );
  }
}

