import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { AuditImagesI18nVmService } from './audit-images-i18n-vm.service';
import { I18nService } from '../../../../core/i18n/services/i18n.service';

describe('AuditImagesI18nVmService', () => {
  let service: AuditImagesI18nVmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuditImagesI18nVmService,
        {
          provide: I18nService,
          useValue: {
            translations: signal({
              audit: {
                images: {
                  title: 'Solicitação de Imagens',
                  description: 'Página de auditoria de imagens criada com sucesso.',
                },
              },
            }),
          },
        },
      ],
    });

    service = TestBed.inject(AuditImagesI18nVmService);
  });

  it('builds audit images vm from translations', () => {
    const vm = service.vm();

    expect(vm.title).toBe('Solicitação de Imagens');
    expect(vm.description).toBe('Página de auditoria de imagens criada com sucesso.');
  });
});
