import { NextRequest, NextResponse } from 'next/server'
import { getSheetsClient } from '@/lib/sheets'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  try {
    const sheets = getSheetsClient()
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Notify!A:B',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [[new Date().toISOString(), email]] },
    })
  } catch (err) {
    console.error('[sheets] notify append failed:', err)
  }

  return NextResponse.json({ success: true })
}
