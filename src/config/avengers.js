export const GENDERS = {
  MALE: 'Male',
  FEMALE: 'Female',
  UNKNOWN: 'Unknown',
};

export const GROUPS = {
  HEROES: 'Heroes',
  VILLAINS: 'Villains',
  SIDEKICKS: 'Sidekicks',
};

export const PROFILES = [
  {
    name: 'Tony Stark (Iron Man)',
    group: GROUPS.HEROES,
    gender: GENDERS.MALE,
    images: [
      'ironman1.jpg',
      'ironman2.jpg',
      'tonystark1.jpg',
      'tonystark2.jpg',
    ],
  },
  {
    name: 'Nick Fury',
    group: GROUPS.HEROES,
    gender: GENDERS.MALE,
    images: [
      'fury1.jpg',
      'fury2.jpg',
    ],
  },
  {
    name: 'Steve Rogers (Captain America)',
    group: GROUPS.HEROES,
    gender: GENDERS.MALE,
    images: [
      'captain1.jpg',
      'captain2.jpg',
      'captain3.jpg',
    ],
  },
  {
    name: 'Natasha Romanova (Black Widow)',
    group: GROUPS.HEROES,
    gender: GENDERS.FEMALE,
    images: [
      'widow1.jpg',
      'widow2.jpg',
    ],
  },
  {
    name: 'Pepper Potts',
    group: GROUPS.SIDEKICKS,
    gender: GENDERS.FEMALE,
    images: [
      'pepper1.jpg',
      'pepper2.jpg',
      'pepper3.jpg',
    ],
  },
  {
    name: 'Loki',
    group: GROUPS.VILLAINS,
    gender: GENDERS.MALE,
    images: [
      'loki1.jpg',
      'loki2.jpg',
    ],
  },
  {
    name: 'Agent Peggy Carter',
    group: GROUPS.SIDEKICKS,
    gender: GENDERS.FEMALE,
    images: [
      'carter1.jpg',
      'carter2.jpg',
    ],
  },
];