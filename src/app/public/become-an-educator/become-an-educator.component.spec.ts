import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAnEducatorComponent } from './become-an-educator.component';

describe('BecomeAnEducatorComponent', () => {
  let component: BecomeAnEducatorComponent;
  let fixture: ComponentFixture<BecomeAnEducatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeAnEducatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeAnEducatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
