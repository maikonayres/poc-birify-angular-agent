# Auth Login Use Case

## Objetivo

Autenticar utilizador por tenant/aplicação e emitir access token JWT.

## Fonte de verdade no código (app)

- `src/app/features/auth/application/use-cases/login.use-case.ts`
- `src/app/features/auth/infrastructure/api/dtos/login-request.dto.ts`
- `src/app/features/auth/infrastructure/api/dtos/auth-session-api-response.dto.ts`
- `src/app/features/auth/infrastructure/api/mappers/auth.mapper.ts`
- `src/app/features/auth/domain/entity/auth-session.entity.ts`
- `src/app/features/auth/domain/entity/auth-session-principal.entity.ts`

## Entradas (HTTP)

- Header `x-client-key`: chave da aplicação cliente (tenant/app), definida em `environment.clientKeys` e aplicada pelo `tenantInterceptor` (`src/app/core/http/interceptors/tenant-interceptor.ts`).
- Corpo `POST /auth/login`:
  - `email`
  - `password`

## Contrato de saída HTTP (login e `GET /me`)

O cliente tipa a mesma forma para `POST /auth/login` e `GET /me` (`AuthSessionApiResponseDto`):

- `accessToken`: string (JWT).
- `session`:
  - `id`: identificador da sessão/utilizador no contexto atual.
  - `email`: email da sessão.
  - `tenantId`: identificador do tenant da sessão.

## Mapeamento para o domínio (app)

| Campo na API (`session`) | Entidade `AuthSessionPrincipalEntity`                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `id`                     | `id`                                                                                              |
| `email`                  | `email`                                                                                           |
| `tenantId`               | `tenantId`                                                                                        |
| (não enviado)            | `name`: derivado do prefixo do email antes de `@`, para exibição quando o backend não envia nome. |
| (não enviado)            | `lastName`: `null`                                                                                |

`AuthSessionEntity` agrupa `accessToken` + `session` (principal autenticado).

## Regras de negócio (lado servidor — referência)

Estas regras descrevem o comportamento típico do backend; o app apenas consome o contrato acima.

1. A `clientKey` do header deve mapear para uma tenant/application existente e habilitada.
2. O login resolve utilizador por tenant + email (email normalizado com `trim().toLowerCase()`).
3. Utilizador inexistente ou removido logicamente (`deletedAt`) não autentica.
4. Validação de senha via serviço de hash.
5. O perfil (`persona`) pode ser validado contra o canal da aplicação (ex.: office vs mobile).
6. Atualização de `lastLoginAt` pode ser best-effort.

## Erros esperados

- `401 Unauthorized`: `clientKey` inválida/inativa.
- `401 Unauthorized`: credenciais inválidas.
- `401 Unauthorized`: utilizador não permitido no canal da aplicação.

## Segurança

- Mensagens de credencial inválida devem permanecer genéricas no servidor.
- Não expor `passwordHash` nem dados sensíveis na API.

## Client key neste projeto (web / office)

- Header enviado: `x-client-key`.
- Valor: `environment.clientKeys.office` (ver `src/environments/environment*.ts`).
- O interceptor só envia o header quando `office` está definido; caso contrário a request segue sem `x-client-key`.

## Atualização obrigatória da doc

Atualize este ficheiro no mesmo PR sempre que houver mudança em:

- contrato JSON de `POST /auth/login` ou `GET /me`;
- regra de resolução de tenant por `clientKey` ou forma de envio do header;
- regras de compatibilidade persona/canal;
- estratégia de normalização de email;
- comportamento de erro de autenticação.
