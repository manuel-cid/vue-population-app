export interface Entity {
  name: string;
  population: number;
}

export interface Region extends Entity {}

export interface Country extends Entity {
  region: string;
}
