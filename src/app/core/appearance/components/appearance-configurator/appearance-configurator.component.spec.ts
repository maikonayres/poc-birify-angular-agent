import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { AppearanceConfigurator } from './appearance-configurator.component';
import { AppearanceFacade } from '../../facades/appearance.facade';

describe('AppearanceConfigurator', () => {
  let fixture: ComponentFixture<AppearanceConfigurator>;
  let appearance: {
    updatePrimary: ReturnType<typeof vi.fn>;
    updateSurface: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    appearance = { updatePrimary: vi.fn(), updateSurface: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AppearanceConfigurator],
      providers: [
        {
          provide: AppearanceFacade,
          useValue: {
            preset: signal('Aura'),
            primary: signal('emerald'),
            surface: signal(null),
            darkTheme: signal(false),
            menuMode: signal('static'),
            primaryColors: signal([{ name: 'emerald', palette: {} }]),
            presets: ['Aura'],
            surfaces: [{ name: 'slate', palette: {} }],
            menuModeOptions: ['static'],
            isDarkTheme: signal(false),
            updatePrimary: appearance.updatePrimary,
            updateSurface: appearance.updateSurface,
            changePreset: vi.fn(),
            changeMenuMode: vi.fn(),
            toggleDarkTheme: vi.fn(),
            hydrate: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppearanceConfigurator);
    fixture.detectChanges();
  });

  it('updates primary color and stops event propagation', () => {
    const event = new Event('click');
    vi.spyOn(event, 'stopPropagation');
    const color = { name: 'emerald', palette: {} } as never;

    fixture.componentInstance['updateColors'](event, 'primary', color);

    expect(appearance.updatePrimary).toHaveBeenCalledWith(color);
    expect(appearance.updateSurface).not.toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('updates surface color and stops event propagation', () => {
    const event = new Event('click');
    vi.spyOn(event, 'stopPropagation');
    const color = { name: 'slate', palette: {} } as never;

    fixture.componentInstance['updateColors'](event, 'surface', color);

    expect(appearance.updateSurface).toHaveBeenCalledWith(color);
    expect(appearance.updatePrimary).not.toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
