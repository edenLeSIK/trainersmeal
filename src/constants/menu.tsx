export const blockData = {
  base: [
    { block: "BM", name: "곡물 샐러드 베이스", price: 2100 },
    { block: "BV", name: "샐러드 베이스", price: 1900 },
    { block: "BR", name: "헬스 볶음밥", price: 1500 },
    { block: "BB", name: "빈믹스 샐러드", price: 1500 },
  ],
  flavor: [
    { block: "F1", name: "무지방 발사믹 드레싱", price: 600 },
    { block: "F10", name: "마늘 소스", price: 700 },
    { block: "F11", name: "데리야끼 소스", price: 600 },
    { block: "F12", name: "참깨 드레싱", price: 700 },
    { block: "F2", name: "무지방 오리엔탈 드레싱", price: 600 },
    { block: "F3", name: "레몬 갈릭 올리브 드레싱", price: 700 },
    { block: "F5", name: "허니머스터드 소스", price: 700 },
    { block: "F6", name: "렌치 드레싱", price: 700 },
    { block: "F7", name: "치폴레 드레싱", price: 800 },
    { block: "F9", name: "깻잎 페스토", price: 900 },
  ],
  protein: [
    { block: "PB1", name: "수비드 부채살 큐브", price: 7600 },
    { block: "PB2", name: "로스트 비프", price: 6200 },
    { block: "PC1", name: "수비드 닭가슴살", price: 4800 },
    { block: "PC2", name: "로스트 치킨", price: 5500 },
    { block: "PC3", name: "치킨 머시기", price: 4000 },
    { block: "PD1", name: "훈제오리 가슴살", price: 5500 },
    { block: "PF2", name: "구운 연어", price: 7000 },
    { block: "PF3", name: "훈제 연어", price: 6300 },
    { block: "PF4", name: "참치 큐브", price: 5200 },
    { block: "PP1", name: "수비드 돈목살", price: 5600 },
    { block: "PP2", name: "수비드 돈안심", price: 5500 },
    { block: "PP3", name: "풀드포크", price: 5300 },
    { block: "PP4", name: "수비드 돈등심 동파육", price: 3100 },
  ],
  vegetable: [
    { block: "VM1", name: "구운 야채 믹스", price: 4200 },
    { block: "VM2", name: "구운 구황작물 믹스", price: 3800 },
    { block: "VM3", name: "현미밥 & 구운 버섯", price: 3900 },
    { block: "VM4", name: "모듬 곡물 유틸믹스", price: 4300 },
    { block: "VM5", name: "펜네 구운 야채 믹스", price: 3900 },
    { block: "VM6", name: "단호박&두부면 믹스", price: 4100 },
    { block: "VM7", name: "마라 두부면 볶음", price: 3100 },
    { block: "VM8", name: "발사믹 새송이 믹스", price: 3100 },
  ],
};

