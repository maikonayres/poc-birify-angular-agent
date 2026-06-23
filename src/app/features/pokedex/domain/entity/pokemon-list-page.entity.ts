import { PokemonEntryEntity } from './pokemon-entry.entity';

export class PokemonListPageEntity {
  public constructor(
    public readonly items: readonly PokemonEntryEntity[],
    public readonly hasMore: boolean,
    public readonly nextCursor: number | null,
  ) {}
}
