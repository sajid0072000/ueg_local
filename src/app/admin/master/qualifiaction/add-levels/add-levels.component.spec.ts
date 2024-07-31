import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLevelsComponent } from './add-levels.component';

describe('AddLevelsComponent', () => {
  let component: AddLevelsComponent;
  let fixture: ComponentFixture<AddLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLevelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
