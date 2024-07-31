import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyJobComponent } from './my-jobs.component';

describe('MyJobComponent', () => {
  let component: MyJobComponent;
  let fixture: ComponentFixture<MyJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyJobComponent]
    });
    fixture = TestBed.createComponent(MyJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
