# Birify Angular Agent

## Desenvolvimento

Instale as dependências:

```bash
npm install
```

Suba o frontend em modo desenvolvimento:

```bash
npm run start:dev
```

A aplicação fica disponível em `http://localhost:4900`.

A API de desenvolvimento aponta para `http://localhost:4001/api`. Para fluxos que dependem de autenticação (login, rotas protegidas), o backend precisa estar rodando nessa porta.

Documentação da API (Swagger): [http://localhost:4001/doc](http://localhost:4001/doc)

## Testes unitários

Os testes unitários usam [Vitest](https://vitest.dev/) via Angular CLI.

```bash
# Executa uma vez e encerra
npm test

# Modo watch (reexecuta ao salvar)
npm run test:watch

# Com relatório de cobertura
npm run test:coverage
```

## Testes E2E (Cypress)

Os testes E2E usam [Cypress](https://www.cypress.io/) contra a API real.

### Pré-requisitos

1. Backend rodando em `http://localhost:4001` (verifique em [http://localhost:4001/doc](http://localhost:4001/doc))
2. Credenciais configuradas:

```bash
cp cypress.env.example cypress.env.json
```

Valores padrão em `cypress.env.example`:

- Email: `tenant-admin@dev.com`
- Password: `TenantAdmin@123456`

O login exige o header `x-client-key`, enviado automaticamente pelo app a partir de `environment.development.ts` (`clientKeys.office`).

### Comandos

Com o backend já em execução:

```bash
# Sobe o frontend e roda os testes em modo headless
npm run e2e

# Roda os testes com o frontend já rodando (npm run start:dev)
npm run cy:run

# Abre a interface interativa do Cypress
npm run cy:open
```

O script `e2e` inicia o servidor de desenvolvimento automaticamente, mas **não** inicia o backend.

O Electron do Cypress resolve `localhost` para IPv6 (`::1`), enquanto a API costuma escutar só em IPv4. O projeto contorna isso reescrevendo a URL do login para `127.0.0.1` no intercept e mapeando `localhost` no `cypress.config.ts`.
