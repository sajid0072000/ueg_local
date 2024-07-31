import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcontactEducatorDetailsComponent } from './getcontact-educator-details.component';

describe('GetcontactEducatorDetailsComponent', () => {
  let component: GetcontactEducatorDetailsComponent;
  let fixture: ComponentFixture<GetcontactEducatorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetcontactEducatorDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetcontactEducatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
