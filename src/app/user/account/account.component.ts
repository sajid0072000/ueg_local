import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {


  firstname: any = ''
  email: any = ''
  age: any = ''
  parentcontrols: any = ''
  areaofIntrest: any = ''
  checkTerm: boolean = false


  firstnameErr: boolean = false
  validFirstNameErr: boolean = false
  emailErr: boolean = false
  validEmailErr: boolean = false
  ageErr: boolean = false
  parentcontrolsErr: boolean = false
  areaOfintrestErr: boolean = false
  checkTermErr: boolean = false

  accountusertype: any = ''
  intrestSpinner: boolean = false

  selectareofIntrestArr: any = []


  createChildDiv: boolean = false
  accountDiv: boolean = false


  //  account details
  first: any = '';
  last: any = '';
  mobile: any = '';
  dob: any = '';
  address: any = '';
  message: any = '';
  childFlg: boolean = true
  firstErr:boolean=false
  lastErr:boolean=false
  mobileErr:boolean=false
  validMobileErr:boolean=false


  limit = 9
  offset = 0

  allChildrenArr: any = []
  childId: any = ''
  accountArr: any = []
  parentName: any = ''


  areaofintrestArr: any = []
  constructor(private rest: RestApiService, public common: CommonService, private notifierService: NotifierService) { }
  ngOnInit(): void {
    this.getCategories();
    this.getAllchildren()
    this.parentName = sessionStorage.getItem('name')
  }






  getAcoountuserById() {
    let userid = sessionStorage.getItem('userid')
    const data = {
      "userid": userid
    }
    this.common.loaderStart()
    this.rest.getUserById(data).subscribe((res: any) => {
      this.common.loaderEnd()
      if (res.success) {
        let name = (res.response.name).split(' ');
        this.first = name[0];
        this.last = name[name.length - 1];
        this.email = res.response.email
        this.mobile = res.response.mobile
        this.address = res.response.address
        this.message = res.response.profiledetailmessage
        this.dob = res.response.dob
        this.dob = this.common.formatDate(res.response.dob)
      } else {
        this.notifierService.notify('error', res.message)
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message)
    })
  }


   // first name for account
   regTestfirst(string: any): boolean {
    var regex = /^[A-Za-z\s]+$/;
    return regex.test(string);
  }
  onKeyPressFirst(event: any): any {
    this.firstErr = false;
    let temp = event.key;
    if (!this.regTestfirst(temp)) {
      event.preventDefault();
      return false;
    }
    return true;
  }


  // first name for account
  regTestlast(string: any): boolean {
    var regex = /^[A-Za-z\s]+$/;
    return regex.test(string);
  }
  onKeyPressLast(event: any): any {
    this.lastErr = false;
    let temp = event.key;
    if (!this.regTestlast(temp)) {
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

 //  mobile account
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
      this.validMobileErr = true;
    } else {
      this.validMobileErr = false;
    }
  }
  let temp = event.key;
  if (!this.regTestforMobile(temp)) {
    event.preventDefault();
    return false;
  }
  return true;
}



  updateAccount(): any {
    let userid = sessionStorage.getItem('userid')
    this.firstErr=false
    this.lastErr=false
    this.mobileErr=false
    this.validMobileErr=false
    this.emailErr=false
    this.validEmailErr=false
    this.checkTermErr=false

    let err = 0
    let filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.first == "" || this.first == null || this.first == undefined) {
      this.firstErr = true
      err++
    }

    if (this.last == "" || this.last == null || this.last == undefined) {
      this.lastErr = true
      err++
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
    if (this.checkTerm == false || this.checkTerm == null || this.checkTerm == undefined) {
      this.checkTermErr = true
      err++
    }
  
if(err == 0) {
  const data = {
    "userid": userid,
    "email": this.email,
    "name": this.first +' '+this.last,
    "mobile": this.mobile,
    "address": this.address,
    "dob":this.dob,
    "profiledetailmessage":this.message
  }
  this.common.loaderStart()
  this.rest.updateUser(data).subscribe((res: any) => {
    this.common.loaderEnd()
    if (res.success) {
      this.notifierService.notify('success', res.message)
      this.accountDiv=false
      this.createChildDiv=false
      this.childFlg=false
      this.resetAccount()
    } else {
      this.notifierService.notify('error', res.message)
    }
  }, (err: any) => {
    this.notifierService.notify('error', err.error.message)
  })
}   
  }



  accountFun(): any {
    this.resetAccount()
    this.accountDiv = true
    this.childFlg = false
    this.createChildDiv = false
    this.getAcoountuserById()
  }


  resetAccount(): any {
    this.checkTerm=false
    this.firstErr=false
    this.lastErr=false
    this.mobileErr=false
    this.validMobileErr=false
    this.emailErr=false
    this.validEmailErr=false
    this.accountDiv=false
  }

  openChildmodal(): any {
    this.selectareofIntrestArr=[]
    this.createChildDiv = true
    this.accountDiv=false
    this.firstname = ''
    this.email = ''
    this.age = ''
    this.checkTerm = false
    this.parentcontrols = ""
    this.areaofIntrest = ''
    this.areaofintrestArr=[]
    this.firstnameErr = false
    this.validFirstNameErr = false
    this.email
    this.emailErr = false
    this.validEmailErr = false
    this.ageErr = false
    this.checkTermErr = false
    this.parentcontrolsErr = false
    this.areaOfintrestErr = false
    this.childFlg=true
  }


  

  getCategories(): any {
    const data = {
      "searchText": this.areaofIntrest
    }
    this.common.loaderStart()
    this.rest.getCategories(data).subscribe((res: any) => {
      this.common.loaderEnd()
      if (res.success) {
        this.areaofintrestArr = res.response
        this.intrestSpinner = false
      } else {
        this.notifierService.notify('error', res.message)
        this.intrestSpinner = false
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message)

    })
  }



  search(): any {
    if (this.areaofIntrest.length >= 3) {
      this.getCategories();
    }
    if (this.areaofIntrest.length == 0) {
      this.getCategories();
    }
  }




  // first name
  regTest(string: any): boolean {
    var regex = /^[A-Za-z\s]+$/;
    return regex.test(string);
  }
  onKeyPressFirstName(event: any): any {
    this.firstnameErr = false;
    this.validFirstNameErr = false;
    let temp = event.key;
    if (!this.regTest(temp)) {
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


  ageFun(): any {
    this.ageErr = false
  }


  parentFun(): any {
    this.parentcontrolsErr = false
  }


  checkTermFun(): any {
    this.checkTermErr = false
  }



  getareaofIntrestTypeName() {
    this.intrestSpinner = false
    for (let data of this.areaofintrestArr) {
      if (this.areaofIntrest == data.name) {
        if (!this.selectareofIntrestArr.some((item: { name: any }) => item.name === data.name)) {
          this.selectareofIntrestArr.push({ id: data.id, name: data.name });
        }
        break;
      }
    }
    this.areaofIntrest = ''

  }




  intrestRemove(idx: any) {
    this.selectareofIntrestArr.splice(idx, 1);
    this.areaofIntrest = '';
  }

  addchildrenAccount(): any {
    this.areaofIntrest=''
    this.areaOfintrestErr=false
    this.firstnameErr = false
    this.validFirstNameErr = false
    this.email
    this.emailErr = false
    this.validEmailErr = false
    this.ageErr = false
    this.checkTermErr = false
    this.parentcontrolsErr = false
    let err = 0
    let filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.firstname == "" || this.firstname == null || this.firstname == undefined) {
      this.firstnameErr = true
      err++
    }

    if (!this.firstname || /^\s*$/.test(this.firstname) || /\s{2,}/.test(this.firstname)) {
      this.validFirstNameErr = true;
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
    if (this.age == "" || this.age == null || this.age == undefined) {
      this.ageErr = true
      err++
    }

    if (this.parentcontrols == "" || this.parentcontrols == null || this.parentcontrols == undefined) {
      this.parentcontrolsErr = true
      err++
    }
    if (this.checkTerm == false || this.checkTerm == null || this.checkTerm == undefined) {
      this.checkTermErr = true
      err++
    }
    if (err == 0) {
      let name = [];
      for (let item of this.selectareofIntrestArr) {
        name.push(item.name);
      }
      
      let userid = sessionStorage.getItem('userid')
      const data = {
        "userid": userid,
        "firstname": this.firstname,
        "age": this.age,
        "parental_controls": this.parentcontrols,
        "username": this.email,
        "areasofinterests": name
      }

      this.common.loaderStart()
      this.rest.addAccountUsers(data).subscribe((res: any) => {
        this.common.loaderEnd()
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.getAllchildren()
          this.resetChildren()
          this.createChildDiv = false
        } else {
          this.notifierService.notify('error', res.message);
        }
      }, (err: any) => {
        this.notifierService.notify('error', err.error.message)
      })
    }
  }


  getAllchildren(): any {
    let userid = sessionStorage.getItem('userid')
    const data = {
      "userid": userid,
      "limit": this.limit,
      "offset": this.offset
    }
    this.common.loaderStart()
    this.rest.getAllAccountUsers(data).subscribe((res: any) => {
      this.common.loaderEnd()
      if (res.success) {
        this.allChildrenArr = res.response
      } else {
        this.notifierService.notify('error', res.message)
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message)
    })
  }


  getChildUsersById(id: any): any {
    this.accountDiv = false
    this.childId = id
    this.createChildDiv = true
    this.childFlg = false;
    this.areaofIntrest=''
    const data = {
      "id": this.childId
    }
    this.common.loaderStart()
    this.rest.getAccountUsersById(data).subscribe((res: any) => {
      this.common.loaderEnd()
      if (res.success) {
        this.firstname = res.response.firstname
        this.age = res.response.age
        this.parentcontrols = res.response.parental_controls
        this.email = res.response.username
        this.selectareofIntrestArr=[]
        for (let item of this.areaofintrestArr) {
          for (let data of res.response.areasofinterests) {
            if (item.name == data) {
              this.selectareofIntrestArr.push({ id: item.id, name: item.name });
            }
          }
        }
      } else {
        this.notifierService.notify('error', res.message)
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message)
    })
  }



  updatechild(): any {
    let userid = sessionStorage.getItem('userid')
    let name = [];
    for (let item of this.selectareofIntrestArr) {
      name.push(item.name);
    }
    this.firstnameErr = false
    this.validFirstNameErr = false
    this.email
    this.emailErr = false
    this.validEmailErr = false
    this.ageErr = false
    this.checkTermErr = false
    this.parentcontrolsErr = false
    let err = 0
    let filter =

      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.firstname == "" || this.firstname == null || this.firstname == undefined) {
      this.firstnameErr = true
      err++
    }

    if (!this.firstname || /^\s*$/.test(this.firstname) || /\s{2,}/.test(this.firstname)) {
      this.validFirstNameErr = true;
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
    if (this.age == "" || this.age == null || this.age == undefined) {
      this.ageErr = true
      err++
    }

    if (this.parentcontrols == "" || this.parentcontrols == null || this.parentcontrols == undefined) {
      this.parentcontrolsErr = true
      err++
    }
    if (this.checkTerm == false || this.checkTerm == null || this.checkTerm == undefined) {
      this.checkTermErr = true
      err++
    }
   
   if(err == 0){
    const data = {
      "id": this.childId,
      "userid": userid,
      "firstname": this.firstname,
      "age": this.age,
      "parental_controls": this.parentcontrols,
      "username": this.email,
      "areasofinterests": name
    }
    this.common.loaderStart()
    this.rest.updateAccountUsers(data).subscribe((res: any) => {
      this.common.loaderEnd()
      if (res.success) {
        this.notifierService.notify('success', res.message)
        this.accountDiv=false
        this.resetChildren()
        this.getAllchildren()
      } else {
        this.notifierService.notify('error', res.message)
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message)
    })
   }
   
  }


  deleteChildAccountUser(id: any): any {
    const data = {
      "id": id
    }
    this.common.loaderStart()
    this.rest.deleteAccountUser(data).subscribe((res: any) => {
      if (res.success) {
        this.notifierService.notify('success', res.message)
        this.createChildDiv=false
        this.getAllchildren()
      } else {
        this.notifierService.notify('error', res.message)
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message)
    })

  }

  resetChildren(): any {
    this.firstname = ''
    this.email = ''
    this.age = ''
    this.checkTerm = false
    this.parentcontrols = ""
    this.areaofIntrest = ''
    this.firstnameErr = false
    this.validFirstNameErr = false
    this.email=''
    this.emailErr = false
    this.validEmailErr = false
    this.ageErr = false
    this.checkTermErr = false
    this.parentcontrolsErr = false
    this.areaOfintrestErr = false
    this.accountDiv = false
    this.createChildDiv = false
    this.childFlg = true
    this.selectareofIntrestArr=[]
  }
}
