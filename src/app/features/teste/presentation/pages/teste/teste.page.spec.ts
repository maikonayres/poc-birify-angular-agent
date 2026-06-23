import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestePage } from './teste.page';

describe('TestePage', () => {
  let component: TestePage;
  let fixture: ComponentFixture<TestePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestePage],
    }).compileComponents();

    fixture = TestBed.createComponent(TestePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
