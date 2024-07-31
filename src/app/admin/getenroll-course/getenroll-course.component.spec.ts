import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetenrollCourseComponent } from './getenroll-course.component';

describe('GetenrollCourseComponent', () => {
  let component: GetenrollCourseComponent;
  let fixture: ComponentFixture<GetenrollCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetenrollCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetenrollCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
