export interface PokedexEntryResponseDto {
  id: string;
  dexNumber: number;
  name: string;
  typePrimary: string;
  typeSecondary: string | null;
  description: string;
  heightDm: number;
  weightHg: number;
}
