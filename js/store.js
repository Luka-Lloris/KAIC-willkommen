// store.js — sessionStorage 기반 세션 데이터 관리

const STORE_KEY = 'kaic_session';

const defaultSession = {
  category: '',
  categoryLabel: '',
  transcript: '',
  visitor: {
    name: '',
    org: '',
    contact: '',
    title: '',
    photoDataUrl: ''
  },
  datetime: ''
};

export function getSession() {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : { ...defaultSession };
  } catch {
    return { ...defaultSession };
  }
}

export function setSession(data) {
  const current = getSession();
  const next = { ...current, ...data };
  sessionStorage.setItem(STORE_KEY, JSON.stringify(next));
  return next;
}

export function clearSession() {
  sessionStorage.removeItem(STORE_KEY);
}

export function setCategory(category, label) {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const datetime = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  setSession({ category, categoryLabel: label, datetime });
}

export function setTranscript(text) {
  setSession({ transcript: text });
}

export function setVisitor(visitorData) {
  const current = getSession();
  setSession({ visitor: { ...current.visitor, ...visitorData } });
}

export function generateMD() {
  const s = getSession();
  const v = s.visitor;
  const visitorLine = [v.name, v.org, v.contact, v.title].filter(Boolean).join(' / ');
  const dateStr = s.datetime || '미입력';

  return `# 상담 기록

**카테고리:** ${s.categoryLabel || s.category || '미선택'}
**일시:** ${dateStr}
**방문자:** ${visitorLine || '미입력'}

---

## 상담 내용

${s.transcript || '(기록 없음)'}
`;
}

export function generateFilename() {
  const s = getSession();
  const v = s.visitor;
  const dt = s.datetime || '';
  const dateCompact = dt.replace(/[-: ]/g, '').slice(0, 12);
  const name = v.name ? `_${v.name}` : '';
  const cat = s.categoryLabel || s.category || '기타';
  return `${dateCompact}_${cat}${name}.md`;
}
