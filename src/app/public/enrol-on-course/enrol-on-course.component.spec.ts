import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolOnCourseComponent } from './enrol-on-course.component';

describe('EnrolOnCourseComponent', () => {
  let component: EnrolOnCourseComponent;
  let fixture: ComponentFixture<EnrolOnCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolOnCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolOnCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
