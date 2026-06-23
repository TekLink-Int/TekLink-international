import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSheetsClient } from '@/lib/sheets'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const body = await req.json()
  const { name, company, email, message, type, platform } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const timestamp = new Date().toISOString()
  const row = [timestamp, name, company ?? '', email, type ?? 'partnership', platform ?? '', message]

  // Log to Google Sheets (non-blocking — don't fail the request if Sheets is down)
  try {
    const sheets = getSheetsClient()
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Contact!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    })
  } catch (err) {
    console.error('[sheets] contact append failed:', err)
  }

  // Send email notification
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'TekLink <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL_TO!,
      subject: `New ${type === 'integration' ? 'integration' : 'partnership'} enquiry — ${name}${company ? ` (${company})` : ''}`,
      html: `
        <table style="font-family:sans-serif;font-size:14px;color:#1b2a3a;border-collapse:collapse;width:100%;max-width:560px">
          <tr><td style="padding:8px 0"><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td style="padding:8px 0"><strong>Company</strong></td><td>${company || '—'}</td></tr>
          <tr><td style="padding:8px 0"><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td style="padding:8px 0"><strong>Type</strong></td><td>${type}</td></tr>
          ${platform ? `<tr><td style="padding:8px 0"><strong>Platform</strong></td><td>${platform}</td></tr>` : ''}
          <tr><td colspan="2" style="padding:16px 0 4px"><strong>Message</strong></td></tr>
          <tr><td colspan="2" style="padding:0;white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
    })
  } catch (err) {
    console.error('[resend] send failed:', err)
  }

  return NextResponse.json({ success: true })
}
