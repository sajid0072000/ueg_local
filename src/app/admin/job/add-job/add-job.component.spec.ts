import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddJobComponent } from './add-job.component';
import { RestApiService } from 'src/app/rest-api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AddJobComponent', () => {
  let component: AddJobComponent;
  let fixture: ComponentFixture<AddJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJobComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ],
      providers: [ RestApiService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
