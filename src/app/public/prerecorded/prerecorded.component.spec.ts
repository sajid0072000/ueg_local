import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerecordedComponent } from './prerecorded.component';

describe('PrerecordedComponent', () => {
  let component: PrerecordedComponent;
  let fixture: ComponentFixture<PrerecordedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrerecordedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrerecordedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
