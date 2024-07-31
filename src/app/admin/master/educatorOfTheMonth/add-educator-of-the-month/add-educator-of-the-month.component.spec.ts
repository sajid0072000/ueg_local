import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEducatorOfTheMonthComponent } from './add-educator-of-the-month.component';

describe('AddEducatorOfTheMonthComponent', () => {
  let component: AddEducatorOfTheMonthComponent;
  let fixture: ComponentFixture<AddEducatorOfTheMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEducatorOfTheMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEducatorOfTheMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
