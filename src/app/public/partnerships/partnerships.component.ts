import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.css']
})
export class PartnershipsComponent implements OnInit {

  constructor(private common: CommonService) { }
  ngOnInit(): void {
  }

  gotoContactus(): any {
    this.common.navigate(['/contact-us']);
  }

}
