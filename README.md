# KAIC-willkommen

> 전시회·포럼·박람회 현장용 AI 부스 상담 기록 PWA

한국인공지능검증원(KAIC) 부스 운영 상담원이 스마트폰으로 방문자 상담을 기록하고, 완료 즉시 지정 이메일로 발송하는 경량 웹앱입니다.

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 카테고리 선택 | 시험/검증 · 컨설팅 · 개발지원 · 협업제안 · 기타 |
| 음성 기록 | Whisper.js 기반 STT (녹음 후 변환, iOS/Android 공통) |
| 명함 OCR | Tesseract.js 기반 브라우저 로컬 OCR (한국어 지원) |
| 수기 입력 | 이름 · 기관 · 연락처 · 직책 수동 입력 |
| 기록 저장 | MD 파일 로컬 다운로드 |
| 이메일 발송 | Resend API로 지정 수신자에게 자동 발송 |

---

## 화면 구성

```
웰컴 화면 (index.html)
└── 카테고리 버튼 5개
    ├── PC: 가로 5등분 전체화면
    └── 모바일: 세로 5등분 전체화면

상담 화면 (consult.html)
└── 녹음 → Whisper.js 변환 → 텍스트 편집

방문자 정보 화면 (visitor.html)
├── 카메라 촬영 → Tesseract.js OCR
└── 수기 입력 보완

완료 화면 (complete.html)
├── MD 파일 다운로드
└── Resend 이메일 발송
```

---

## 기술 스택

| 항목 | 기술 | 비용 |
|------|------|------|
| STT | [Whisper.js](https://github.com/xenova/whisper-web) (base 모델) | 무료 |
| OCR | [Tesseract.js](https://github.com/naptha/tesseract.js) | 무료 |
| 이메일 | [Resend](https://resend.com) API | 무료 (월 3,000건) |
| 배포 | [Vercel](https://vercel.com) | 무료 |
| 프레임워크 | Vanilla HTML/CSS/JS (단일 파일 구조) | - |

---

## 파일 구조

```
KAIC-willkommen/
├── index.html          # 웰컴 화면
├── consult.html        # 상담 화면 (STT)
├── visitor.html        # 방문자 정보
├── complete.html       # 완료 및 발송
├── js/
│   ├── whisper.js      # STT 처리
│   ├── ocr.js          # Tesseract OCR
│   ├── resend.js       # 이메일 발송
│   └── store.js        # 세션 데이터 관리
├── css/
│   └── style.css       # 반응형 스타일
└── README.md
```

---

## 데이터 흐름

```
카테고리 선택
    ↓
음성 녹음 → Whisper.js 변환 → 텍스트 편집
    ↓
명함/명찰 촬영 → OCR → 수기 보완
    ↓
MD 생성 → 로컬 다운로드 + Resend 발송
```

---

## MD 파일 형식

```markdown
# 상담 기록

**카테고리:** 컨설팅
**일시:** 2026-05-14 10:32
**방문자:** 홍길동 / 한국도로공사 / 010-0000-0000 / 팀장

---

## 상담 내용

[STT 변환 텍스트]
```

**파일명 규칙:** `20260514_1032_컨설팅_홍길동.md`

---

## 환경 변수

`.env` 파일 또는 Vercel 환경변수로 관리:

```
RESEND_API_KEY=your_resend_api_key
RESEND_TO=kaic.officer@gmail.com
```

---

## 배포

```bash
# 1. 레포 클론
git clone https://github.com/Luka-Lloris/KAIC-willkommen.git

# 2. Vercel 연동
vercel deploy
```

---

## 운용 가이드

1. 행사 당일 아침, 상담원 전원 URL 접속 후 **Whisper.js 모델 로딩 확인** (최초 1회, 약 145MB)
2. 카테고리 버튼 선택 후 상담 시작
3. 상담 종료 후 녹음 → 변환 → 방문자 정보 입력 → 발송
4. MD 파일은 로컬 다운로드로 백업 보관

---

## 개발 현황

- [ ] 웰컴 화면
- [ ] 상담 화면 (STT)
- [ ] 방문자 정보 화면 (OCR + 수기)
- [ ] 완료 화면 (MD + 이메일)
- [ ] 반응형 스타일
- [ ] Vercel 배포

---

*KAIC · 한국인공지능검증원*
