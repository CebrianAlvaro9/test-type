import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSimulator } from './test-simulator';

describe('TestSimulator', () => {
  let component: TestSimulator;
  let fixture: ComponentFixture<TestSimulator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSimulator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSimulator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