export const balanceAMenu = [
  {
    day: "월",
    name: "수비드 부채살 포케",
    price: 14800,
    discountPrice: 11000,
    discount: 3800,
    base: blockData.base.find((item) => item.block === "BM"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PB1"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PP3"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM1"),
          blockData.vegetable.find((item) => item.block === "VM8"),
          blockData.vegetable.find((item) => item.block === "VM4"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F9"),
          blockData.flavor.find((item) => item.block === "F5"),
          blockData.flavor.find((item) => item.block === "F1"),
        ],
      },
    ],
  },
  {
    day: "화",
    name: "로스트치킨 펜네 포케",
    price: 12100,
    discountPrice: 11000,
    discount: 1100,
    base: blockData.base.find((item) => item.block === "BM"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PC2"),
          blockData.protein.find((item) => item.block === "PP4"),
          blockData.protein.find((item) => item.block === "PB1"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM5"),
          blockData.vegetable.find((item) => item.block === "VM8"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F1"),
          blockData.flavor.find((item) => item.block === "F7"),
          blockData.flavor.find((item) => item.block === "F9"),
        ],
      },
    ],
  },
  {
    day: "수",
    name: "수비드 돈안심 현미 포케",
    price: 12100,
    discountPrice: 11000,
    discount: 1100,
    base: blockData.base.find((item) => item.block === "BM"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PP2"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PF3"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM3"),
          blockData.vegetable.find((item) => item.block === "VM8"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F2"),
          blockData.flavor.find((item) => item.block === "F7"),
          blockData.flavor.find((item) => item.block === "F6"),
        ],
      },
    ],
  },
  {
    day: "목",
    name: "훈제오리 포케",
    price: 12500,
    discountPrice: 11000,
    discount: 1500,
    base: blockData.base.find((item) => item.block === "BM"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PD1"),
          blockData.protein.find((item) => item.block === "PP4"),
          blockData.protein.find((item) => item.block === "PF2"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM1"),
          blockData.vegetable.find((item) => item.block === "VM7"),
          blockData.vegetable.find((item) => item.block === "VM5"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F5"),
          blockData.flavor.find((item) => item.block === "F7"),
          blockData.flavor.find((item) => item.block === "F2"),
        ],
      },
    ],
  },
  {
    day: "금",
    name: "수비드 돈목살 포케",
    price: 12800,
    discountPrice: 11000,
    discount: 1800,
    base: blockData.base.find((item) => item.block === "BM"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PP1"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PF2"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM4"),
          blockData.vegetable.find((item) => item.block === "VM7"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F7"),
          blockData.flavor.find((item) => item.block === "F2"),
          blockData.flavor.find((item) => item.block === "F12"),
        ],
      },
    ],
  },
  {
    day: "토",
    name: "참치 두부면 포케",
    price: 12100,
    discountPrice: 11000,
    discount: 1100,
    base: blockData.base.find((item) => item.block === "BM"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PF4"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PP1"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM6"),
          blockData.vegetable.find((item) => item.block === "VM7"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F12"),
          blockData.flavor.find((item) => item.block === "F7"),
          blockData.flavor.find((item) => item.block === "F9"),
        ],
      },
    ],
  },
];

export const balanceBMenu = [
  {
    day: "월",
    name: "수비드 닭가슴살 포케",
    price: 11700,
    discountPrice: 11000,
    discount: 700,
    base: blockData.base.find((item) => item.block === "BM"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PC1"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PB1"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM1"),
          blockData.vegetable.find((item) => item.block === "VM8"),
          blockData.vegetable.find((item) => item.block === "VM4"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F1"),
          blockData.flavor.find((item) => item.block === "F9"),
          blockData.flavor.find((item) => item.block === "F7"),
        ],
      },
    ],
  },
  {
    day: "화",
    name: "풀드포크 현미 포케",
    price: 12100,
    discountPrice: 11000,
    discount: 1100,
    base: blockData.base.find((item) => item.block === "BM"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PP3"),
          blockData.protein.find((item) => item.block === "PP4"),
          blockData.protein.find((item) => item.block === "PB2"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM3"),
          blockData.vegetable.find((item) => item.block === "VM8"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F7"),
          blockData.flavor.find((item) => item.block === "F5"),
          blockData.flavor.find((item) => item.block === "F2"),
        ],
      },
    ],
  },
  {
    day: "수",
    name: "훈제연어포케",
    price: 13400,
    discountPrice: 11000,
    discount: 2400,
    base: blockData.base.find((item) => item.block === "BM"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PF3"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PF3"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM4"),
          blockData.vegetable.find((item) => item.block === "VM8"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F6"),
          blockData.flavor.find((item) => item.block === "F9"),
          blockData.flavor.find((item) => item.block === "F2"),
        ],
      },
    ],
  },
  {
    day: "목",
    name: "로스트치킨 포케",
    price: 12000,
    discountPrice: 11000,
    discount: 1000,
    base: blockData.base.find((item) => item.block === "BM"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PC2"),
          blockData.protein.find((item) => item.block === "PP4"),
          blockData.protein.find((item) => item.block === "PF2"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM2"),
          blockData.vegetable.find((item) => item.block === "VM7"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F11"),
          blockData.flavor.find((item) => item.block === "F12"),
          blockData.flavor.find((item) => item.block === "F9"),
        ],
      },
    ],
  },
  {
    day: "금",
    name: "로스트비프 펜네 포케",
    price: 12800,
    discountPrice: 11000,
    discount: 1800,
    base: blockData.base.find((item) => item.block === "BM"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PB2"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PF2"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM5"),
          blockData.vegetable.find((item) => item.block === "VM7"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F2"),
          blockData.flavor.find((item) => item.block === "F3"),
          blockData.flavor.find((item) => item.block === "F9"),
        ],
      },
    ],
  },
  {
    day: "토",
    name: "참치 두부면 포케",
    price: 12100,
    discountPrice: 11000,
    discount: 1100,
    base: blockData.base.find((item) => item.block === "BM"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PF4"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PP1"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM6"),
          blockData.vegetable.find((item) => item.block === "VM7"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F10"),
          blockData.flavor.find((item) => item.block === "F2"),
          blockData.flavor.find((item) => item.block === "F9"),
        ],
      },
    ],
  },
];

