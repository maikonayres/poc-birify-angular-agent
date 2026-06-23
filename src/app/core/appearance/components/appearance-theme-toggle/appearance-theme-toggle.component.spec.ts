import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { AppearanceThemeToggle } from './appearance-theme-toggle.component';
import { AppearanceFacade } from '../../facades/appearance.facade';

describe('AppearanceThemeToggle', () => {
  let fixture: ComponentFixture<AppearanceThemeToggle>;
  let appearance: {
    isDarkTheme: ReturnType<typeof signal<boolean>>;
    toggleDarkTheme: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    appearance = {
      isDarkTheme: signal(false),
      toggleDarkTheme: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AppearanceThemeToggle],
      providers: [{ provide: AppearanceFacade, useValue: appearance }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppearanceThemeToggle);
    fixture.detectChanges();
  });

  it('shows sun icon in light mode', () => {
    expect(fixture.componentInstance['iconClass']()).toBe('pi pi-sun');
  });

  it('shows moon icon in dark mode', () => {
    appearance.isDarkTheme = signal(true);
    fixture = TestBed.createComponent(AppearanceThemeToggle);
    fixture.detectChanges();

    expect(fixture.componentInstance['iconClass']()).toBe('pi pi-moon');
  });

  it('toggles theme via facade', () => {
    fixture.componentInstance['toggleDarkTheme']();
    expect(appearance.toggleDarkTheme).toHaveBeenCalled();
  });
});
