import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutButton } from './logout-button.component';
import { AuthFacade } from '../../../../features/auth/presentation/facades/auth.facade';

describe('LogoutButton', () => {
  let fixture: ComponentFixture<LogoutButton>;
  let authFacade: { logout: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authFacade = { logout: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [LogoutButton],
      providers: [{ provide: AuthFacade, useValue: authFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutButton);
    fixture.detectChanges();
  });

  it('calls auth facade logout on click', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(authFacade.logout).toHaveBeenCalled();
  });
});
