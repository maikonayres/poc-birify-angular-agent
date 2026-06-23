import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { GlobalLoaderComponent } from './global-loader.component';
import { LoadingService } from '../../services/loading.service';

describe('GlobalLoaderComponent', () => {
  let fixture: ComponentFixture<GlobalLoaderComponent>;
  let isLoading: ReturnType<typeof signal<boolean>>;

  beforeEach(async () => {
    isLoading = signal(false);

    await TestBed.configureTestingModule({
      imports: [GlobalLoaderComponent],
      providers: [
        {
          provide: LoadingService,
          useValue: { isLoading },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalLoaderComponent);
    fixture.detectChanges();
  });

  it('shows spinner after delay when loading', () => {
    vi.useFakeTimers();
    isLoading.set(true);
    fixture.detectChanges();

    vi.advanceTimersByTime(150);
    fixture.detectChanges();

    expect(fixture.componentInstance['visible']()).toBe(true);
    vi.useRealTimers();
  });

  it('hides immediately when loading stops', () => {
    vi.useFakeTimers();
    isLoading.set(true);
    fixture.detectChanges();
    vi.advanceTimersByTime(150);
    fixture.detectChanges();

    isLoading.set(false);
    fixture.detectChanges();

    expect(fixture.componentInstance['visible']()).toBe(false);
    vi.useRealTimers();
  });

  it('clears timer on destroy', () => {
    vi.useFakeTimers();
    isLoading.set(true);
    fixture.detectChanges();
    vi.advanceTimersByTime(50);

    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
    fixture.destroy();

    expect(clearSpy).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('does not schedule duplicate timer while already visible', () => {
    vi.useFakeTimers();
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
    isLoading.set(true);
    fixture.detectChanges();
    vi.advanceTimersByTime(150);
    fixture.detectChanges();

    const callsAfterVisible = setTimeoutSpy.mock.calls.length;
    isLoading.set(true);
    fixture.detectChanges();

    expect(setTimeoutSpy.mock.calls.length).toBe(callsAfterVisible);
    vi.useRealTimers();
  });
});
