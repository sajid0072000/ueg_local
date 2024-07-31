import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStatedComponent } from './get-stated.component';

describe('GetStatedComponent', () => {
  let component: GetStatedComponent;
  let fixture: ComponentFixture<GetStatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetStatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetStatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
