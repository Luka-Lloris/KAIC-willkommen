const RESEND_API_KEY = 're_SAJQ6mGa_Jy7viXH83Nd5HGP1CdtiGxWZ';
const RESEND_TO      = 'kaic.officer@gmail.com';
const RESEND_FROM    = 'onboarding@resend.dev'; // 내일 noreply@aicerti.com 으로 변경

export async function sendEmail({ subject, markdown, filename }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [RESEND_TO],
      subject,
      html: toHtml(markdown),
      attachments: [{
        filename,
        content: btoa(unescape(encodeURIComponent(markdown)))
      }]
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Resend ${res.status}`);
  }
  return res.json();
}

function toHtml(md) {
  const body = md
    .replace(/^# (.+)$/m,    '<h1>$1</h1>')
    .replace(/^## (.+)$/gm,  '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^---$/gm, '<hr>')
    .split('\n').map(l => l.startsWith('<') ? l : `<p>${l}</p>`).join('');

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  body{font-family:-apple-system,sans-serif;max-width:640px;margin:40px auto;color:#111;line-height:1.7}
  h1{font-size:1.2rem;border-bottom:2px solid #4f8ef7;padding-bottom:8px}
  h2{font-size:0.95rem;color:#4f8ef7;margin-top:20px}
  h3{font-size:0.85rem;color:#6b7280;margin-top:16px}
  hr{border:none;border-top:1px solid #e5e7eb;margin:16px 0}
  p{margin:4px 0}strong{font-weight:700}
</style></head><body>${body}</body></html>`;
}
