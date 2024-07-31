import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewResourcesComponent } from './preview-resources.component';

describe('PreviewResourcesComponent', () => {
  let component: PreviewResourcesComponent;
  let fixture: ComponentFixture<PreviewResourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewResourcesComponent]
    });
    fixture = TestBed.createComponent(PreviewResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
