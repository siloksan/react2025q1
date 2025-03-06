export const REGIONS = {
  ALL: 'all',
  ANTARCTIC: 'Antarctic',
  ARMENIA: 'Americas',
  EUROPE: 'Europe',
  AFRICA: 'Africa',
  ASIA: 'Asia',
  OCEANIA: 'Oceania',
} as const;

export type Regions = (typeof REGIONS)[keyof typeof REGIONS];
