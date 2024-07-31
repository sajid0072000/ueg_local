import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorSignupDetailsComponent } from './educator-signup-details.component';

describe('EducatorSignupDetailsComponent', () => {
  let component: EducatorSignupDetailsComponent;
  let fixture: ComponentFixture<EducatorSignupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducatorSignupDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducatorSignupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
