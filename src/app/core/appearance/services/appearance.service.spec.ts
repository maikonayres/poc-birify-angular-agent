import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { signal } from '@angular/core';
import { AppearanceService } from './appearance.service';
import { AppearanceStore } from '../store/appearance.store';

describe('AppearanceService', () => {
  let service: AppearanceService;

  beforeEach(() => {
    document.documentElement.classList.remove('app-dark');
    vi.restoreAllMocks();

    TestBed.configureTestingModule({
      providers: [
        AppearanceService,
        {
          provide: PLATFORM_ID,
          useValue: 'browser',
        },
        {
          provide: AppearanceStore,
          useValue: {
            preset: signal('Aura'),
            primary: signal('emerald'),
            surface: signal(null),
            darkTheme: signal(false),
            menuMode: signal('static'),
          },
        },
      ],
    });

    service = TestBed.inject(AppearanceService);
  });

  it('applyDarkTheme adds dark class when enabled', () => {
    service.applyDarkTheme(true, false);

    expect(document.documentElement.classList.contains('app-dark')).toBe(true);
  });

  it('applyDarkTheme removes dark class when disabled', () => {
    document.documentElement.classList.add('app-dark');

    service.applyDarkTheme(false, false);

    expect(document.documentElement.classList.contains('app-dark')).toBe(false);
  });

  it('applyDarkTheme uses view transition when available', () => {
    const startViewTransition = vi.fn((callback: () => void) => {
      callback();
      return {};
    });
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: startViewTransition,
    });

    service.applyDarkTheme(true);

    expect(startViewTransition).toHaveBeenCalled();
    expect(document.documentElement.classList.contains('app-dark')).toBe(true);

    delete (document as { startViewTransition?: unknown }).startViewTransition;
  });

  it('applyFullTheme applies dark and preset on browser', () => {
    const applyDarkSpy = vi.spyOn(service, 'applyDarkTheme');
    const applyPresetSpy = vi.spyOn(service, 'applyPresetTheme');

    service.applyFullTheme({
      preset: 'Aura',
      primary: 'emerald',
      surface: null,
      darkTheme: true,
      menuMode: 'static',
    });

    expect(applyDarkSpy).toHaveBeenCalledWith(true, false);
    expect(applyPresetSpy).toHaveBeenCalled();
  });

  it('applyFullTheme no-ops on server platform', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        AppearanceService,
        { provide: PLATFORM_ID, useValue: 'server' },
        {
          provide: AppearanceStore,
          useValue: {
            preset: signal('Aura'),
            primary: signal('emerald'),
            surface: signal(null),
            darkTheme: signal(true),
            menuMode: signal('static'),
          },
        },
      ],
    });

    const serverService = TestBed.inject(AppearanceService);

    expect(() =>
      serverService.applyFullTheme({
        preset: 'Aura',
        primary: 'emerald',
        surface: null,
        darkTheme: true,
        menuMode: 'static',
      }),
    ).not.toThrow();
  });

  it('applyPrimary and applySurface run without error on browser', () => {
    expect(() =>
      service.applyPrimary({
        preset: 'Aura',
        primary: 'emerald',
        surface: null,
        darkTheme: false,
        menuMode: 'static',
      }),
    ).not.toThrow();

    expect(() => service.applySurface({ name: 'slate', palette: { 500: '#64748b' } } as never)).not.toThrow();
  });

  it('applyPrimary supports noir preset extension', () => {
    expect(() =>
      service.applyPrimary({
        preset: 'Aura',
        primary: 'noir',
        surface: null,
        darkTheme: false,
        menuMode: 'static',
      }),
    ).not.toThrow();
  });

  it('applyPresetTheme supports Nora preset', () => {
    expect(() =>
      service.applyPresetTheme({
        preset: 'Nora',
        primary: 'emerald',
        surface: null,
        darkTheme: false,
        menuMode: 'static',
      }),
    ).not.toThrow();
  });
});
