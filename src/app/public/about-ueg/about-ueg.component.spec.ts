import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUegComponent } from './about-ueg.component';

describe('AboutUegComponent', () => {
  let component: AboutUegComponent;
  let fixture: ComponentFixture<AboutUegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