export const dietAMenu = [
  {
    day: "월",
    name: "수비드 닭가슴살 샐러드",
    price: 11500,
    discountPrice: 11000,
    discount: 500,
    base: blockData.base.find((item) => item.block === "BV"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PC1"),
          blockData.protein.find((item) => item.block === "PP4"),
          blockData.protein.find((item) => item.block === "PB1"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM1"),
          blockData.vegetable.find((item) => item.block === "VM8"),
          blockData.vegetable.find((item) => item.block === "VM2"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F2"),
          blockData.flavor.find((item) => item.block === "F6"),
          blockData.flavor.find((item) => item.block === "F7"),
        ],
      },
    ],
  },
  {
    day: "화",
    name: "수비드 부채살 두부면 샐러드",
    price: 14500,
    discountPrice: 11000,
    discount: 3500,
    base: blockData.base.find((item) => item.block === "BV"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PB1"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PP1"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM6"),
          blockData.vegetable.find((item) => item.block === "VM8"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F9"),
          blockData.flavor.find((item) => item.block === "F5"),
          blockData.flavor.find((item) => item.block === "F10"),
        ],
      },
    ],
  },
  {
    day: "수",
    name: "수비드 돈안심 샐러드",
    price: 11900,
    discountPrice: 11000,
    discount: 900,
    base: blockData.base.find((item) => item.block === "BV"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PP2"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PF3"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM2"),
          blockData.vegetable.find((item) => item.block === "VM8"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F10"),
          blockData.flavor.find((item) => item.block === "F9"),
          blockData.flavor.find((item) => item.block === "F2"),
        ],
      },
    ],
  },
  {
    day: "목",
    name: "로스트 치킨 샐러드",
    price: 12200,
    discountPrice: 11000,
    discount: 1200,
    base: blockData.base.find((item) => item.block === "BV"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PC2"),
          blockData.protein.find((item) => item.block === "PP4"),
          blockData.protein.find((item) => item.block === "PF2"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM5"),
          blockData.vegetable.find((item) => item.block === "VM7"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F9"),
          blockData.flavor.find((item) => item.block === "F10"),
          blockData.flavor.find((item) => item.block === "F2"),
        ],
      },
    ],
  },
  {
    day: "금",
    name: "훈제오리 샐러드",
    price: 11800,
    discountPrice: 11000,
    discount: 800,
    base: blockData.base.find((item) => item.block === "BV"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PD1"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PF2"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM2"),
          blockData.vegetable.find((item) => item.block === "VM7"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F1"),
          blockData.flavor.find((item) => item.block === "F6"),
          blockData.flavor.find((item) => item.block === "F12"),
        ],
      },
    ],
  },
  {
    day: "토",
    name: "구운 연어 샐러드",
    price: 13700,
    discountPrice: 11000,
    discount: 2700,
    base: blockData.base.find((item) => item.block === "BV"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PF2"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PP1"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM1"),
          blockData.vegetable.find((item) => item.block === "VM7"),
          blockData.vegetable.find((item) => item.block === "VM5"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F2"),
          blockData.flavor.find((item) => item.block === "F6"),
          blockData.flavor.find((item) => item.block === "F7"),
        ],
      },
    ],
  },
];

