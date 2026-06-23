import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { signal } from '@angular/core';
import { LoginErrorMapper } from './login-error.mapper';
import { I18nService } from '../../../../core/i18n/services/i18n.service';

describe('LoginErrorMapper', () => {
  let mapper: LoginErrorMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginErrorMapper,
        {
          provide: I18nService,
          useValue: {
            translations: signal({
              auth: {
                login: {
                  title: '',
                  subtitle: '',
                  forgotPassword: '',
                  rememberMe: '',
                },
                errors: {
                  invalidCredentials: 'Invalid credentials',
                },
              },
              errors: {
                connection: 'Connection error',
                generic: 'Generic error',
                cameraDenied: '',
                photosDenied: '',
                noFile: '',
                fileTooLarge: '',
              },
            }),
          },
        },
      ],
    });

    mapper = TestBed.inject(LoginErrorMapper);
  });

  it('maps 401 to invalid credentials message', () => {
    const error = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });

    expect(mapper.map(error)).toBe('Invalid credentials');
  });

  it('maps status 0 to connection message', () => {
    const error = new HttpErrorResponse({ status: 0, statusText: 'Unknown Error' });

    expect(mapper.map(error)).toBe('Connection error');
  });

  it('maps 5xx to generic message', () => {
    const error = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });

    expect(mapper.map(error)).toBe('Generic error');
  });
});
