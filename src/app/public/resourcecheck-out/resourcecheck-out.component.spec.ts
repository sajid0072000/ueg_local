import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcecheckOutComponent } from './resourcecheck-out.component';

describe('ResourcecheckOutComponent', () => {
  let component: ResourcecheckOutComponent;
  let fixture: ComponentFixture<ResourcecheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcecheckOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourcecheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
