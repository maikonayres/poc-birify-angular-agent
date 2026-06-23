import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { LoadingStore } from '../store/loading.store';

describe('LoadingService', () => {
  let service: LoadingService;
  let store: InstanceType<typeof LoadingStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService, LoadingStore],
    });
    service = TestBed.inject(LoadingService);
    store = TestBed.inject(LoadingStore);
  });

  it('delegates global show/hide to store', () => {
    service.show();
    expect(service.isGlobalLoading()).toBe(true);

    service.hide();
    expect(service.isGlobalLoading()).toBe(false);
  });

  it('tracks scope loading', () => {
    service.showLocal('cards');
    expect(service.isScopeLoading('cards')).toBe(true);

    service.hideLocal('cards');
    expect(service.isScopeLoading('cards')).toBe(false);
  });

  it('reset clears loading state', () => {
    service.show();
    service.showLocal('cards');

    service.reset();

    expect(store.globalPendingRequests()).toBe(0);
    expect(service.isScopeLoading('cards')).toBe(false);
  });
});
