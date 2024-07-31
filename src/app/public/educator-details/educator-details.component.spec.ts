import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorDetailsComponent } from './educator-details.component';

describe('EducatorDetailsComponent', () => {
  let component: EducatorDetailsComponent;
  let fixture: ComponentFixture<EducatorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducatorDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
