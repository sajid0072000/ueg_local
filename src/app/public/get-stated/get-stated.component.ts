import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-get-stated',
  templateUrl: './get-stated.component.html',
  styleUrls: ['./get-stated.component.css']
})
export class GetStatedComponent implements OnInit {
  @ViewChild('getStartedModal') getStartedModal: any;
  getStartedOne: boolean = false
  getStartedTwo: boolean = false
  getStartedThree: boolean = false
  getStartedFour: boolean = false
  getStartedFive: boolean = false
  categoryTypeArr: any = []

  morningArr: any = []
  afternoonArr: any = []
  eveningArr: any = []

  scheduleArr: any = [
    {
      session: 'Morning',
      time: 'Before Noon',
      daysList: [{
        dayno: 1,
        isActive: false
      }, {
        dayno: 2,
        isActive: false
      }, {
        dayno: 3,
        isActive: false
      }, {
        dayno: 4,
        isActive: false
      }, {
        dayno: 4,
        isActive: false
      }, {
        dayno: 5,
        isActive: false
      }, {
        dayno: 6,
        isActive: false
      }
      ]
    },
    {
      session: 'Afternoon',
      time: '12pm - 5pm',
      daysList: [{
        dayno: 1,
        isActive: false
      }, {
        dayno: 2,
        isActive: false
      }, {
        dayno: 3,
        isActive: false
      }, {
        dayno: 4,
        isActive: false
      }, {
        dayno: 4,
        isActive: false
      }, {
        dayno: 5,
        isActive: false
      }, {
        dayno: 6,
        isActive: false
      }
      ]
    },
    {
      session: 'Evening',
      time: 'After 5pm',
      daysList: [{
        dayno: 1,
        isActive: false
      }, {
        dayno: 2,
        isActive: false
      }, {
        dayno: 3,
        isActive: false
      }, {
        dayno: 4,
        isActive: false
      }, {
        dayno: 4,
        isActive: false
      }, {
        dayno: 5,
        isActive: false
      }, {
        dayno: 6,
        isActive: false
      },
      ]
    },
  ]

  dayKey: any = ["Mon", "Tue", "Wed", "Thus", "Fri", "Sat", "Sun"]

  courseid: any = ''
  educatorid: any = ''
  userid: any = ''
  categorytypeid: any = ''
  preference: any = ''
  forwho: any = ''
  zoneid: any = '16'
  dayList: any = []
  firstname: any = ''
  lastname: any = ''
  phonenumber: any = ''
  email: any = ''

  firstnameErr: any = false
  lastnameErr: any = false
  phonenumberErr: any = false
  validPhonenumberErr: any = false
  emailErr: any = false
  validEmailErr: any = false

  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  validFirstnameErr:boolean=false
  validLastnameErr:boolean=false
  spinner:boolean=false

  constructor(private modalService: NgbModal, public common: CommonService, private rest: RestApiService, private notifierService: NotifierService) { }

  ngOnInit(): void {
    // this.getCategoryType()
    if(this.common.categorytypeArr.length > 0){
      this.categoryTypeArr = this.common.categorytypeArr;
    } else{
      this.getCategoryType();
    }
  }

  getCheck(data: any, obj: any): any {
    this.scheduleErr=false
    if (data.isActive) {
      data.isActive = false
      for (let [i, day] of this.dayList.entries()) {
        if (obj.session === day.slotName && day.dayno === data.dayno) {
          this.dayList.splice(i, 1)
        }
      }
    } else {
      data.isActive = true
      this.dayList.push({
        "slotName": obj.session,
        "dayno": data.dayno
      })
    }
  }

  closeGetStarted(): any {
    this.modalService.dismissAll();
  }



  getCategoryType(): any {
    const data = {
      "searchText": ""
    }
    this.common.loaderStart()
    this.rest.getCategoryType(data).subscribe((res: any) => {
      this.common.loaderEnd()
      if (res.success) {
        this.categoryTypeArr = res.response
      } else {
        this.categoryTypeArr = []
        this.common.notify("error", res.message)
      }
    }, (err: any) => {
      this.common.notify("error", err.error.message)
    })
  }


  openDesignSecond(data: any): any {
    this.categorytypeid = data.categorytypeid
    this.getStartedOne = true
    this.getStartedTwo = true
  }

  secondBack(): any {
    this.getStartedOne = false
    this.getStartedTwo = false
  }

