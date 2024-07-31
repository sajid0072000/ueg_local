import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategorytypeComponent } from './add-categorytype.component';

describe('AddCategorytypeComponent', () => {
  let component: AddCategorytypeComponent;
  let fixture: ComponentFixture<AddCategorytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategorytypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategorytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
