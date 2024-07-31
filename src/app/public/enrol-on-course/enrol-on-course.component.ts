import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enrol-on-course',
  templateUrl: './enrol-on-course.component.html',
  styleUrls: ['./enrol-on-course.component.css']
})
export class EnrolOnCourseComponent {

  coursename:any=''
  categorytypename:any=''
  courseid:any=''
  educator:any=''
  firstname: any = ''
  lastname: any = ''
  email: any = ''
  mobile: any = ''
  firstnameErr: any = false
  lastnameErr: any = false
  emailErr: any = false
  validEmailErr: any = false
  validMobileErr: any = false
  mobileErr: any = false
  validFirstnameErr:boolean=false
  validLastnameErr:boolean=false
  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(
    private router: Router,
    private rest: RestApiService,
    private actroute: ActivatedRoute,
    private notifierService: NotifierService,
    public common: CommonService,
    private modalService: NgbModal,
  ) {

  }

  ngOnInit(): void {
    let data = this.common.sheardData;
    this.coursename = data.coursename
    this.categorytypename = data.categorytypename
    this.courseid = data.courseid
    this.educator = data.educatorList[0].shortname
  }



  regTest(string: any): boolean {
    var regex = /^[A-Za-z\s]+$/; 
    return regex.test(string);
  }
  onKeyPressFirstName(event: any): any {
    this.firstnameErr = false;
    this.validFirstnameErr=false;
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
  onKeyPresslastName(event: any): any {
    this.lastnameErr = false;
    this.validLastnameErr=false;
    let temp = event.key;
    if (!this.regTesttwo(temp)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  
  
  mobileFun(): any {
    this.mobileErr = false;
    if (this.mobile) {
      if (
        this.mobile.toString().length > 15 ||
        this.mobile.toString().length < 10
      ) {
        this.validMobileErr = true
      } else {
        this.validMobileErr = false
      }
    }
  }
  
  regTestforMobile(string: any): boolean {
    var regex = /^\+?[0-9\s]*$/;
    return regex.test(string);
  }
  
  onKeyPressMobile(event: any): any {
    this.mobileErr = false;
    if (event.key === "+" && this.mobile.length === 0) {
      return true;
    }
    
    if (event.key === " ") {
      return true;
    }
    let temp = event.key;
    if (!this.regTestforMobile(temp)) {
      event.preventDefault();
      return false;
    }
  
    if (this.mobile) {
      let numberOnly = this.mobile.replace(/\D/g, '');
      if (numberOnly.length < 10 || numberOnly.length > 15) {
        this.validMobileErr = true;
      } else {
        this.validMobileErr = false;
      }
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




  add(): any {
    this.firstnameErr = false
    this.lastnameErr = false
    this.emailErr = false
    this.validEmailErr = false
    this.validMobileErr = false
    this.mobileErr = false
    this.validFirstnameErr=false
    this.validLastnameErr=false
    let err = 0
    let sessionid = sessionStorage.getItem('sessionid')
    let reandomNum: any = Math.floor(Math.random() * 1000000 + 1)
      if (!sessionid) {
        if (this.firstname === '' || this.firstname === null || this.firstname === undefined) {
          this.firstnameErr = true
          err++
        }

        if (!this.firstname || /^\s*$/.test(this.firstname) || /\s{2,}/.test(this.firstname)) {
          this.validFirstnameErr = true;
          err++;
      }

        if (this.lastname === '' || this.lastname === null || this.lastname === undefined) {
          this.lastnameErr = true
          err++
        }

        if (!this.lastname || /^\s*$/.test(this.lastname) || /\s{2,}/.test(this.lastname)) {
          this.validLastnameErr = true;
          err++;
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
          this.validMobileErr = true;
          err++;
        }
      }
        if (this.email === '' || this.email === null || this.email === undefined) {
          this.emailErr = true
          err++
        }

        if (this.email) {
          if (!this.email.match(this.mailformat)) {
            this.validEmailErr = true
            err++;
          }
        }

        if (err == 0) {
          sessionStorage.setItem('sessionid', reandomNum)
          let session = sessionStorage.getItem('sessionid')
          const data = {
            "userid": "",
            "sessionid": session,
            "firstname": this.firstname,
            "lastname": this.lastname,
            "email": this.email,
            "mobile": this.mobile,
            "courseid":this.courseid
          }
          this.common.loaderStart();
          this.rest.addEnrollOnCourseByCourseId(data).subscribe(
            (res: any) => {
              this.common.loaderEnd();
              if (res.success) {
                if (res.status === 1004) {
                  this.common.notify("warning", res.message);
                }
                if (res.status === 200) {
                    this.closeModal()
                    this.common.notify("success", res.message);
                }
              } else {
                this.common.notify("error", res.message);
              }
            },
            (err: any) => {
              this.common.notify("error", err.error.message);
            }
          );
        }

      } else {

        if (this.firstname === '' || this.firstname === null || this.firstname === undefined) {
          this.firstnameErr = true
          err++
        }

        if (this.lastname === '' || this.lastname === null || this.lastname === undefined) {
          this.lastnameErr = true
          err++
        }

        if (this.mobile === '' || this.mobile === null || this.mobile === undefined) {
          this.mobileErr = true
          err++
        }

        if (this.mobile) {
          if (
            this.mobile.toString().length > 15 ||
            this.mobile.toString().length < 7
          ) {
            this.validMobileErr = true
            err++;
          }
        }

        if (this.email === '' || this.email === null || this.email === undefined) {
          this.emailErr = true
          err++
        }

        if (this.email) {
          if (!this.email.match(this.mailformat)) {
            this.validEmailErr = true
            err++;
          }
        }

        if (err == 0) {
          let session = sessionStorage.getItem('sessionid')
          const data = {
            "userid": "",
            "sessionid": session,
            "firstname": this.firstname,
            "lastname": this.lastname,
            "email": this.email,
            "mobile": this.mobile,
            "courseid":this.courseid
          }
          this.common.loaderStart();
          this.rest.addEnrollOnCourseByCourseId(data).subscribe(
            (res: any) => {
              this.common.loaderEnd();
              if (res.success) {
                if (res.status === 1004) {
                  this.common.notify("warning", res.message);
                }
                if (res.status === 200) {
                    this.closeModal()
                    this.common.notify("success", res.message);
                }
              } else {
                this.common.notify("error", res.message);
              }
            },
            (err: any) => {
              this.common.notify("error", err.error.message);
            }
          );
        }

      }
  }

  closeModal(): any {
    this.modalService.dismissAll();
  }


}
