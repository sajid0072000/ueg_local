import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorOfTheMonthListComponent } from './educator-of-the-month-list.component';

describe('EducatorOfTheMonthListComponent', () => {
  let component: EducatorOfTheMonthListComponent;
  let fixture: ComponentFixture<EducatorOfTheMonthListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducatorOfTheMonthListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducatorOfTheMonthListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
