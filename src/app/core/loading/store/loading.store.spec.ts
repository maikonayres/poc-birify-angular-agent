import { TestBed } from '@angular/core/testing';
import { LoadingStore } from './loading.store';

describe('LoadingStore', () => {
  let store: InstanceType<typeof LoadingStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LoadingStore] });
    store = TestBed.inject(LoadingStore);
  });

  it('tracks global loading state', () => {
    expect(store.isGlobalLoading()).toBe(false);

    store.incrementGlobal();
    expect(store.isGlobalLoading()).toBe(true);

    store.decrementGlobal();
    expect(store.isGlobalLoading()).toBe(false);
  });

  it('does not decrement global counter below zero', () => {
    store.decrementGlobal();
    expect(store.globalPendingRequests()).toBe(0);
  });

  it('tracks local loading by scope', () => {
    store.incrementLocal('home');
    expect(store.localPendingRequestsByScope()['home']).toBe(1);

    store.decrementLocal('home');
    expect(store.localPendingRequestsByScope()['home']).toBe(0);
  });

  it('reset clears all counters', () => {
    store.incrementGlobal();
    store.incrementLocal('home');

    store.reset();

    expect(store.globalPendingRequests()).toBe(0);
    expect(store.localPendingRequestsByScope()).toEqual({});
  });
});
