import { QueryObject } from '../../utils/createQueryString';

export type Payload = SpaceCraftsRequestPayload;

export interface SpaceCraftsRequestPayload extends QueryObject {
  name: string;
  registry: '';
  status: '';
}

export interface Page {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

interface Option {
  uid: string;
  name: string;
}

export interface SpacecraftClass {
  uid: string;
  name: string;
  numberOfDecks: string | null;
  crew: string;
  warpCapable: boolean;
  mirror: boolean;
  alternateReality: boolean;
  activeFrom: string;
  activeTo: string;
  species: string | null;
}

export interface Spacecraft {
  uid: string;
  name: string;
  registry: string | null;
  status: string;
  dateStatus: string;
  spacecraftClass: SpacecraftClass | null;
  owner: Option | null;
  operator: Option | null;
  affiliation: null;
}

export interface SpacecraftsResponse {
  page: Page;
  spacecrafts: Spacecraft[];
}

export interface SpacecraftResponse {
  spacecraft: Spacecraft;
}

export interface SpaceCraftsRequestParams {
  name: string;
  pageNumber: number;
}
