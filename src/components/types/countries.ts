export interface Country {
  name: CountryName;
  population: number;
  region: string;
  flag: string;
  flags: Flags;
}

interface CountryName {
  common: string;
}

interface Flags {
  alt?: string;
  png: string;
  svg: string;
}
