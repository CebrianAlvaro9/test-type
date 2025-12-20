import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectSelector } from './subject-selector';

describe('SubjectSelector', () => {
  let component: SubjectSelector;
  let fixture: ComponentFixture<SubjectSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
