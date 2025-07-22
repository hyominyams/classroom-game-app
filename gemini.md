# 🤖 **chatgpt.md** – AI 바이브코딩 지침서

이 문서는 ChatGPT · Gemini CLI 같은 AI 도구가 **React + Firebase 학급 웹앱**을 정확히 구현할 수 있도록 요구사항과 규칙을 세밀하게 기술합니다.

---

## 1. 프로젝트 목표

- 초등학교 학급을 위한 **게임 랭킹·채팅·학습 관리** 플랫폼 구축
- 사용자 유형: **학생**, **교사**
- 우선 MVP → 아바타 커스터마이저 & Lottie 애니메이션으로 사용자 경험 개선

---

## 2. 페이지 & 라우팅

| Path | Component | 설명 |
|------|-----------|------|
| `/` | `LoginPage` | PNG 로고 + 아이디/비번 입력 |
| `/signup` | `SignupPage` | 이메일·아이디·비번·이름·학년·반·학교 |
| `/game` | `GameBoardPage` | 1 · 2 · 3단 구조 |
| `/chat` | `ChatRoomPage` | 학급별 실시간 채팅 |
| `/teacher` | `TeacherDashboardPage` | 그래프 & 학생 관리 |
| `/rank` | `SchoolRankingPage` | 학교별 TOP 10 랭킹 |

---

## 3. 컴포넌트 규칙

- **UI 라이브러리**: shadcn/ui → Card · Button · Tabs 사용
- **상태 관리**: React Query (`@tanstack/react-query`) + Firebase `onSnapshot`
- **Lottie**: `lottie-react` `Player` 컴포넌트, `/public/lottie` 경로에 JSON
- **아바타**: `react-nice-avatar`, 사용자 문서에 `avatarConfig` JSON 저장
- **Tailwind** 색상 팔레트: 하늘(#b7e5ff 계열) / 다크 모드 시 slate 계열

---

## 4. Firebase 스키마

```text
users/{uid}
  email          string
  userId         string   # 아이디 로그인용
  name           string
  grade          number   # 1~6
  class          number   # 1~20
  school         string   # 완도초등학교 | 완도SW교육체험센터
  avatarConfig   map
  warnCount      number   # 경고 누적
  createdAt      timestamp

rankings/{school}/{grade}-{class}/{uid}
  score          number
  updatedAt      timestamp

messages/{grade}-{class}/{autoId}
  senderUid      string
  text           string
  emotion        string   # good | sad | lol | heart | like
  createdAt      timestamp
```

---

## 5. 기능 로직

- **아이디 로그인**: Firebase Auth 이메일(User ID → `email@dummy.com`) 매핑 or Custom Token
- **경고 시스템**: 욕설 필터 통과 실패 시 Cloud Function → `users.warnCount++`
- **랭킹 업데이트**: 게임 종료 시 Firestore `rankings` 문서 merge
- **아바타 저장**: 커스터마이저 Save → `users.avatarConfig` 업데이트
- **Lottie 트리거**: `score` 갱신 → if new Score > prevScore then show `<LevelUpFx />`

---

## 6. 코드 스타일

- `tsx` + `eslint` + `prettier`
- 함수형 컴포넌트, `useCallback`/`useMemo` 적절 사용
- 커스텀 훅: `useGameRanking`, `useChatMessages` 등

---

## 7. 완료 체크리스트

- [ ] 로그인/회원가입 동작
- [ ] 게임 선택·임베드 표시
- [ ] 실시간 학급 랭킹 반영
- [ ] 채팅 기능 + 욕설 필터
- [ ] 아바타 커스터마이저
- [ ] 레벨업 Lottie 애니메이션
- [ ] TeacherDashboard 그래프 1개 이상
- [ ] Cypress E2E 테스트 1 케이스

---

### 🔑 AI 출력 시 주의
- 절대 Firebase 키를 리포지터리에 하드코딩하지 말 것
- TypeScript 타입 정의를 포함
