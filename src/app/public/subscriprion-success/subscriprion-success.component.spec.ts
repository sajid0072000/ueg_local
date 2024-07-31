import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriprionSuccessComponent } from './subscriprion-success.component';

describe('SubscriprionSuccessComponent', () => {
  let component: SubscriprionSuccessComponent;
  let fixture: ComponentFixture<SubscriprionSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriprionSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriprionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
