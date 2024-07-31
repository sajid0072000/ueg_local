import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent  implements OnInit{

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
