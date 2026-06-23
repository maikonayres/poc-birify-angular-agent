import { TestBed } from '@angular/core/testing';
import { AppearancePreferencesStorage } from './appearance-preferences.storage';
import { appearanceSlice } from '../store/appearance.slice';

describe('AppearancePreferencesStorage', () => {
  let storage: AppearancePreferencesStorage;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [AppearancePreferencesStorage] });
    storage = TestBed.inject(AppearancePreferencesStorage);
  });

  it('saves and reads valid preferences', () => {
    const prefs = {
      preset: 'Aura',
      primary: 'emerald',
      surface: 'slate',
      darkTheme: false,
      menuMode: 'static',
    };

    storage.save(prefs);

    expect(storage.read()).toEqual(prefs);
  });

  it('returns defaults', () => {
    expect(storage.getDefaults()).toEqual({ ...appearanceSlice });
  });

  it('clears invalid preferences', () => {
    localStorage.setItem(
      'appearance_preferences',
      JSON.stringify({ preset: 'Invalid', primary: 'x', darkTheme: true, menuMode: 'static' }),
    );

    expect(storage.read()).toBeNull();
    expect(localStorage.getItem('appearance_preferences')).toBeNull();
  });

  it('clears corrupt json', () => {
    localStorage.setItem('appearance_preferences', 'not-json');

    expect(storage.read()).toBeNull();
    expect(localStorage.getItem('appearance_preferences')).toBeNull();
  });
});
