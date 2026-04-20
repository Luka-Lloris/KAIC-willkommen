const KEY = 'kaic_session';

const defaults = {
  category: '',
  categoryLabel: '',
  datetime: '',
  transcript: '',
  visitor: { name: '', org: '', contact: '', email: '' }
};

export function getSession() {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults };
  } catch { return { ...defaults }; }
}

export function setSession(data) {
  const next = { ...getSession(), ...data };
  sessionStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearSession() {
  sessionStorage.removeItem(KEY);
}

export function initSession(category, label) {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const datetime = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  clearSession();
  setSession({ category, categoryLabel: label, datetime });
}

export function setTranscript(text) {
  setSession({ transcript: text });
}

export function setVisitor(data) {
  const s = getSession();
  setSession({ visitor: { ...s.visitor, ...data } });
}

export function hasVisitor() {
  const v = getSession().visitor;
  return !!(v.name || v.org || v.contact || v.email);
}

export function generateMD() {
  const s = getSession();
  const v = s.visitor;
  const vLine = [v.name, v.org, v.contact, v.email].filter(Boolean).join(' / ');
  return `# 상담 기록

**카테고리:** ${s.categoryLabel}
**일시:** ${s.datetime}
**방문자:** ${vLine || '미입력'}

---

## 상담 내용

${s.transcript || '(내용 없음)'}
`;
}

export function generateFilename() {
  const s = getSession();
  const dt = (s.datetime || '').replace(/[-: ]/g, '').slice(0, 12);
  const name = s.visitor?.name ? `_${s.visitor.name}` : '';
  return `${dt}_${s.categoryLabel}${name}.md`;
}

export const CAT_COLORS = {
  verification: 'var(--cat-1)',
  consulting:   'var(--cat-2)',
  development:  'var(--cat-3)',
  collaboration:'var(--cat-4)',
  etc:          'var(--cat-5)'
};
