# Arquitetura do Projeto

Este projeto segue **Domain-Driven Design (DDD)** com **Arquitetura Hexagonal (Ports & Adapters)** aplicados ao Angular.

## Stack

| Tecnologia    | Versao | Papel                            |
| ------------- | ------ | -------------------------------- |
| Angular       | 21+    | Framework (zoneless, standalone) |
| NgRx Signals  | 21+    | State management                 |
| PrimeNG       | 21+    | Componentes de UI                |
| Tailwind CSS  | 4+     | Utility CSS                      |
| ngx-translate | 17+    | Internacionalizacao              |
| Vitest        | 4+     | Testes unitarios                 |

## Estrutura Geral

```
src/app/
  core/                 -- Modulos transversais (nao sao dominios DDD)
  features/             -- Features isoladas por dominio
  shared/               -- Enums, models, utilitarios e extensoes reutilizaveis
```

## Estrutura do `core/`

O `core/` **nao segue camadas DDD**. Cada concern fica no primeiro nivel como modulo tecnico:

```
core/
  config/               Constantes globais
  guards/               Route guards
  http/                 Interceptors HTTP
  ports/                Contratos genericos (ex: SessionPort)
  layout/               Shell da aplicacao (topbar, sidebar, menu)
    components/
    services/
  appearance/           Tema, paleta e preferencias visuais
    components/, store/, facades/, services/, persistence/
    appearance.providers.ts
  i18n/                 Internacionalizacao
    components/, store/, facades/, services/, persistence/
    i18n.providers.ts
  loading/              Loader global e estado de carregamento
    components/, store/, services/
```

Modulos do `core/` podem ter store, facade e components internamente, mas isso e organizacao tecnica — nao replica domain/application/infrastructure das features.

## Tipos de Feature

Escolha o formato conforme a complexidade do dominio:

### Feature completa (4 camadas)

Use quando ha regras de negocio, API, persistencia ou estado de dominio.

Exemplo: `features/auth/` com `domain/`, `application/`, `infrastructure/` e `presentation/`.

```
features/auth/
  domain/
  application/
  infrastructure/
  presentation/
    pages/login/          -- rotas com subpastas quando ha multiplas telas
    components/
    facades/
    store/
  auth.providers.ts
```

### Feature leve (somente presentation)

Use para placeholders, telas estaticas ou CRUD simples sem logica de dominio relevante.

Exemplo: `features/dashboard/`, `features/audit/`.

```
features/dashboard/
  presentation/
    pages/dashboard/
      dashboard.page.ts
      dashboard.page.html
      dashboard.page.css
```

A diferenca em relacao a feature completa e a ausencia das camadas `domain/`, `application/` e `infrastructure/`.

## Camadas de uma Feature (completa)

Cada feature segue 4 camadas com direcao de dependencia de fora para dentro:

```
presentation  -->  application  -->  domain  <--  infrastructure
```

### Domain

Nucleo do negocio. Nao depende de nenhuma outra camada.

```
domain/
  entity/           Entidades imutaveis com logica de negocio
  ports/            Contratos abstratos (abstract class)
  repositories/     Contratos abstratos de acesso a dados
```

- Entidades usam `readonly` em todas as propriedades
- Ports e repositories sao `abstract class` (necessario para DI do Angular)

### Application

Orquestra casos de uso. Depende apenas do domain.

```
application/
  use-cases/        1 classe = 1 caso de uso, metodo execute()
```

- Use cases injetam Ports e Repositories (abstratos)
- Nao conhecem detalhes de infraestrutura ou UI

### Infrastructure

Implementacao concreta de acesso externo. Depende apenas do domain.

```
infrastructure/
  api/
    repositories/   Implementacao REST dos repositories
    dtos/           Objetos de transferencia de dados
    mappers/        Conversao DTO -> Entity
    persistence/    Persistencia local (localStorage, SQLite, etc.)
```