export const dietBMenu = [
  {
    day: "월",
    name: "로스트치킨 두부면 샐러드",
    price: 12100,
    discountPrice: 11000,
    discount: 1100,
    base: blockData.base.find((item) => item.block === "BV"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PC2"),
          blockData.protein.find((item) => item.block === "PP4"),
          blockData.protein.find((item) => item.block === "PB1"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM6"),
          blockData.vegetable.find((item) => item.block === "VM8"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F2"),
          blockData.flavor.find((item) => item.block === "F7"),
          blockData.flavor.find((item) => item.block === "F9"),
        ],
      },
    ],
  },
  {
    day: "화",
    name: "로스트비프 샐러드",
    price: 12900,
    discountPrice: 11000,
    discount: 1900,
    base: blockData.base.find((item) => item.block === "BV"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PB2"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PC1"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM1"),
          blockData.vegetable.find((item) => item.block === "VM8"),
          blockData.vegetable.find((item) => item.block === "VM2"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F1"),
          blockData.flavor.find((item) => item.block === "F9"),
          blockData.flavor.find((item) => item.block === "F6"),
        ],
      },
    ],
  },
  {
    day: "수",
    name: "수비드닭가슴살 현미 샐러드",
    price: 11500,
    discountPrice: 11000,
    discount: 500,
    base: blockData.base.find((item) => item.block === "BV"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PC1"),
          blockData.protein.find((item) => item.block === "PP4"),
          blockData.protein.find((item) => item.block === "PF3"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM3"),
          blockData.vegetable.find((item) => item.block === "VM8"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F9"),
          blockData.flavor.find((item) => item.block === "F10"),
          blockData.flavor.find((item) => item.block === "F5"),
        ],
      },
    ],
  },
  {
    day: "목",
    name: "수비드돈안심 샐러드",
    price: 11900,
    discountPrice: 11000,
    discount: 900,
    base: blockData.base.find((item) => item.block === "BV"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PP2"),
          blockData.protein.find((item) => item.block === "PP4"),
          blockData.protein.find((item) => item.block === "PF2"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM2"),
          blockData.vegetable.find((item) => item.block === "VM7"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F3"),
          blockData.flavor.find((item) => item.block === "F7"),
          blockData.flavor.find((item) => item.block === "F2"),
        ],
      },
    ],
  },
  {
    day: "금",
    name: "구운 연어 두부면 샐러드",
    price: 13900,
    discountPrice: 11000,
    discount: 2900,
    base: blockData.base.find((item) => item.block === "BV"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PF2"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PP1"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM6"),
          blockData.vegetable.find((item) => item.block === "VM7"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F9"),
          blockData.flavor.find((item) => item.block === "F10"),
          blockData.flavor.find((item) => item.block === "F7"),
        ],
      },
    ],
  },
  {
    day: "토",
    name: "참치 샐러드",
    price: 12100,
    discountPrice: 11000,
    discount: 1100,
    base: blockData.base.find((item) => item.block === "BV"),
    blocks: [
      {
        option: "선택 1",
        choices: [
          blockData.protein.find((item) => item.block === "PF4"),
          blockData.protein.find((item) => item.block === "PC3"),
          blockData.protein.find((item) => item.block === "PP1"),
        ],
      },
      {
        option: "선택 2",
        choices: [
          blockData.vegetable.find((item) => item.block === "VM4"),
          blockData.vegetable.find((item) => item.block === "VM7"),
          blockData.vegetable.find((item) => item.block === "VM1"),
        ],
      },
      {
        option: "선택 3",
        choices: [
          blockData.flavor.find((item) => item.block === "F3"),
          blockData.flavor.find((item) => item.block === "F9"),
          blockData.flavor.find((item) => item.block === "F1"),
        ],
      },
    ],
  },
];

export const menus = {
  balanceA: balanceAMenu,
  balanceB: balanceBMenu,
  dietA: dietAMenu,
  dietB: dietBMenu,
};
