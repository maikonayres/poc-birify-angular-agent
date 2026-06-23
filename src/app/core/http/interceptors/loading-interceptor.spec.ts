import { TestBed } from '@angular/core/testing';
import { HttpContext, HttpRequest, HttpResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom, of } from 'rxjs';
import {
  loadingInterceptor,
  LOADING_MIN_DURATION_MS,
  LOADING_MODE,
  LOADING_SCOPE,
  SKIP_LOADING,
} from './loading-interceptor';
import { LoadingMode } from './loading-mode.enum';
import { LoadingScope } from './loading-scope.enum';
import { LoadingService } from '../../loading/services/loading.service';

describe('loadingInterceptor', () => {
  let loadingService: {
    show: ReturnType<typeof vi.fn>;
    hide: ReturnType<typeof vi.fn>;
    showLocal: ReturnType<typeof vi.fn>;
    hideLocal: ReturnType<typeof vi.fn>;
  };

  const runInterceptor = (req: HttpRequest<unknown>) =>
    TestBed.runInInjectionContext(() =>
      loadingInterceptor(req, () => of(new HttpResponse({ body: null }))),
    );

  beforeEach(() => {
    loadingService = {
      show: vi.fn(),
      hide: vi.fn(),
      showLocal: vi.fn(),
      hideLocal: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: LoadingService, useValue: loadingService },
      ],
    });
  });

  it('skips loading when SKIP_LOADING is true', async () => {
    const context = new HttpContext().set(SKIP_LOADING, true);
    const request = new HttpRequest('GET', '/api', null, { context });

    await firstValueFrom(runInterceptor(request));

    expect(loadingService.show).not.toHaveBeenCalled();
    expect(loadingService.hide).not.toHaveBeenCalled();
  });

  it('skips loading when mode is None', async () => {
    const context = new HttpContext().set(LOADING_MODE, LoadingMode.None);
    const request = new HttpRequest('GET', '/api', null, { context });

    await firstValueFrom(runInterceptor(request));

    expect(loadingService.show).not.toHaveBeenCalled();
  });

  it('shows and hides global loading by default', async () => {
    const request = new HttpRequest('GET', '/api');

    await firstValueFrom(runInterceptor(request));

    expect(loadingService.show).toHaveBeenCalled();
    expect(loadingService.hide).toHaveBeenCalled();
  });

  it('shows and hides local loading for local mode', async () => {
    const context = new HttpContext()
      .set(LOADING_MODE, LoadingMode.Local)
      .set(LOADING_SCOPE, LoadingScope.HomeCards);
    const request = new HttpRequest('GET', '/api', null, { context });

    await firstValueFrom(runInterceptor(request));

    expect(loadingService.showLocal).toHaveBeenCalledWith(LoadingScope.HomeCards);
    expect(loadingService.hideLocal).toHaveBeenCalledWith(LoadingScope.HomeCards);
  });

  it('waits for minimum duration before hiding', async () => {
    vi.useFakeTimers();
    const context = new HttpContext().set(LOADING_MIN_DURATION_MS, 100);
    const request = new HttpRequest('GET', '/api', null, { context });

    const promise = firstValueFrom(runInterceptor(request));
    await vi.runAllTimersAsync();
    await promise;

    expect(loadingService.hide).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