- DTOs representam o contrato da API externa
- Mappers garantem que entidades do dominio nao vazam detalhes da API

### Presentation

Interface com o usuario. Depende de application e domain.

```
presentation/
  adapters/         Implementacao concreta dos Ports
  pages/            Smart components (rotas)
  components/       Dumb components (presentational)
  facades/          Ponto de entrada da UI para use cases
  store/            NgRx Signal Store
  view-models/      Interfaces de view model
  services/         Servicos de presentation (ex: i18n VM)
```

## Ports & Adapters

O padrao central da arquitetura. Permite trocar implementacoes sem alterar regras de negocio.

**Port** = contrato abstrato que define o que uma camada precisa.
**Adapter** = implementacao concreta que satisfaz o contrato.

```
core/ports/session.port.ts          Port generico (core nao conhece features)
features/auth/domain/ports/         Ports do dominio auth
features/auth/presentation/adapters/ Adapters que implementam os ports
```

Exemplo:

```typescript
// Port (domain) -- define O QUE
export abstract class AuthSessionPort extends SessionPort {
  abstract hydrateSession(): void;
  abstract setSession(session: AuthSessionEntity): void;
}

// Adapter (presentation) -- define COMO
export class AuthSessionAdapter extends AuthSessionPort {
  private readonly _authStore = inject(AuthStore);
  hydrateSession(): void {
    this._authStore.hydrateSession();
  }
}
```

Usamos `abstract class` ao inves de `interface` porque o sistema de DI do Angular precisa de um token em runtime.

## Dependency Injection

Cada feature encapsula seus providers em uma funcao `provide<Nome>()`:

```typescript
// features/auth/auth.providers.ts
export function provideAuth(): EnvironmentProviders {
  return makeEnvironmentProviders([
    AuthSessionAdapter,
    { provide: AuthSessionPort, useExisting: AuthSessionAdapter },
    { provide: SessionPort, useExisting: AuthSessionAdapter },
    { provide: AuthRepository, useClass: RestAuthRepository },
  ]);
}
```

Registrado no `app.config.ts`:

```typescript
providers: [
  provideRouter(routes, ...),
  provideHttpClient(...),
  provideAuth(),
]
```

### useExisting vs useClass

- `useExisting` -- reutiliza uma instancia ja registrada (para multiplos tokens apontando para o mesmo adapter)
- `useClass` -- cria uma nova instancia (para token com implementacao unica)

## NgRx Signal Store

Cada store e organizado em arquivos separados:

```
store/
  models/<nome>-store.model.ts    Interface do estado
  <nome>.slice.ts                 Estado inicial
  <nome>.updaters.ts              Funcoes PartialStateUpdater puras
  <nome>.store.ts                 Composicao com signalStore()
```

Regras:

- Updaters sao funcoes puras
- Stores usam `providedIn: 'root'`
- Componentes NAO acessam o store diretamente -- usam Facades ou Adapters

## Direcao de Dependencias

Regra fundamental que nunca deve ser violada:

```
core/  ---X--->  features/     (core usa Ports, nunca importa de features)
application/  ---X--->  presentation/  (application usa Ports, nunca importa de presentation)
domain/  ---X--->  qualquer camada    (domain nao importa de ninguem)
```

## Nomenclatura

| Tipo                  | Sufixo                            | Exemplo              |
| --------------------- | --------------------------------- | -------------------- |
| Entidade              | `Entity`                          | `AuthSessionEntity`  |
| Port                  | `Port`                            | `AuthSessionPort`    |
| Adapter               | `Adapter`                         | `AuthSessionAdapter` |
| Repository (contrato) | `Repository`                      | `AuthRepository`     |
| Repository (impl)     | `Repository`                      | `RestAuthRepository` |
| Use Case              | `UseCase`                         | `LoginUseCase`       |
| Facade                | `Facade`                          | `AuthFacade`         |
| DTO                   | `Dto`                             | `LoginRequestDto`    |
| Mapper                | `Mapper`                          | `AuthMapper`         |
| Page                  | `Page` + `.page.ts`               | `LoginPage`          |
| Component             | `.component.ts`                   | `LoginComponent`     |
| Store                 | `Store`                           | `AuthStore`          |
| Providers             | `provide<Nome>` + `.providers.ts` | `provideAuth()`      |

