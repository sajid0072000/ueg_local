import { Component, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-about-ueg',
  templateUrl: './about-ueg.component.html',
  styleUrls: ['./about-ueg.component.css']
})
export class AboutUegComponent implements OnInit {


  searchText: any = ''
  sortingType: any = ''
  categoryType: any = ''
  category: any = ''
  searchLimit = "9"
  searchOffSet = "0"
  searchSpinner: boolean = false
  subjectList: any = []
  agerangeList: any = []
  searchCourseArr: any = []
  isNav:boolean = false;
  isActiveDiv:string = '0';
  aboutUEGImg = ''

  constructor(public common: CommonService, private router: Router, private rest: RestApiService) { }

  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      // this.aboutUEGImg = 'assets/img/about-banner_mob.png';
      this.aboutUEGImg = 'assets/img/Harry-Bousfield.jpg';
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1030) {
      // this.aboutUEGImg = 'assets/img/about-banner_mob.png';
      this.aboutUEGImg = 'assets/img/Harry-Bousfield-tab.jpg';
    } else {
      this.aboutUEGImg = 'assets/img/about-banner.jpg';
    }
    window.addEventListener('resize', (event: any) => {
     if (event.target.innerWidth <= 768) {
        // this.aboutUEGImg = 'assets/img/about-banner_mob.png';
        this.aboutUEGImg = 'assets/img/Harry-Bousfield.jpg';
      } else if (event.target.innerWidth >= 768 && event.target.innerWidth <= 1030) {
        // this.aboutUEGImg = 'assets/img/about-banner_mob.png';
        this.aboutUEGImg = 'assets/img/Harry-Bousfield-tab.jpg';
      } else {
        this.aboutUEGImg = 'assets/img/about-banner.jpg';
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
      if (window.scrollY > 450) {
          this.isNav = true;
          this.isActiveDiv = '1'
      } else {
          this.isNav = false;
      }
      if (window.scrollY > 1020) {
          this.isActiveDiv = '2'
      }
      if (window.scrollY > 1680) {
          this.isActiveDiv = '3'
      }
      if(window.scrollY > 2200){
        this.isNav = false;
      }
  }
  scrollToSection(sectionId: string,): any {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }


  onSearchFun(): any {
    if (this.searchText.length < 3) {
      this.searchCourseArr = []
      this.searchSpinner = false
      return false;
    }
    const data = {
      "categoryType": this.categoryType,
      "category": this.category,
      "searchText": this.searchText,
      "limit": this.searchLimit,
      "offset": this.searchOffSet,
      "subjectList": this.subjectList,
      "agerangeList": this.agerangeList,
      "sortingType": this.sortingType
    };
    this.searchSpinner = true
    this.rest.searchCourse(data).subscribe((res: any) => {
      if (res.success) {
        this.searchCourseArr = res.response.courseList
        this.searchSpinner = false
      }
      else {
        this.searchCourseArr = []
        this.searchSpinner = false
      }
    });
  }


  goto(path: any): any {
    this.common.navigate([path])
    window.scrollTo(0, 0)

  }

  gotoContactus(): any {
    this.common.navigate(['/contact-us'])
    window.scrollTo(0, 0)

  }

}
