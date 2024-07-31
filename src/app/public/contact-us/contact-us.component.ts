import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  firstname: any = ''
  lastname: any = ''
  mobile: any = ''
  email: any = ''
  message: any = ''
  checkTerm: boolean = false


  firstnameErr: boolean = false
  validfirstnameErr: boolean = false
  lastnameErr: boolean = false
  validlastnameErr: boolean = false
  mobileErr: boolean = false
  validMobileErr: boolean = false
  emailErr: boolean = false
  validEmailErr: boolean = false
  messageErr: boolean = false
  checkTermErr: boolean = false
  bannerImg = '';

  constructor(private rest: RestApiService, public common: CommonService, private notifierService: NotifierService) { }
  ngOnInit(): void {
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


  messageFun(): any {
    this.messageErr = false
  }



  checkTermFun(): any {
    this.checkTermErr = false
  }



  contactUs(): any {
    this.firstnameErr = false
    this.validfirstnameErr = false
    this.lastnameErr = false
    this.validlastnameErr = false
    this.emailErr = false
    this.validEmailErr = false
    this.mobileErr = false
    this.validMobileErr = false
    this.messageErr = false
    this.checkTermErr = false

    let err = 0
    let filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.firstname == "" || this.firstname == null || this.firstname == undefined) {
      this.firstnameErr = true
      err++
      return false;
    }

    if (!this.firstname || /^\s*$/.test(this.firstname) || /\s{2,}/.test(this.firstname)) {
      this.validfirstnameErr = true;
      err++;
      return false;
    }
    if (this.lastname == "" || this.lastname == null || this.lastname == undefined) {
      this.lastnameErr = true
      err++
      return false;
    }
    if (!this.lastname || /^\s*$/.test(this.lastname) || /\s{2,}/.test(this.lastname)) {
      this.validlastnameErr = true;
      err++;
      return false;
    }
    if (
      this.mobile === '' ||
      this.mobile === null ||
      this.mobile === undefined
    ) {
      this.mobileErr = true;
      err++;
      return false;
    }
    if (this.mobile) {
      if (
        this.mobile.toString().length < 10 ||
        this.mobile.toString().length > 15
      ) {
        this.validMobileErr = true;
        err++;
        return false;
      }
    }
    if (this.email == "" || this.email == null || this.email == undefined) {
      this.emailErr = true
      err++;
      return false;
    }
    if (this.email) {
      if (!filter.test(this.email)) {
        this.validEmailErr = true;
        err++;
        return false;
      }
    }
    
    if (this.message == false || this.message == null || this.message == undefined) {
      this.messageErr = true
      err++;
      return false;
    }

    if (this.checkTerm == false || this.checkTerm == null || this.checkTerm == undefined) {
      this.checkTermErr = true
      err++;
      return false;
    }

    if (err == 0) {
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        mobile: this.mobile,
        message: this.message,
      }
      this.common.loaderStart()
      this.rest.addContachWithTeamDetails(data).subscribe((res: any) => {
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
    this.message = ''
    this.checkTerm = false
    this.firstnameErr = false
    this.validfirstnameErr = false
    this.lastnameErr = false
    this.validlastnameErr = false
    this.emailErr = false
    this.validEmailErr = false
    this.mobileErr = false
    this.validMobileErr = false
    this.messageErr = false
    this.checkTermErr = false

  }

}
