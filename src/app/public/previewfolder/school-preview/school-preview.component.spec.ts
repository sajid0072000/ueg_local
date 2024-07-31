import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolPreviewComponent } from './school-preview.component';

describe('SchoolPreviewComponent', () => {
  let component: SchoolPreviewComponent;
  let fixture: ComponentFixture<SchoolPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolPreviewComponent]
    });
    fixture = TestBed.createComponent(SchoolPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
