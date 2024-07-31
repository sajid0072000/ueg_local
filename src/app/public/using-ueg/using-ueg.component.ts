import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-using-ueg',
  templateUrl: './using-ueg.component.html',
  styleUrls: ['./using-ueg.component.css']
})
export class UsingUEGComponent implements OnInit {

  btn1: any = '';
  btn2: any = '';
  btn3: any = '';
  btn4: any = '';
  bannerImg = '';
  constructor(private router: Router, public common: CommonService) { }
  ngOnInit(): void { // using-ueg-tab
    if (window.innerWidth <= 768) {
      this.bannerImg = 'assets/img/using-ueg-mob.png';
    } else if (window.innerWidth >= 769 && window.innerWidth <= 1024) {
      this.bannerImg = 'assets/img/using-ueg-tab.png';
    } else {
      this.bannerImg = 'assets/img/using-ueg.jpg';
    }
    window.addEventListener('resize', (event: any) => {
      if (event.target.innerWidth <= 768) {
        this.bannerImg = 'assets/img/using-ueg-mob.png';
      } else if (event.target.innerWidth >= 769 && event.target.innerWidth <= 1024) {
        this.bannerImg = 'assets/img/using-ueg-tab.png';
      } else {
        this.bannerImg = 'assets/img/using-ueg.jpg';
      }
    });
    let tab = localStorage.getItem('tab');
    if (tab == '1') {
      this.btn1 = document.getElementById('nav-home-tab');
      this.btn1?.click();
    } else if (tab == '2') {
      this.btn2 = document.getElementById('nav-profile-tab');
      this.btn2?.click();
    } else if (tab == '3') {
      this.btn2 = document.getElementById('nav-contact-tab');
      this.btn2?.click();
    } else if (tab == '4') {
      this.btn2 = document.getElementById('nav-disabled-tab');
      this.btn2?.click();
    }
  }




  gotoContactus(): any {
    this.common.navigate(['/contact-us']);

  }
}
