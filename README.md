# KAIC-willkommen

> 전시회·포럼·박람회 현장용 AI 부스 상담 기록 PWA

한국인공지능검증원(KAIC) 부스 상담원이 스마트폰으로 방문자 상담을 음성으로 기록하고, 완료 즉시 지정 이메일로 발송하는 경량 웹앱입니다.

---

## 화면 구성

```
index.html      카테고리 선택 (5개 버튼 — PC 가로 / 모바일 세로)
    ↓
interview.html  원터치 녹음 → Whisper 자동 변환
    ↓
review.html     전사 텍스트 확인·수정 + 방문자 정보 + 메일 발송
                └ [상담 이어가기] → interview.html 재진입 (회차 누적)
```

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 카테고리 선택 | 시험/검증 · 컨설팅 · 개발지원 · 협업제안 · 기타 |
| 원터치 녹음 | 1터치 시작 (녹색 마이크) → 1터치 종료 (빨간 정지) |
| 음성 변환 | Whisper.js `small` 모델 (한국어, 브라우저 로컬) |
| 다회차 지원 | 상담 이어가기 → 회차별 접힘/펼침 텍스트 관리 |
| 방문자 정보 | 명함 촬영 OCR (Tesseract.js) 또는 수동 입력 (선택) |
| 이메일 발송 | Resend API → kaic.officer@gmail.com 자동 발송 |
| MD 없음 | 발송 시 MD 첨부 파일로 전달 |

---

## 기술 스택

| 항목 | 기술 | 비용 |
|------|------|------|
| STT | Whisper.js `small` (466MB, 최초 1회 캐싱) | 무료 |
| OCR | Tesseract.js (한국어/영어) | 무료 |
| 이메일 | Resend API (월 3,000건) | 무료 |
| 배포 | Vercel | 무료 |
| 프레임워크 | Vanilla HTML/CSS/JS (의존성 없음) | - |

---

## 파일 구조

```
KAIC-willkommen/
├── index.html        # 카테고리 선택
├── interview.html    # 녹음 화면
├── review.html       # 확인·발송 화면
├── css/
│   └── style.css
├── js/
│   ├── store.js      # sessionStorage 세션 관리
│   └── resend.js     # Resend 이메일 발송
└── README.md
```

---

## MD 파일 형식 (이메일 첨부)

```markdown
# 상담 기록

**카테고리:** 컨설팅
**일시:** 2026-05-14 10:32
**방문자:** 홍길동 / 한국도로공사 / 010-0000-0000

---

## 상담 내용

### 1회차

[전사 내용]

---

### 2회차

[전사 내용]
```

**파일명:** `20260514_1032_컨설팅_홍길동.md`

---

## 배포

```bash
# Vercel CLI
vercel deploy

# 또는 GitHub 연동 후 자동 배포
```

---

## 환경 설정

`js/resend.js` 내 수정:

```js
const RESEND_FROM = 'noreply@aicerti.com'; // 도메인 인증 후 변경
```

---

## 운용 가이드

1. 행사 당일 아침, 상담원 전원 URL 접속 후 **Whisper 모델 캐싱 확인** (최초 1회 약 466MB)
2. 카테고리 선택 → 녹음 시작
3. 상담 종료 후 버튼 재터치 → 자동 변환 → 내용 확인
4. 필요 시 방문자 정보 입력 (선택)
5. 메일 발송 → 새 상담 시작

---

## 개발 현황

- [x] 웰컴 화면 (카테고리 5개)
- [x] 인터뷰 화면 (동심원 원터치 녹음)
- [x] Whisper.js small 전사
- [x] 다회차 상담 이어가기
- [x] 회차별 접힘/펼침 텍스트
- [x] 방문자 정보 팝업 (OCR + 수동)
- [x] Resend 이메일 발송
- [ ] 도메인 인증 (`noreply@aicerti.com`)
- [ ] Vercel 배포

---

*KAIC · 한국인공지능검증원*
