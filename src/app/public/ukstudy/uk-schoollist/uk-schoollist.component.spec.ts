import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkSchoollistComponent } from './uk-schoollist.component';

describe('UkSchoollistComponent', () => {
  let component: UkSchoollistComponent;
  let fixture: ComponentFixture<UkSchoollistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkSchoollistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkSchoollistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
