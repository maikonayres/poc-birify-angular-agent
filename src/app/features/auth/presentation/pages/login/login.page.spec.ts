import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LoginPage } from './login.page';
import { AuthFacade } from '../../facades/auth.facade';
import { LoginI18nVmService } from '../../services/login-i18n-vm.service';
import { AppearanceFacade } from '../../../../../core/appearance/facades/appearance.facade';
import { getTestProviders, provideI18nFacadeMock } from '../../../../../shared/helpers/test-helpers';

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        ...getTestProviders(),
        {
          provide: AuthFacade,
          useValue: {
            login: vi.fn(),
            clearLoginError: vi.fn(),
            loginErrorMessage: signal<string | null>(null).asReadonly(),
            isLoggingIn: signal(false),
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
        provideI18nFacadeMock(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    fixture.detectChanges();
  });

  it('renders login component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-login')).toBeTruthy();
  });
});
