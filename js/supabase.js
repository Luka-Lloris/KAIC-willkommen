import { getConfig } from './config.js';

async function getHeaders() {
  const config = await getConfig();
  return {
    'apikey': config.supabase_anon,
    'Authorization': `Bearer ${config.supabase_anon}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  };
}

async function getUrl() {
  const config = await getConfig();
  return config.supabase_url;
}

export async function saveConsultation(session) {
  const url = await getUrl();
  const headers = await getHeaders();

  const res = await fetch(`${url}/rest/v1/consultations`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      category:    session.category,
      datetime:    session.datetime,
      transcripts: session.transcripts,
      visitor:     session.visitor
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `저장 실패: ${res.status}`);
  }
}

export async function fetchConsultations() {
  const config = await getConfig();
  const res = await fetch(
    `${config.supabase_url}/rest/v1/consultations?select=*&order=created_at.desc`,
    {
      headers: {
        'apikey': config.supabase_anon,
        'Authorization': `Bearer ${config.supabase_anon}`
      }
    }
  );

  if (!res.ok) throw new Error('기록 조회 실패');
  return res.json();
}

export async function fetchCltConsultations() {
  const config = await getConfig();
  const res = await fetch(
    `${config.supabase_url}/rest/v1/clt_consultations?select=*&order=created_at.desc`,
    {
      headers: {
        'apikey': config.supabase_anon,
        'Authorization': `Bearer ${config.supabase_anon}`
      }
    }
  );
  if (!res.ok) throw new Error('CLT 기록 조회 실패');
  return res.json();
}
