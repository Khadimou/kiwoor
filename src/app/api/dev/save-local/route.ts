import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { success: false, message: 'Only available in development' },
      { status: 403 }
    );
  }

  try {
    const data = await request.json();
    
    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    const leadsFile = path.join(dataDir, 'leads.json');
    
    // Read existing leads or create empty array
    let leads = [];
    if (existsSync(leadsFile)) {
      const content = await readFile(leadsFile, 'utf-8');
      leads = JSON.parse(content);
    }

    // Add new lead
    leads.push({
      ...data,
      id: `local-${Date.now()}`,
      savedAt: new Date().toISOString(),
    });

    // Save to file
    await writeFile(leadsFile, JSON.stringify(leads, null, 2), 'utf-8');

    console.log(`✅ Lead saved locally to ${leadsFile}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Sauvegardé localement (dev fallback)',
      file: leadsFile,
    });

  } catch (error) {
    console.error('❌ Local save error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur sauvegarde locale',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