Convencoes de arquivo:

- Pages de rota: `*.page.ts`, `*.page.html`, `*.page.scss`
- Componentes: `*.component.ts`, `*.component.html`, `*.component.scss`
- Evitar prefixo `app.` nos nomes de arquivo (reservado para selectors)
- Selectors podem manter prefixo `app-` (ex: `app-menu`, `AppMenu`)

## Criando uma Nova Feature

### Caminho completo (dominio com regras de negocio)

1. Criar a pasta `features/<nome>/`
2. Definir entidades em `domain/entity/`
3. Definir contratos abstratos em `domain/repositories/` e `domain/ports/`
4. Implementar use cases em `application/use-cases/`
5. Implementar repositories em `infrastructure/api/repositories/`
6. Criar DTOs e mappers em `infrastructure/api/dtos/` e `mappers/`
7. Criar store em `presentation/store/`
8. Criar adapter em `presentation/adapters/`
9. Criar facade em `presentation/facades/`
10. Criar pages em `presentation/pages/<rota>/` e components em `presentation/components/`
11. Criar `<nome>.providers.ts` na raiz da feature
12. Registrar `provide<Nome>()` no `app.config.ts`
13. Adicionar rota lazy em `app.routes.ts`

### Caminho leve (tela simples)

1. Criar `features/<nome>/presentation/pages/<rota>/<rota>.page.ts` (+ html/css)
2. Adicionar rota lazy em `app.routes.ts`
3. Evoluir para feature completa quando surgirem regras de negocio, API ou estado de dominio

## Shared

```
shared/
  enums/                Enumeracoes compartilhadas
  models/               Interfaces e tipos compartilhados
  signal-store/         Extensoes reutilizaveis para NgRx Signal Store
  helpers/              Utilitarios de teste (test-helpers.ts)
```

## Testes unitarios

Stack: **Vitest** via `ng test` (`@angular/build:unit-test`).

### Comandos

| Comando | Descricao |
| ------- | --------- |
| `npm test` | Roda todos os specs uma vez |
| `npm run test:watch` | Modo watch |
| `npm run test:coverage` | Relatorio de cobertura com gate minimo (~80%) |

### Convencoes de spec

| Tipo | Spec obrigatorio? | O que testar |
| ---- | ----------------- | ------------ |
| Use case, mapper, updater | Sim | Comportamento puro (entrada/saida, side effects) |
| Guard, interceptor | Sim | Redirect, headers, flags de contexto HTTP |
| Store, facade, service, adapter, storage, repository | Sim | Mutacoes de estado, delegacao, persistencia, HTTP |
| Componente / page | Sim | Smoke + interacoes criticas (submit, toggle, navegacao) |
| Enum, DTO, VM, port abstrato, `*.providers.ts` | Nao | Sem logica testavel |

### Harness compartilhado

`src/app/shared/helpers/test-helpers.ts` centraliza providers comuns:

- `getTestProviders()` — HttpClient, Router, mocks de i18n/translate
- `provideI18nFacadeMock()`, `provideAppearanceFacadeMock()` — facades usadas em componentes de layout/login

`src/test-setup.ts` inicializa `localStorage` para specs de storage.

### Exclusoes de cobertura

Configuradas em `angular.json` (`coverageExclude`): specs, models, DTOs, VMs, ports, providers e enums.

## Documentação de negócio

Contratos e regras descritas fora do código (por domínio): [referências de business rules](./business-rules/references.md).
