import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NotFoundPage } from './not-found.page';
import { I18nService } from '../../../../../core/i18n/services/i18n.service';
import { AppearanceFacade } from '../../../../../core/appearance/facades/appearance.facade';
import { getTestProviders, provideI18nFacadeMock } from '../../../../../shared/helpers/test-helpers';

describe('NotFoundPage', () => {
  let fixture: ComponentFixture<NotFoundPage>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPage],
      providers: [
        ...getTestProviders(),
        {
          provide: I18nService,
          useValue: {
            translations: signal({
              notFound: {
                code: '404',
                title: 'Não encontrado',
                subtitle: 'Página inexistente',
                backHome: 'Início',
                goBack: 'Voltar',
              },
            }),
          },
        },
        {
          provide: AppearanceFacade,
          useValue: {
            isDarkTheme: signal(false),
            toggleDarkTheme: vi.fn(),
            presets: [],
            surfaces: [],
            primaryColors: signal([]),
            preset: signal('Aura'),
            primary: signal('emerald'),
            surface: signal(null),
            darkTheme: signal(false),
            menuMode: signal('static'),
            menuModeOptions: [],
            updatePrimary: vi.fn(),
            updateSurface: vi.fn(),
            changePreset: vi.fn(),
            changeMenuMode: vi.fn(),
            hydrate: vi.fn(),
          },
        },
        provideI18nFacadeMock(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPage);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('builds vm from translations', () => {
    expect(fixture.componentInstance['vm']()).toEqual({
      code: '404',
      title: 'Não encontrado',
      subtitle: 'Página inexistente',
      backHome: 'Início',
      goBack: 'Voltar',
    });
  });

  it('goBack delegates to location', () => {
    const backSpy = vi.spyOn(location, 'back');

    fixture.componentInstance['goBack']();

    expect(backSpy).toHaveBeenCalled();
  });
});
