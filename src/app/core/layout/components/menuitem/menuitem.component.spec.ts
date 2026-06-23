import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { signal } from '@angular/core';
import { AppMenuitem } from './menuitem.component';
import { LayoutService } from '../../services/layout.service';
import { provideAppearanceFacadeMock } from '../../../../shared/helpers/test-helpers';

describe('AppMenuitem', () => {
  let fixture: ComponentFixture<AppMenuitem>;
  let component: AppMenuitem;
  let layoutService: LayoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMenuitem],
      providers: [
        provideRouter([]),
        LayoutService,
        provideAppearanceFacadeMock(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppMenuitem);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService);
    fixture.componentRef.setInput('item', {
      label: 'Home',
      path: '/home',
      routerLink: ['/home'],
    });
    fixture.detectChanges();
  });

  it('computes full path from item path', () => {
    fixture.componentRef.setInput('parentPath', '/app');
    fixture.componentRef.setInput('item', { path: '/home' });
    fixture.detectChanges();

    expect(component.fullPath()).toBe('/app/home');
  });

  it('blocks click when item is disabled', () => {
    const event = new Event('click');
    vi.spyOn(event, 'preventDefault');
    fixture.componentRef.setInput('item', { disabled: true });
    fixture.detectChanges();

    component.itemClick(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('closes overlay menu when leaf item is clicked', () => {
    layoutService.layoutState.update((state) => ({
      ...state,
      overlayMenuActive: true,
      mobileMenuActive: true,
    }));

    component.itemClick(new Event('click'));

    expect(layoutService.layoutState().overlayMenuActive).toBe(false);
    expect(layoutService.layoutState().mobileMenuActive).toBe(false);
  });

  it('toggles submenu active path when item has children', () => {
    fixture.componentRef.setInput('parentPath', '/app');
    fixture.componentRef.setInput('item', {
      label: 'Section',
      path: '/section',
      items: [{ label: 'Child' }],
    });
    fixture.detectChanges();

    component.itemClick(new Event('click'));

    expect(layoutService.layoutState().activePath).toBe('/app/section');
  });

  it('collapses submenu when clicking active parent item', () => {
    fixture.componentRef.setInput('parentPath', '/app');
    fixture.componentRef.setInput('item', {
      label: 'Section',
      path: '/section',
      items: [{ label: 'Child' }],
    });
    layoutService.layoutState.update((state) => ({
      ...state,
      activePath: '/app/section',
    }));
    fixture.detectChanges();

    component.itemClick(new Event('click'));

    expect(layoutService.layoutState().activePath).toBe('/app');
  });

  it('invokes item command when provided', () => {
    const command = vi.fn();
    fixture.componentRef.setInput('item', { label: 'Action', command });
    fixture.detectChanges();

    const event = new Event('click');
    component.itemClick(event);

    expect(command).toHaveBeenCalledWith({ originalEvent: event, item: { label: 'Action', command } });
  });

  it('marks item active when route matches active path', () => {
    fixture.componentRef.setInput('item', { path: '/home' });
    layoutService.layoutState.update((state) => ({ ...state, activePath: '/home/dashboard' }));
    fixture.detectChanges();

    expect(component.isActive()).toBe(true);
  });

  it('sets initialized after view init', () => {
    vi.useFakeTimers();
    component.ngAfterViewInit();
    vi.advanceTimersByTime(0);

    expect(component.initialized()).toBe(true);
    vi.useRealTimers();
  });
});
