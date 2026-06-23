export class PokemonEntryEntity {
  public constructor(
    public readonly dexNumber: number,
    public readonly name: string,
    public readonly typePrimary: string,
    public readonly typeSecondary: string | null,
    public readonly heightDm: number,
    public readonly weightHg: number,
  ) {}
}
