# 김진우 ♥ 김수연 모바일 청첩장

Next.js 14 (App Router) + Tailwind CSS 기반 모바일 웨딩 청첩장입니다. (방명록/Firebase 기능은 제외된 버전입니다.)

## 1. 로컬 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인합니다. (이 프로젝트를 생성한 샌드박스 환경은 npm 레지스트리 접근이 막혀 있어 `npm install`을 실행하지 못했습니다. 로컬 PC 또는 Vercel 배포 시 최초 1회 반드시 `npm install` / 빌드를 실행해 정상 동작을 확인해주세요.)

## 2. 채워야 할 것들

### 2-1. 실제 이미지 / 오디오 (필수)

`public/` 폴더에 지금은 자리표시자(placeholder) 이미지·오디오가 들어 있습니다. 실제 파일로 교체해주세요.

| 경로 | 용도 | 권장 사이즈 |
|---|---|---|
| `public/main-photo.jpg` | TitleCard 메인 사진 | 세로형, 3:4 이상 |
| `public/groom.jpg`, `public/bride.jpg` | CastingSection 인물 사진 | 3:4 세로 |
| `public/invitation.png` | 손글씨 이미지 (투명 배경 PNG) | 가로 800px 내외 |
| `public/kakao.jpg` | 카카오톡 공유 썸네일 | 정사각형 800x800 |
| `public/gallery/1.jpg` ~ `22.jpg` | 갤러리 사진 22장 | 정사각형 또는 동일 비율 권장 |
| `public/bgm.mp3` | 배경음악 (현재는 무음 30초 파일) | mp3 |

### 2-2. 텍스트/데이터 — `src/config/wedding.ts`

이름, 날짜, 장소, 오시는 길 안내, **계좌번호**가 이 파일 한 곳에 모여 있습니다. 특히 아래는 반드시 실제 값으로 채워주세요.

- `accounts` — 예금주 / 은행 / 계좌번호 (지금은 "은행명 입력", "계좌번호 입력" 상태입니다)
- `directions.subway`, `directions.bus` — 지하철·버스 노선은 예식장(공군호텔)에서 안내하는 정확한 정보로 교체해주세요. 웹 검색으로는 정확한 노선을 확인하지 못해 임시 안내 문구만 넣어두었습니다.
- `venue.tel` — 예식장 전화번호(있다면)

### 2-3. 카카오톡 공유 문구 — `src/app/layout.tsx`

`metadata`의 `title`/`description`은 `wedding.kakao`(`src/config/wedding.ts`)에서 가져옵니다. 문구를 바꾸려면 `wedding.ts`의 `kakao` 값을 수정하면 됩니다.

## 3. Vercel 배포

1. 이 폴더를 GitHub 저장소로 push 합니다.
2. [Vercel](https://vercel.com)에서 New Project로 저장소를 가져옵니다. (Framework Preset은 Next.js가 자동 감지됩니다.)
3. Deploy를 누르면 빌드 후 자동 배포됩니다. 환경변수 설정이 필요 없습니다.

## 4. 폴더 구조

```
src/
  app/
    layout.tsx        # 폰트, 메타데이터(OG), 그레인 오버레이
    page.tsx           # 8개 섹션 조립
    globals.css
  components/
    IntroAnimation.tsx
    TitleCard.tsx
    CastingSection.tsx
    InvitationSection.tsx
    WhenWhereSection.tsx
    GallerySection.tsx
    DirectionsSection.tsx
    AccountSection.tsx
    BgmToggle.tsx / GrainOverlay.tsx / ToastProvider.tsx / FadeIn.tsx
  config/wedding.ts    # 모든 텍스트/데이터 (여기만 고치면 됨)
  hooks/useDday.ts
```

## 5. 디자인 값

- 기본 배경 `#f2f8ed`, 강조 섹션(WhenWhere/Account) `#a8d96c`, Invitation 섹션은 흰 배경
- 폰트: Pretendard(한글, next/font/local), Cormorant Garamond / Space Mono(영문, next/font/google)
- 스크롤 진입 시 `FadeIn` 컴포넌트가 IntersectionObserver로 fade-up 처리
- D-Day는 자정 기준 날짜 차이로 계산 (`src/hooks/useDday.ts`)

## 6. 나중에 방명록을 추가하고 싶다면

Firebase Firestore를 연동한 방명록 버전이 필요하면 다시 요청해주세요. 별도 컬렉션(`guestbook`)에 이름/메시지/비밀번호 해시를 저장하는 구조로 다시 붙일 수 있습니다.
