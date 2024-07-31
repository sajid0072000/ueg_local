import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-educator',
  templateUrl: './contact-educator.component.html',
  styleUrls: ['./contact-educator.component.css']
})
export class ContactEducatorComponent {

  constructor(
    private router: Router,
    private rest: RestApiService,
    private actroute: ActivatedRoute,
    private notifierService: NotifierService,
    public common: CommonService,
    private modalService: NgbModal,
  ) {

  }

  educator:any=''
  educatorid:any=''

  ngOnInit(): void {
    let data = this.common.sheardData
    this.educatorid = data.educatorid
    this.educator = data.shortname
  }

  name: any = ''
  email: any = ''
  mobile: any = ''

  nameErr: any = false
  emailErr: any = false
  validEmailErr: any = false
  validMobileErr: any = false
  mobileErr: any = false
  validNameErr:boolean=false

  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



  regTest(string: any): boolean {
    var regex = /^[A-Za-z\s]+$/; 
    return regex.test(string);
  }
  onKeyPressName(event: any): any {
    this.nameErr = false;
    this.validNameErr=false;
    let temp = event.key;
    if (!this.regTest(temp)) {
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
changeEmailFun(): any {
  this.emailErr = false
  if (this.email) {
    if (!this.email.match(this.mailformat)) {
      this.validEmailErr = true
    } else {
      this.validEmailErr = false
    }
  }
}

  add(): any {
    this.nameErr = false
    this.emailErr = false
    this.validEmailErr = false
    this.validMobileErr = false
    this.mobileErr = false
    let err = 0
    let sessionid = sessionStorage.getItem('sessionid')
    let reandomNum: any = Math.floor(Math.random() * 1000000 + 1)
      if (!sessionid) {
        if (this.name === '' || this.name === null || this.name === undefined) {
          this.nameErr = true
          err++
        }

        if (!this.name || /^\s*$/.test(this.name) || /\s{2,}/.test(this.name)) {
          this.validNameErr = true;
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
            "name": this.name,
            "email": this.email,
            "mobile": this.mobile,
            "educatorid":this.educatorid
          }
          this.common.loaderStart();
          this.rest.addContactEducatorDetails(data).subscribe(
            (res: any) => {
              this.common.loaderEnd();
              if (res.success) {
                if (res.status === 1004) {
                  this.common.notify("warning", res.message);
                }
                this.closeModal()
                this.common.notify('success', res.message);
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

        if (this.name === '' || this.name === null || this.name === undefined) {
          this.nameErr = true
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
            "name": this.name,
            "email": this.email,
            "mobile": this.mobile,
            "educatorid":this.educatorid
          }
          this.common.loaderStart();
          this.rest.addContactEducatorDetails(data).subscribe(
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
