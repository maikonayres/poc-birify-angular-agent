import { PokedexEntryResponseDto } from './pokedex-entry-response.dto';

export interface ListPokedexCursorResponseDto {
  items: PokedexEntryResponseDto[];
  nextCursor: number | null;
  hasMore: boolean;
}
