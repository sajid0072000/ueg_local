import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStartedlistComponent } from './get-startedlist.component';

describe('GetStartedlistComponent', () => {
  let component: GetStartedlistComponent;
  let fixture: ComponentFixture<GetStartedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetStartedlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetStartedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
