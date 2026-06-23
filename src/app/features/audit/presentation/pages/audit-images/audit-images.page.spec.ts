import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { AuditImagesPage } from './audit-images.page';
import { AuditImagesI18nVmService } from '../../services/audit-images-i18n-vm.service';

describe('AuditImagesPage', () => {
  let fixture: ComponentFixture<AuditImagesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditImagesPage],
      providers: [
        {
          provide: AuditImagesI18nVmService,
          useValue: {
            vm: signal({
              title: 'Solicitação de Imagens',
              description: 'Página de auditoria de imagens criada com sucesso.',
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditImagesPage);
    fixture.detectChanges();
  });

  it('renders translated content', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe('Solicitação de Imagens');
    expect(compiled.querySelector('p')?.textContent?.trim()).toBe(
      'Página de auditoria de imagens criada com sucesso.',
    );
  });
});
