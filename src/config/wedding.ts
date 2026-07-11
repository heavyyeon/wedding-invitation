// 청첩장에 들어가는 모든 텍스트/데이터를 한 곳에서 관리합니다.
// 계좌번호 등은 실제 배포 전 반드시 실제 값으로 교체하세요.

export const wedding = {
  groom: {
    name: "김진우",
    // 부모님 성함이 있다면 아래에 채워서 CastingSection 등에서 활용할 수 있습니다.
    // fatherName: "",
    // motherName: "",
  },
  bride: {
    name: "김수연",
  },

  // 날짜/시간 (JS Date 기준: month는 1~12 그대로 사용, 아래 로직에서 -1 처리)
  date: {
    year: 2026,
    month: 11,
    day: 15,
    hour: 12,
    minute: 20,
    // 화면 표기용
    displayDate: "2026년 11월 15일 일요일",
    displayTime: "낮 12시 20분",
  },

  venue: {
    name: "공군호텔 3층 그랜드볼룸",
    address: "서울특별시 영등포구 여의대방로 259",
    tel: "", // 예: 02-000-0000 (있다면 입력)
    // 카카오맵 / 네이버맵 딥링크에 사용할 검색 쿼리
    mapQuery: "공군호텔",
  },

  directions: {
    subway: [
      "1호선 대방역 하차 후 도보 이동 (정확한 출구/도보 시간은 예식장 확정 안내에 맞춰 수정해주세요)",
    ],
    bus: [
      "정류장명 및 버스 번호는 실제 예식장 안내문에 맞춰 입력해주세요.",
    ],
    car: [
      "내비게이션에 '공군호텔' 또는 '서울특별시 영등포구 여의대방로 259' 입력",
      "예식장 내 주차장 이용 (주차 가능 대수 및 발렛 여부는 예식장에 확인해주세요)",
    ],
  },

  // 마음 전하실 곳
  accounts: [
    {
      side: "신랑측",
      role: "신랑",
      name: "김진우",
      bank: "은행명 입력",
      number: "계좌번호 입력",
    },
    {
      side: "신랑측",
      role: "신랑 아버지",
      name: "",
      bank: "",
      number: "",
    },
    {
      side: "신랑측",
      role: "신랑 어머니",
      name: "",
      bank: "",
      number: "",
    },
    {
      side: "신부측",
      role: "신부",
      name: "김수연",
      bank: "은행명 입력",
      number: "계좌번호 입력",
    },
    {
      side: "신부측",
      role: "신부 아버지",
      name: "",
      bank: "",
      number: "",
    },
    {
      side: "신부측",
      role: "신부 어머니",
      name: "",
      bank: "",
      number: "",
    },
  ],

  invitationMessage: [
    "두 사람이 하나의 이름으로",
    "새로운 시작을 함께 하려 합니다.",
    "",
    "저희 두 사람의 첫 걸음에",
    "귀한 걸음 하시어",
    "축복해 주시면 감사하겠습니다.",
  ],

  gallery: {
    count: 22,
  },

  kakao: {
    title: "김진우 ♥ 김수연 결혼합니다",
    description: "2026년 11월 15일 일요일 낮 12시 20분, 공군호텔 3층 그랜드볼룸",
  },
};

export type AccountInfo = (typeof wedding.accounts)[number];
