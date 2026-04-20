// resend.js — Resend API 이메일 발송

const RESEND_API_KEY = 're_SAJQ6mGa_Jy7viXH83Nd5HGP1CdtiGxWZ';
const RESEND_TO = 'kaic.officer@gmail.com';
const RESEND_FROM = 'onboarding@resend.dev'; // 도메인 인증 전 기본 발신자

export async function sendEmail({ subject, markdown, filename }) {
  const html = markdownToHtml(markdown);

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
      html,
      attachments: [
        {
          filename,
          content: btoa(unescape(encodeURIComponent(markdown)))
        }
      ]
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Resend 오류: ${res.status}`);
  }

  return await res.json();
}

function markdownToHtml(md) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<style>
  body { font-family: -apple-system, sans-serif; max-width: 640px; margin: 40px auto; color: #1a1a2e; line-height: 1.7; }
  h1 { font-size: 1.3rem; border-bottom: 2px solid #4f8ef7; padding-bottom: 8px; }
  h2 { font-size: 1rem; color: #4f8ef7; margin-top: 24px; }
  strong { color: #1a1a2e; }
  hr { border: none; border-top: 1px solid #e5e7eb; margin: 20px 0; }
  p { margin: 6px 0; }
  pre { background: #f3f4f6; padding: 16px; border-radius: 8px; white-space: pre-wrap; font-size: 0.9rem; }
</style>
</head>
<body>
${md
  .replace(/^# (.+)$/m, '<h1>$1</h1>')
  .replace(/^## (.+)$/gm, '<h2>$1</h2>')
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/^---$/gm, '<hr>')
  .replace(/\n\n/g, '</p><p>')
  .replace(/^(?!<[h|hr|p])/gm, '')
}
</body>
</html>`;
}
