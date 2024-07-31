import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkuniversityDetailsComponent } from './ukuniversity-details.component';

describe('UkuniversityDetailsComponent', () => {
  let component: UkuniversityDetailsComponent;
  let fixture: ComponentFixture<UkuniversityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkuniversityDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkuniversityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
