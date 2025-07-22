# 📚 **학급 웹앱 페이지** – 사용 가이드

이 프로젝트는 초등학교 학급을 위한 **게임·소통·학습 관리** 웹 애플리케이션입니다.  
학생들은 재미있는 게임으로 랭킹을 겨루고, 실시간 채팅으로 교류하며, 교사는 대시보드에서 학습 참여도를 파악할 수 있습니다.

---

## ✨ 핵심 기능

- **로그인·회원가입** – 아이디 기반 로그인 (Firebase Email Auth 커스터마이징)
- **게임 게시판**
  - 학급별 랭킹 1 ~ 10위 표시 (메달 & 테두리 효과)
  - 게임 선택 & 임베드 실행
- **실시간 학급 채팅**
  - 감정 표현(좋음/슬픔/웃김/하트/좋아요)
  - 욕설 필터 + 경고 3회 시 1일 정지
- **교사 대시보드**
  - 학생 접속·점수·경고 현황 그래프
- **학교별 종합 랭킹**
- **아바타 커스터마이저** ★신규
- **Lottie 애니메이션 효과** ★신규
- **다크·고대비 모드** (접근성)

---

## 🛠️ 기술 스택

| Layer | Tech |
|-------|------|
| 프론트엔드 | **React 18**, Vite, TypeScript, Tailwind CSS, shadcn/ui |
| 백엔드 | **Firebase** (Auth · Firestore · Storage · Cloud Functions) |
| 애니메이션 | **Lottie** (`lottie-react`) |
| 아바타 | **react‑nice‑avatar** |
| 차트 | Recharts |
| 테스트 | Cypress |
| 배포 | Firebase Hosting 또는 Netlify |

---

## 🚀 로컬 실행

```bash
git clone https://github.com/your-repo/class-game-app.git
cd class-game-app
npm install
cp .env.example .env      # Firebase 키 입력
npm run dev               # Vite 개발 서버
```

### `.env` 예시

```env
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

---

## 📂 주요 폴더 구조

```
src/
 ├─ components/
 │   ├─ avatars/
 │   ├─ lottie/
 │   └─ charts/
 ├─ pages/
 │   ├─ LoginPage.tsx
 │   ├─ SignupPage.tsx
 │   ├─ GameBoardPage.tsx
 │   ├─ ChatRoomPage.tsx
 │   ├─ TeacherDashboardPage.tsx
 │   └─ SchoolRankingPage.tsx
 ├─ hooks/
 ├─ lib/ (firebase.ts)
 └─ styles/
```

---

## ⚠️ 주의 사항

- **보안**: Firebase 보안 규칙을 배포 전에 꼭 설정하세요.
- **요금**: Firestore 실시간 리스너 사용량을 모니터링하세요.
- **개인정보**: 학년/반/이름 등 민감정보는 최소한으로 저장하고, COPPA 체크리스트를 준수하세요.

---

## 🤝 기여 방법

1. Issue 또는 Discussion에 개선 사항 제안
2. `feat/` 브랜치에서 작업 후 PR
3. CI → Cypress → Review 후 병합

---

Happy Coding 🎉
