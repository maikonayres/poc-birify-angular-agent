export interface AuthApiSessionDto {
  id: string;
  email: string;
  tenantId: string;
}

export interface AuthSessionApiResponseDto {
  accessToken: string;
  session: AuthApiSessionDto;
}
