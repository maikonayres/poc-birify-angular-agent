import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest-guard/guest-guard';
import { authGuard } from './core/guards/auth-guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout/components/page-shell/page-shell.component').then(
        (m) => m.PageShell,
      ),
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/dashboard/presentation/pages/dashboard/dashboard.page').then(
                (m) => m.DashboardPage,
              ),
          },
          {
            path: 'teste',
            loadComponent: () =>
              import('./features/teste/presentation/pages/teste/teste.page').then(
                (m) => m.TestePage,
              ),
          },
        ],
      },
      {
        path: 'audit',
        children: [
          {
            path: 'imagens',
            loadComponent: () =>
              import('./features/audit/presentation/pages/audit-images/audit-images.page').then(
                (m) => m.AuditImagesPage,
              ),
          },
        ],
      },
      {
        path: 'pokedex',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/pokedex/presentation/pages/pokedex-list/pokedex-list.page').then(
                (m) => m.PokedexListPage,
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/presentation/pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'notfound',
    loadComponent: () =>
      import('./features/not-found/presentation/pages/not-found/not-found.page').then(
        (m) => m.NotFoundPage,
      ),
  },
  { path: '**', redirectTo: '/notfound' },
];
