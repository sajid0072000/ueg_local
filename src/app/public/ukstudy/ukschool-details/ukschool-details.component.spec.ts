import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkschoolDetailsComponent } from './ukschool-details.component';

describe('UkschoolDetailsComponent', () => {
  let component: UkschoolDetailsComponent;
  let fixture: ComponentFixture<UkschoolDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkschoolDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkschoolDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
