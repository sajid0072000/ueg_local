import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkUniversitylistComponent } from './uk-universitylist.component';

describe('UkUniversitylistComponent', () => {
  let component: UkUniversitylistComponent;
  let fixture: ComponentFixture<UkUniversitylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkUniversitylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkUniversitylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
