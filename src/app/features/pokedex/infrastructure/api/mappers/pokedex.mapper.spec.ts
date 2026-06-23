import { PokedexMapper } from './pokedex.mapper';
import { ListPokedexCursorResponseDto } from '../dtos/list-pokedex-cursor-response.dto';

describe('PokedexMapper', () => {
  it('maps API response to list page entity with selected fields', () => {
    const dto: ListPokedexCursorResponseDto = {
      items: [
        {
          id: 'uuid-1',
          dexNumber: 25,
          name: 'Pikachu',
          typePrimary: 'Electric',
          typeSecondary: 'Flying',
          description: 'Ignored description',
          heightDm: 4,
          weightHg: 60,
        },
      ],
      hasMore: true,
      nextCursor: 25,
    };

    const entity = PokedexMapper.toListPageEntity(dto);

    expect(entity.items).toHaveLength(1);
    expect(entity.items[0].dexNumber).toBe(25);
    expect(entity.items[0].name).toBe('Pikachu');
    expect(entity.items[0].typePrimary).toBe('Electric');
    expect(entity.items[0].typeSecondary).toBe('Flying');
    expect(entity.items[0].heightDm).toBe(4);
    expect(entity.items[0].weightHg).toBe(60);
    expect(entity.hasMore).toBe(true);
    expect(entity.nextCursor).toBe(25);
  });

  it('maps null typeSecondary', () => {
    const dto: ListPokedexCursorResponseDto = {
      items: [
        {
          id: 'uuid-2',
          dexNumber: 1,
          name: 'Bulbasaur',
          typePrimary: 'Grass',
          typeSecondary: null,
          description: 'Desc',
          heightDm: 7,
          weightHg: 69,
        },
      ],
      hasMore: false,
      nextCursor: null,
    };

    const entity = PokedexMapper.toListPageEntity(dto);

    expect(entity.items[0].typeSecondary).toBeNull();
    expect(entity.hasMore).toBe(false);
    expect(entity.nextCursor).toBeNull();
  });
});