  openGetStartedThreeModal(preference: any): any {
    this.preference = preference
    this.getStartedOne = true
    this.getStartedTwo = false
    this.getStartedThree = true
  }

  thirdBack(): any {
    this.getStartedOne = true
    this.getStartedTwo = true
    this.getStartedThree = false
  }

  openGetStartedFour(forwho: any): any {
    this.forwho = forwho
    this.getStartedOne = true
    this.getStartedTwo = false
    this.getStartedThree = false
    this.getStartedFour = true
    this.getTimeZone()
  }




  fourthBack(): any {
    this.getStartedOne = true
    this.getStartedTwo = false
    this.getStartedThree = true
    this.getStartedFour = false
  }

  scheduleErr: any = false


  openGetStartedFive(): any {
    this.scheduleErr = false
    if (this.dayList.length == 0) {
      this.scheduleErr = true
      return false
    }
    this.getStartedOne = true
    this.getStartedTwo = false
    this.getStartedThree = false
    this.getStartedFour = false
    this.getStartedFive = true
  }


  fithBack(): any {
    this.getStartedOne = true
    this.getStartedTwo = false
    this.getStartedThree = false
    this.getStartedFour = true
    this.getStartedFive = false
  }

  getTimeZoneList: any = []

  getTimeZone(): any {
    const data = {}
    this.spinner = true;
    this.rest.getTimeZone(data).subscribe((res: any) => {
      if (res.success) {
        this.getTimeZoneList = res.response;
     this.spinner = false;

      } else {
     this.spinner = false;
        this.common.notify("error", res.message);
      }
    }, (err: any) => {
     this.spinner = false;

      this.common.notify("error", err.error.message)
    })
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
  this.phonenumberErr = false;
  if (this.phonenumber) {
    if (
      this.phonenumber.toString().length > 15 ||
      this.phonenumber.toString().length < 10
    ) {
      this.validPhonenumberErr = true
    } else {
      this.validPhonenumberErr = false
    }
  }
}

regTestforMobile(string: any): boolean {
  // Allow a plus sign at the beginning followed by digits and spaces
  var regex = /^\+?[0-9\s]*$/;
  return regex.test(string);
}

onKeyPressMobile(event: any): any {
  this.phonenumberErr = false;
  if (event.key === "+" && this.phonenumber.length === 0) {
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

  if (this.phonenumber) {
    let numberOnly = this.phonenumber.replace(/\D/g, '');
    if (numberOnly.length < 10 || numberOnly.length > 15) {
      this.validPhonenumberErr = true;
    } else {
      this.validPhonenumberErr = false;
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
  onsubmit(): any {
    this.firstnameErr = false
    this.lastnameErr = false
    this.phonenumberErr = false
    this.validPhonenumberErr = false
    this.emailErr = false
    this.validEmailErr = false
    this.validFirstnameErr=false

    let err = 0

    if (!this.common.getUserId()) {

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
      if (!this.firstname || /^\s*$/.test(this.firstname) || /\s{2,}/.test(this.firstname)) {
        this.validLastnameErr = true
        err++
      }

      if (
        this.phonenumber === '' ||
        this.phonenumber === null ||
        this.phonenumber === undefined
      ) {
        this.phonenumberErr = true;
        err++;
      }
      if (this.phonenumber) {
        if (
          this.phonenumber.toString().length < 10 ||
          this.phonenumber.toString().length > 15
        ) {
          this.validPhonenumberErr = true;
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
    }
    if (err == 0) {
      const data = {
        "courseid": this.courseid,
        "educatorid": this.educatorid,
        "userid": this.common.getUserId() ? this.common.getUserId() : "",
        "firstname": this.common.getUserId() ? "" : this.firstname,
        "lastname": this.common.getUserId() ? "" : this.lastname,
        "phonenumber": this.common.getUserId() ? "" : this.phonenumber,
        "email": this.common.getUserId() ? "" : this.email,
        "categorytypeid": this.categorytypeid,
        "preference": this.preference,
        "forwho": this.forwho,
        "zoneid": this.zoneid,
        "dayList": this.dayList
      }
      this.rest.addLiveCourseSchedule(data).subscribe((result: any) => {
        if (result.success) {
            this.closeGetStarted()
            this.common.notify("success", result.message)
        } else {
          this.common.notify("error", result.message)
        }
      })
    }
  }
}

