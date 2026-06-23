export class AuthSessionPrincipalEntity {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly lastName: string | null,
    public readonly tenantId: string,
  ) {}
}
