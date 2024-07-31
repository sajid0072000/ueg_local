import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoriesListComponent } from './add-categories-list.component';

describe('AddCategoriesListComponent', () => {
  let component: AddCategoriesListComponent;
  let fixture: ComponentFixture<AddCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoriesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
