import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseenrollfreeListComponent } from './courseenrollfree-list.component';

describe('CourseenrollfreeListComponent', () => {
  let component: CourseenrollfreeListComponent;
  let fixture: ComponentFixture<CourseenrollfreeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseenrollfreeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseenrollfreeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
