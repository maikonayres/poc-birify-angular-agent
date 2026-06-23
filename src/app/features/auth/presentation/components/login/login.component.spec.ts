import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { getTestProviders, provideI18nFacadeMock } from '../../../../../shared/helpers/test-helpers';
import { AppearanceFacade } from '../../../../../core/appearance/facades/appearance.facade';
import { LoginComponent } from './login.component';
import { AuthFacade } from '../../facades/auth.facade';
import { LoginI18nVmService } from '../../services/login-i18n-vm.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authFacade: {
    login: ReturnType<typeof vi.fn>;
    clearLoginError: ReturnType<typeof vi.fn>;
    loginErrorMessage: { (): string | null };
    isLoggingIn: { (): boolean };
  };

  beforeEach(async () => {
    authFacade = {
      login: vi.fn(),
      clearLoginError: vi.fn(),
      loginErrorMessage: signal<string | null>(null).asReadonly(),
      isLoggingIn: signal(false),
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        ...getTestProviders(),
        { provide: AuthFacade, useValue: authFacade },
        provideI18nFacadeMock(),
        {
          provide: AppearanceFacade,
          useValue: {
            isDarkTheme: signal(false),
            toggleDarkTheme: vi.fn(),
            presets: [],
            surfaces: [],
            primaryColors: signal([]),
            preset: signal('Aura'),
            primary: signal('emerald'),
            surface: signal(null),
            darkTheme: signal(false),
            menuMode: signal('static'),
            menuModeOptions: [],
            updatePrimary: vi.fn(),
            updateSurface: vi.fn(),
            changePreset: vi.fn(),
            changeMenuMode: vi.fn(),
            hydrate: vi.fn(),
          },
        },
        {
          provide: LoginI18nVmService,
          useValue: {
            vm: signal({
              title: 'Login',
              subtitle: 'Subtitle',
              emailLabel: 'Email',
              emailPlaceholder: 'email',
              passwordLabel: 'Password',
              passwordPlaceholder: 'password',
              submitButton: 'Sign in',
              forgotPassword: 'Forgot',
              rememberMe: 'Remember',
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submits credentials via facade when form is valid', () => {
    component.submit();

    expect(authFacade.login).toHaveBeenCalledWith('tenant-admin@dev.com', 'TenantAdmin@123456');
  });

  it('does not submit when form is invalid', () => {
    component['form'].controls.email.setValue('');

    component.submit();

    expect(authFacade.login).not.toHaveBeenCalled();
  });

  it('clears login error when email changes', () => {
    component['form'].controls.email.setValue('other@test.com');

    expect(authFacade.clearLoginError).toHaveBeenCalled();
  });
});
