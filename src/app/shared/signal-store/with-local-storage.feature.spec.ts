import { TestBed } from '@angular/core/testing';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withLocalStorage } from './with-local-storage.feature';

const TestStore = signalStore(
  withState({ count: 0 }),
  withLocalStorage('test-local-storage'),
  withMethods((store) => ({
    increment: () => patchState(store, (state) => ({ count: state.count + 1 })),
  })),
);

describe('withLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('hydrates state from localStorage on init', () => {
    localStorage.setItem('test-local-storage', JSON.stringify({ count: 5 }));

    TestBed.configureTestingModule({ providers: [TestStore] });
    const store = TestBed.inject(TestStore);

    expect(store.count()).toBe(5);
  });

  it('persists state changes to localStorage', () => {
    TestBed.configureTestingModule({ providers: [TestStore] });
    const store = TestBed.inject(TestStore);

    store.increment();
    TestBed.flushEffects();

    expect(JSON.parse(localStorage.getItem('test-local-storage')!)).toEqual({ count: 1 });
  });
});
