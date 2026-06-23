import { PokemonEntryEntity } from '../../../domain/entity/pokemon-entry.entity';
import { PokemonListPageEntity } from '../../../domain/entity/pokemon-list-page.entity';
import { ListPokedexCursorResponseDto } from '../dtos/list-pokedex-cursor-response.dto';
import { PokedexEntryResponseDto } from '../dtos/pokedex-entry-response.dto';

export class PokedexMapper {
  public static toEntryEntity(dto: PokedexEntryResponseDto): PokemonEntryEntity {
    return new PokemonEntryEntity(
      dto.dexNumber,
      dto.name,
      dto.typePrimary,
      dto.typeSecondary,
      dto.heightDm,
      dto.weightHg,
    );
  }

  public static toListPageEntity(dto: ListPokedexCursorResponseDto): PokemonListPageEntity {
    return new PokemonListPageEntity(
      dto.items.map(PokedexMapper.toEntryEntity),
      dto.hasMore,
      dto.nextCursor,
    );
  }
}
