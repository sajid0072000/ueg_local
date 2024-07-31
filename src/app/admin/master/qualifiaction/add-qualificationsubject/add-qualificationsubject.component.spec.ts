import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQualificationsubjectComponent } from './add-qualificationsubject.component';

describe('AddQualificationsubjectComponent', () => {
  let component: AddQualificationsubjectComponent;
  let fixture: ComponentFixture<AddQualificationsubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQualificationsubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQualificationsubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
