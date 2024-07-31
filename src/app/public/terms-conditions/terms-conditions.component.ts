import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent implements OnInit {

  currentdate:any = '';

  constructor(private common : CommonService){}
  ngOnInit(): void {
    this.currentdate=this.common.getCurrentDateFormat()

  }
  scrollToSection(sectionId: string,): any {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth',block: 'start', inline: 'nearest'});
    }
  }

}
