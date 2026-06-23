import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { SidebarFooter } from './sidebar-footer.component';
import { I18nFacade } from '../../../i18n/facades/i18n.facade';
import { APP_VERSION } from '../../../config/app-version.constant';

describe('SidebarFooter', () => {
  let fixture: ComponentFixture<SidebarFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarFooter],
      providers: [
        {
          provide: I18nFacade,
          useValue: {
            translations: signal({ global: { version: 'Versão' } }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarFooter);
    fixture.detectChanges();
  });

  it('exposes app version constant', () => {
    expect(fixture.componentInstance['appVersion']).toBe(APP_VERSION);
  });

  it('uses translated version label', () => {
    expect(fixture.componentInstance['versionLabel']()).toBe('Versão');
  });
});
