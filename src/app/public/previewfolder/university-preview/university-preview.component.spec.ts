import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityPreviewComponent } from './university-preview.component';

describe('UniversityPreviewComponent', () => {
  let component: UniversityPreviewComponent;
  let fixture: ComponentFixture<UniversityPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversityPreviewComponent]
    });
    fixture = TestBed.createComponent(UniversityPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
