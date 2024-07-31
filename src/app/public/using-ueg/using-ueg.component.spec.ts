import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsingUEGComponent } from './using-ueg.component';

describe('UsingUEGComponent', () => {
  let component: UsingUEGComponent;
  let fixture: ComponentFixture<UsingUEGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsingUEGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsingUEGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
