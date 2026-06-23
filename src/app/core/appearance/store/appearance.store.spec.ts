import { TestBed } from '@angular/core/testing';
import { AppearanceStore } from './appearance.store';
import { AppearancePreferencesStorage } from '../persistence/appearance-preferences.storage';

describe('AppearanceStore', () => {
  let store: InstanceType<typeof AppearanceStore>;
  let storage: AppearancePreferencesStorage;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [AppearanceStore, AppearancePreferencesStorage],
    });
    store = TestBed.inject(AppearanceStore);
    storage = TestBed.inject(AppearancePreferencesStorage);
  });

  it('hydrates from storage or defaults', () => {
    storage.save({
      preset: 'Lara',
      primary: 'blue',
      surface: 'slate',
      darkTheme: true,
      menuMode: 'overlay',
    });

    store.hydrate();

    expect(store.preset()).toBe('Lara');
    expect(store.primary()).toBe('blue');
    expect(store.darkTheme()).toBe(true);
  });

  it('persists preference changes', () => {
    store.setPreset('Nora');
    store.setPrimary('emerald');
    store.toggleDarkTheme();

    const saved = storage.read();
    expect(saved?.preset).toBe('Nora');
    expect(saved?.primary).toBe('emerald');
    expect(saved?.darkTheme).toBe(true);
  });

  it('persists surface, dark theme and menu mode', () => {
    store.setSurface('slate');
    store.setDarkTheme(true);
    store.setMenuMode('overlay');

    const saved = storage.read();
    expect(saved?.surface).toBe('slate');
    expect(saved?.darkTheme).toBe(true);
    expect(saved?.menuMode).toBe('overlay');
  });

  it('exposes primary colors for current preset', () => {
    store.hydrate();
    expect(store.primaryColors().length).toBeGreaterThan(0);
  });
});
