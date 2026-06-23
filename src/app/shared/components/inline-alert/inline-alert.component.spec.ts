import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InlineAlertComponent } from './inline-alert.component';

describe('InlineAlertComponent', () => {
  let fixture: ComponentFixture<InlineAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InlineAlertComponent);
  });

  it('should not render when message is empty', () => {
    fixture.componentRef.setInput('message', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('p-message')).toBeNull();
  });

  it('should render message when provided', () => {
    fixture.componentRef.setInput('message', 'Something went wrong');
    fixture.componentRef.setInput('type', 'error');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('p-message')).toBeTruthy();
  });
});
