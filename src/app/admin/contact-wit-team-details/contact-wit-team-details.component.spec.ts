import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactWitTeamDetailsComponent } from './contact-wit-team-details.component';

describe('ContactWitTeamDetailsComponent', () => {
  let component: ContactWitTeamDetailsComponent;
  let fixture: ComponentFixture<ContactWitTeamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactWitTeamDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactWitTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
