import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarIconButton } from './topbar-icon-button';

describe('TopbarIconButton', () => {
  let fixture: ComponentFixture<TopbarIconButton>;
  let component: TopbarIconButton;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarIconButton],
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarIconButton);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('iconClass', 'pi pi-cog');
    fixture.detectChanges();
  });

  it('emits clicked output on click', () => {
    const emitSpy = vi.spyOn(component.clicked, 'emit');
    const event = new Event('click');

    component['onClick'](event);

    expect(emitSpy).toHaveBeenCalledWith(event);
  });
});
