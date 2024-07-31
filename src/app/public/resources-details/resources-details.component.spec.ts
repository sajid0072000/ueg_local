import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesDetailsComponent } from './resources-details.component';

describe('ResourcesDetailsComponent', () => {
  let component: ResourcesDetailsComponent;
  let fixture: ComponentFixture<ResourcesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourcesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
