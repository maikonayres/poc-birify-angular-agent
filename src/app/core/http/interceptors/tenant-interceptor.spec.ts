import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom, of } from 'rxjs';
import { tenantInterceptor } from './tenant-interceptor';
import { environment } from '../../../../environments/environment';

describe('tenantInterceptor', () => {
  const originalOfficeKey = environment.clientKeys.office;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  afterEach(() => {
    environment.clientKeys.office = originalOfficeKey;
  });

  it('adds x-client-key header when office key is configured', async () => {
    environment.clientKeys.office = 'office-key';
    let capturedRequest: HttpRequest<unknown> | null = null;
    const request = new HttpRequest('GET', '/api/me');

    await firstValueFrom(
      TestBed.runInInjectionContext(() =>
        tenantInterceptor(request, (nextRequest) => {
          capturedRequest = nextRequest;
          return of(new HttpResponse({ body: null }));
        }),
      ),
    );

    expect(capturedRequest!.headers.get('x-client-key')).toBe('office-key');
  });

  it('passes request unchanged when office key is missing', async () => {
    environment.clientKeys.office = '';
    let capturedRequest: HttpRequest<unknown> | null = null;
    const request = new HttpRequest('GET', '/api/me');

    await firstValueFrom(
      TestBed.runInInjectionContext(() =>
        tenantInterceptor(request, (nextRequest) => {
          capturedRequest = nextRequest;
          return of(new HttpResponse({ body: null }));
        }),
      ),
    );

    expect(capturedRequest!.headers.has('x-client-key')).toBe(false);
  });
});
