import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-meet-our-team',
  templateUrl: './meet-our-team.component.html',
  styleUrls: ['./meet-our-team.component.css']
})
export class MeetOurTeamComponent implements OnInit {


  constructor(private router: Router, private rest: RestApiService, private common: CommonService) { }
  ngOnInit(): void {

  }

  gotoContactus(): any {
    this.common.navigate(['/contact-us']);
  }
}
