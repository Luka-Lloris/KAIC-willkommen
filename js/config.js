// Supabase 프로젝트 설정 (anon key만 여기 입력)
const SUPABASE_URL  = 'https://esscuathfwwtibrgudne.supabase.co';
const SUPABASE_ANON = 'sb_publishable_Wmf3rYMhcLgcdC2hPYztBg_jiTn09bU';

let _config = null;

export async function getConfig() {
  if (_config) return _config;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/app_config?select=key,value`, {
    headers: {
      'apikey': SUPABASE_ANON,
      'Authorization': `Bearer ${SUPABASE_ANON}`
    }
  });

  if (!res.ok) throw new Error('설정 로딩 실패');

  const rows = await res.json();
  _config = Object.fromEntries(rows.map(r => [r.key, r.value]));
  return _config;
}
