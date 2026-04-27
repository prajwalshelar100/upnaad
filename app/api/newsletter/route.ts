export const runtime = 'edge';

/**
 * UPNAAD Newsletter Subscription API
 * Supports: Mailchimp OR Zoho Campaigns (FREE tier: 2000 contacts, 6000 emails/month)
 * 
 * Set ONE of the following in your Cloudflare Pages environment variables:
 * 
 * ── Option A: Mailchimp ──────────────────────────────
 *   MAILCHIMP_API_KEY=your-key-us21
 *   MAILCHIMP_LIST_ID=your_list_id
 *
 * ── Option B: Zoho Campaigns (recommended for free tier) ──
 *   ZOHO_CAMPAIGNS_AUTH_TOKEN=your_auth_token
 *   ZOHO_CAMPAIGNS_LIST_KEY=your_list_key
 *   ZOHO_DC=com   (or .in / .eu / .com.au depending on your Zoho region)
 *
 * How to get Zoho credentials:
 *   1. Sign up at campaigns.zoho.com (free, no credit card)
 *   2. Create a Mailing List → copy the List Key from Settings
 *   3. Go to: campaigns.zoho.com → My Account → Integrations → API → Generate Auth Token
 *   4. Add ZOHO_CAMPAIGNS_AUTH_TOKEN and ZOHO_CAMPAIGNS_LIST_KEY to Cloudflare env vars
 */

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email required' }, { status: 400 });
    }

    // ── Try Zoho Campaigns first ──────────────────────────
    const ZOHO_AUTH_TOKEN = process.env.ZOHO_CAMPAIGNS_AUTH_TOKEN;
    const ZOHO_LIST_KEY = process.env.ZOHO_CAMPAIGNS_LIST_KEY;
    const ZOHO_DC = process.env.ZOHO_DC || 'com';

    if (ZOHO_AUTH_TOKEN && ZOHO_LIST_KEY) {
      const contactData = JSON.stringify([{ "Contact Email": email }]);
      const body = new URLSearchParams({
        resfmt: 'JSON',
        listkey: ZOHO_LIST_KEY,
        contactinfo: contactData,
      });

      const res = await fetch(
        `https://campaigns.zoho.${ZOHO_DC}/api/v1.1/json/listsubscribe?authtoken=${ZOHO_AUTH_TOKEN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
        }
      );

      const data = await res.json();
      // Zoho returns status "success" or "error" in the response
      if (data.status === 'success' || data.code === 'VAID-2001') {
        return Response.json({ success: true, provider: 'zoho' });
      }
      // If duplicate subscriber, treat as success
      if (data.message?.toLowerCase().includes('already') || data.code === 'VZDE-0001') {
        return Response.json({ success: true, provider: 'zoho' });
      }
      console.error('Zoho error:', data);
      return Response.json({ error: 'Subscription failed. Please try again.' }, { status: 400 });
    }

    // ── Fallback: Mailchimp ───────────────────────────────
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

    if (MAILCHIMP_API_KEY && MAILCHIMP_LIST_ID) {
      const DC = MAILCHIMP_API_KEY.split('-').pop();
      const res = await fetch(
        `https://${DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `apikey ${MAILCHIMP_API_KEY}`,
          },
          body: JSON.stringify({
            email_address: email,
            status: 'subscribed',
            tags: ['upnaad-website'],
          }),
        }
      );
      const data = await res.json();
      if (!res.ok && data.title !== 'Member Exists') {
        return Response.json({ error: data.detail || 'Subscription failed' }, { status: 400 });
      }
      return Response.json({ success: true, provider: 'mailchimp' });
    }

    // ── Neither configured — still return success gracefully ──
    console.warn('[Newsletter] No email provider configured. Set ZOHO_CAMPAIGNS_AUTH_TOKEN or MAILCHIMP_API_KEY.');
    return Response.json({ success: true, message: 'Noted!' });

  } catch (err) {
    console.error('Newsletter API error:', err);
    return Response.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
