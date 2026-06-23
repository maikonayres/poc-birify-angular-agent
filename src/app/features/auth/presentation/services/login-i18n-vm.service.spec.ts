import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { LoginI18nVmService } from './login-i18n-vm.service';
import { I18nService } from '../../../../core/i18n/services/i18n.service';

describe('LoginI18nVmService', () => {
  let service: LoginI18nVmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginI18nVmService,
        {
          provide: I18nService,
          useValue: {
            translations: signal({
              auth: {
                login: {
                  title: 'Entrar',
                  subtitle: 'Acesse sua conta',
                  forgotPassword: 'Esqueci',
                  rememberMe: 'Lembrar',
                },
              },
              fields: {
                email: { label: 'E-mail', placeholder: 'seu@email.com' },
                password: { label: 'Senha', placeholder: '••••••' },
              },
              global: { login: 'Entrar' },
            }),
          },
        },
      ],
    });

    service = TestBed.inject(LoginI18nVmService);
  });

  it('builds login vm from translations', () => {
    const vm = service.vm();

    expect(vm.title).toBe('Entrar');
    expect(vm.emailLabel).toBe('E-mail');
    expect(vm.submitButton).toBe('Entrar');
    expect(vm.rememberMe).toBe('Lembrar');
  });
});
