import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { AppearanceFacade } from './appearance.facade';
import { AppearanceStore } from '../store/appearance.store';
import { AppearanceService } from '../services/appearance.service';

describe('AppearanceFacade', () => {
  let facade: AppearanceFacade;
  let store: {
    preset: ReturnType<typeof signal<string>>;
    primary: ReturnType<typeof signal<string>>;
    surface: ReturnType<typeof signal<string | null>>;
    darkTheme: ReturnType<typeof signal<boolean>>;
    menuMode: ReturnType<typeof signal<string>>;
    primaryColors: ReturnType<typeof signal<Array<{ name: string }>>>;
    hydrate: ReturnType<typeof vi.fn>;
    setPrimary: ReturnType<typeof vi.fn>;
    setSurface: ReturnType<typeof vi.fn>;
    setPreset: ReturnType<typeof vi.fn>;
    toggleDarkTheme: ReturnType<typeof vi.fn>;
    setMenuMode: ReturnType<typeof vi.fn>;
  };
  let service: {
    applyPrimary: ReturnType<typeof vi.fn>;
    applySurface: ReturnType<typeof vi.fn>;
    applyPresetTheme: ReturnType<typeof vi.fn>;
    applyDarkTheme: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    store = {
      preset: signal('Aura'),
      primary: signal('emerald'),
      surface: signal(null),
      darkTheme: signal(false),
      menuMode: signal('static'),
      primaryColors: signal([{ name: 'emerald' }]),
      hydrate: vi.fn(),
      setPrimary: vi.fn(),
      setSurface: vi.fn(),
      setPreset: vi.fn(),
      toggleDarkTheme: vi.fn(),
      setMenuMode: vi.fn(),
    };
    service = {
      applyPrimary: vi.fn(),
      applySurface: vi.fn(),
      applyPresetTheme: vi.fn(),
      applyDarkTheme: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AppearanceFacade,
        { provide: AppearanceStore, useValue: store },
        { provide: AppearanceService, useValue: service },
      ],
    });

    facade = TestBed.inject(AppearanceFacade);
  });

  it('hydrate delegates to store', () => {
    facade.hydrate();
    expect(store.hydrate).toHaveBeenCalled();
  });

  it('updatePrimary ignores empty color name', () => {
    facade.updatePrimary({ name: '', palette: {} } as never);
    expect(store.setPrimary).not.toHaveBeenCalled();
  });

  it('updatePrimary updates store and applies theme', () => {
    facade.updatePrimary({ name: 'blue', palette: {} } as never);

    expect(store.setPrimary).toHaveBeenCalledWith('blue');
    expect(service.applyPrimary).toHaveBeenCalled();
  });

  it('updateSurface updates store and applies surface', () => {
    const surface = { name: 'slate', palette: {} } as never;

    facade.updateSurface(surface);

    expect(store.setSurface).toHaveBeenCalledWith('slate');
    expect(service.applySurface).toHaveBeenCalledWith(surface);
  });

  it('changePreset updates store and applies preset theme', () => {
    facade.changePreset('Lara');

    expect(store.setPreset).toHaveBeenCalledWith('Lara');
    expect(service.applyPresetTheme).toHaveBeenCalled();
  });

  it('toggleDarkTheme updates store and applies dark theme', () => {
    store.toggleDarkTheme.mockImplementation(() => {
      store.darkTheme = signal(true);
    });

    facade.toggleDarkTheme();

    expect(store.toggleDarkTheme).toHaveBeenCalled();
    expect(service.applyDarkTheme).toHaveBeenCalled();
  });

  it('changeMenuMode updates store', () => {
    facade.changeMenuMode('overlay');
    expect(store.setMenuMode).toHaveBeenCalledWith('overlay');
  });
});
