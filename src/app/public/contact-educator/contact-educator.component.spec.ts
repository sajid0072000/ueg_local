import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEducatorComponent } from './contact-educator.component';

describe('ContactEducatorComponent', () => {
  let component: ContactEducatorComponent;
  let fixture: ComponentFixture<ContactEducatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactEducatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactEducatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
