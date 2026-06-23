import {
  setDarkTheme,
  setMenuMode,
  setPreferences,
  setPreset,
  setPrimary,
  setSurface,
  toggleDarkTheme,
} from './appearance.updaters';

const baseState = {
  preset: 'Aura',
  primary: 'emerald',
  surface: null as string | null,
  darkTheme: false,
  menuMode: 'static',
};

describe('appearance updaters', () => {
  it('setPreferences spreads preferences', () => {
    const prefs = { ...baseState, darkTheme: true };
    expect(setPreferences(prefs)(baseState)).toEqual(prefs);
  });

  it('setPreset updates preset', () => {
    expect(setPreset('Lara')(baseState)).toEqual({ ...baseState, preset: 'Lara' });
  });

  it('setPrimary updates primary', () => {
    expect(setPrimary('blue')(baseState)).toEqual({ ...baseState, primary: 'blue' });
  });

  it('setSurface updates surface', () => {
    expect(setSurface('slate')(baseState)).toEqual({ ...baseState, surface: 'slate' });
  });

  it('setDarkTheme updates darkTheme', () => {
    expect(setDarkTheme(true)(baseState)).toEqual({ ...baseState, darkTheme: true });
  });

  it('toggleDarkTheme inverts darkTheme', () => {
    expect(toggleDarkTheme()(baseState)).toEqual({ ...baseState, darkTheme: true });
    expect(toggleDarkTheme()({ ...baseState, darkTheme: true })).toEqual({
      ...baseState,
      darkTheme: false,
    });
  });

  it('setMenuMode updates menuMode', () => {
    expect(setMenuMode('overlay')(baseState)).toEqual({ ...baseState, menuMode: 'overlay' });
  });
});
