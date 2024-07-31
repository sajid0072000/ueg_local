import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTonowComponent } from './get-tonow.component';

describe('GetTonowComponent', () => {
  let component: GetTonowComponent;
  let fixture: ComponentFixture<GetTonowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTonowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTonowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
