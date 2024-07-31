import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorPreviewComponent } from './educator-preview.component';

describe('EducatorPreviewComponent', () => {
  let component: EducatorPreviewComponent;
  let fixture: ComponentFixture<EducatorPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducatorPreviewComponent]
    });
    fixture = TestBed.createComponent(EducatorPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
