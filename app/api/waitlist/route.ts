import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Option 1: Try Google Apps Script first (simplest)
    const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
    
    if (GOOGLE_APPS_SCRIPT_URL) {
      try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          return NextResponse.json(
            { success: true, message: 'Email added to waitlist successfully' },
            { status: 200 }
          );
        }
      } catch (error) {
        console.error('Google Apps Script error:', error);
        // Fall through to Option 2 if available
      }
    }

    // Option 2: Try Google Sheets API (only if Option 1 is not configured)
    // Note: This requires jsonwebtoken package. To use this option:
    // 1. Install: npm install jsonwebtoken @types/jsonwebtoken
    // 2. Set environment variables: GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY
    const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    // Only attempt Option 2 if Option 1 is not configured
    if (!GOOGLE_APPS_SCRIPT_URL && SPREADSHEET_ID && GOOGLE_SERVICE_ACCOUNT_EMAIL && GOOGLE_PRIVATE_KEY) {
      // Option 2 code removed to prevent build errors when jsonwebtoken is not installed
      // To enable Option 2, install jsonwebtoken and uncomment the code below
      console.error('Option 2 (Google Sheets API) is not fully implemented. Please use Option 1 (Google Apps Script) or install jsonwebtoken package.');
    }

    // If both options fail or are not configured
    if (!GOOGLE_APPS_SCRIPT_URL) {
      console.error('GOOGLE_APPS_SCRIPT_URL is not configured');
      return NextResponse.json(
        { error: 'Server configuration error. Please set up GOOGLE_APPS_SCRIPT_URL in environment variables.' },
        { status: 500 }
      );
    }

    // If we reach here, Option 1 failed but was configured
    return NextResponse.json(
      { error: 'Failed to save email to Google Sheets' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
