import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-become-an-educator',
  templateUrl: './become-an-educator.component.html',
  styleUrls: ['./become-an-educator.component.css']
})
export class BecomeAnEducatorComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
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


  firstname: any = ''
  lastname: any = ''
  mobile: any = ''
  email: any = ''
  location: any = ''
  resume: any = ''
  checkTerm: boolean = false

  firstnameErr: any = ''
  validfirstnameErr: any = ''
  lastnameErr: any = ''
  validlastnameErr: any = ''
  mobileErr: any = ''
  validmobilErr: any = ''
  emailErr: any = ''
  validEmailErr: any = ''
  locationErr: any = ''
  resumeErr: any = ''
  checkTermErr: any = '';
  fileerr: boolean = false;

  googlRecaptcha: boolean = false
  googlRecaptchaErr: boolean = false

  orgFilename: string = '';
  spinner: boolean = false;
  isNav: boolean = false;
  isActiveDiv: string = '0';
  bannerImg = '';
  constructor(public common: CommonService, private rest: RestApiService, private router: Router, private notifierService: NotifierService) { }
  ngOnInit(): void {
    // contact-us-mob.png
    if (window.innerWidth <= 768) {
      this.bannerImg = 'assets/img/contact-us-mob.png';
    } else if (window.innerWidth >= 769 && window.innerWidth <= 1024) {
      this.bannerImg = 'assets/img/contact-us-tab.png';
    } else {
      this.bannerImg = 'assets/img/contact-us.jpg';
    }
    window.addEventListener('resize', (event: any) => {
      if (event.target.innerWidth <= 768) {
        this.bannerImg = 'assets/img/contact-us-mob.png';
      } else if (event.target.innerWidth >= 769 && event.target.innerWidth <= 1024) {
        this.bannerImg = 'assets/img/contact-us-tab.png';
      } else {
        this.bannerImg = 'assets/img/contact-us.jpg';
      }
    });

  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 570 && window.scrollY < 1031) {
      this.isActiveDiv = '1'
    }
    if (window.scrollY > 570 && window.scrollY < 2820) {
      this.isNav = true;
    } else {
      this.isNav = false;
    }
    if (window.scrollY > 1080) {
      this.isActiveDiv = '2'
    }
    if (window.scrollY > 1880) {
      this.isActiveDiv = '3'
    }
  }

  checkGooglecaptcha(): any {
    this.googlRecaptchaErr = false
  }

  scrollToSection(sectionId: string,): any {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  onSearchFun(): any {
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




  onFileChanged(event: any): any {
    this.resumeErr = false
    let cv = event.target.files[0].name;
    let temp = cv.split('.');
    let format = temp[temp.length - 1];
    if (format == 'pdf' || format == 'doc' || format == 'docx') {
      if (event.target.files && event.target.files.length > 0) {
        this.resumeErr = false
        let file = event.target.files[0];
        const fd = new FormData();
        fd.append('file', file);
        fd.append('uploadType', 'other')
        this.spinner = true
        this.rest.uploadFile(fd).subscribe((res: any) => {
          if (res.success) {
            this.spinner = false
            this.fileerr = false;
            this.resume = res.response.fileName;
            this.orgFilename = res.response.orgfilename;
            if (this.fileInput) {
              this.fileInput.nativeElement.value = '';
            }
          }
        })
      }
    }
    else {
      this.fileerr = true;
      this.spinner = false
    }
  }



  goto(path: any): any {
    this.common.navigate([path]);
    window.scrollTo(0, 0)

  }



  // first name
  regTest(string: any): boolean {
    var regex = /^[A-Za-z\s]+$/;
    return regex.test(string);
  }
  onKeyPressfirstname(event: any): any {
    this.firstnameErr = false;
    this.validfirstnameErr = false;
    let temp = event.key;
    if (!this.regTest(temp)) {
      event.preventDefault();
      return false;
    }
    return true;
  }




  // last name
  regTesttwo(string: any): boolean {
    var regex = /^[A-Za-z\s]+$/;
    return regex.test(string);
  }
  onKeyPresslastname(event: any): any {
    this.lastnameErr = false;
    this.validlastnameErr = false;
    let temp = event.key;
    if (!this.regTesttwo(temp)) {
      event.preventDefault();
      return false;
    }
    return true;
  }




  //mobile
  mobileFun(): any {
    this.mobileErr = false;
    if (this.mobile) {
      if (
        this.mobile.toString().length > 15 ||
        this.mobile.toString().length < 10
      ) {
        this.validmobilErr = true
      } else {
        this.validmobilErr = false
      }
    }
  }


  // for mobile
  regTestforMobile(string: any): boolean {
    var regex = /^[0-9]+$/;
    return regex.test(string);
  }

  onKeyPressMobile(event: any): any {
    this.mobileErr = false;
    if (this.mobile) {
      if (
        this.mobile.toString().length < 10 ||
        this.mobile.toString().length > 15
      ) {
        this.validmobilErr = true;
      } else {
        this.validmobilErr = false;
      }
    }
    let temp = event.key;
    if (!this.regTestforMobile(temp)) {
      event.preventDefault();
      return false;
    }
    return true;
  }





  emailFun(): any {
    let filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    this.emailErr = false;
    this.validEmailErr = false;
    if (this.email) {
      if (!filter.test(this.email)) {
        this.validEmailErr = true;
      }
    }
  }


  locationFun(): any {
    this.locationErr = false
  }


  resumeFun(): any {
    this.resumeErr = false
  }


  checkTermFun(): any {
    this.checkTermErr = false
  }


  addRegisterdetails(): any {
    this.firstnameErr = false
    this.validfirstnameErr = false
    this.lastnameErr = false
    this.validlastnameErr = false
    this.mobileErr = false
    this.validmobilErr = false
    this.emailErr = false
    this.validEmailErr = false
    this.locationErr = false
    this.resumeErr = false
    this.checkTermErr = false
    this.googlRecaptchaErr = false

    let err = 0
    let filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.firstname == "" || this.firstname == null || this.firstname == undefined) {
      this.firstnameErr = true
      err++
    }

    if (!this.firstname || /^\s*$/.test(this.firstname) || /\s{2,}/.test(this.firstname)) {
      this.validfirstnameErr = true;
      err++;
    }
    if (this.lastname == "" || this.lastname == null || this.lastname == undefined) {
      this.lastnameErr = true
      err++
    }
    if (!this.lastname || /^\s*$/.test(this.lastname) || /\s{2,}/.test(this.lastname)) {
      this.validlastnameErr = true;
      err++;
    }
    if (this.email == "" || this.email == null || this.email == undefined) {
      this.emailErr = true
      err++
    }
    if (this.email) {
      if (!filter.test(this.email)) {
        this.validEmailErr = true;
        err++;
      }
    }
    if (
      this.mobile === '' ||
      this.mobile === null ||
      this.mobile === undefined
    ) {
      this.mobileErr = true;
      err++;
    }
    if (this.mobile) {
      if (
        this.mobile.toString().length < 10 ||
        this.mobile.toString().length > 15
      ) {
        this.validmobilErr = true;
        err++;
      }
    }
    if (this.location == false || this.location == null || this.location == undefined) {
      this.locationErr = true
      err++
    }
    if (this.resume == false || this.resume == null || this.resume == undefined) {
      this.resumeErr = true
      err++
    }
    if (this.checkTerm == false || this.checkTerm == null || this.checkTerm == undefined) {
      this.checkTermErr = true
      err++
    }
    if (this.googlRecaptcha == false || this.googlRecaptcha == null || this.googlRecaptcha == undefined) {
      this.googlRecaptchaErr = true
      err++
    }
    if (err == 0) {
      const data = {
        "firstname": this.firstname,
        "lastname": this.lastname,
        "mobile": this.mobile,
        "email": this.email,
        "location": this.location,
        "cvfilename": this.resume
      }
      this.common.loaderStart()
      this.rest.addEducatorSignUpDetails(data).subscribe((res: any) => {
        this.common.loaderEnd()
        if (res.success) {
          this.resetForm()
          this.common.notify('success', res.message)
        } else {
          this.common.notify('error', res.message)
        }
      }, (err: any) => {
        this.common.notify('error', err.error.message)
      })
    }
  }

  resetForm(): any {
    this.firstname = ''
    this.lastname = ''
    this.email = ''
    this.mobile = ''
    this.location = ''
    this.resume = ''
    this.checkTerm = false
    this.firstnameErr = false
    this.validfirstnameErr = false
    this.lastnameErr = false
    this.validlastnameErr = false
    this.mobileErr = false
    this.validmobilErr = false
    this.emailErr = false
    this.validEmailErr = false
    this.locationErr = false
    this.resumeErr = false
    this.checkTermErr = false
    this.googlRecaptchaErr = false
    this.googlRecaptcha = false
  }

}
