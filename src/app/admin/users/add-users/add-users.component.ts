import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent {

  @ViewChild('deleteModal') deleteModal: any;


  userid: any = ''
  username: any = ''
  email: any = ''
  password: any = ''
  isemailverified: boolean = false
  isphonenoverified: boolean = false
  userType: any = ''
  userTypeName: any = ''
  newpassword: any = ''
  repeatpassword: any = ''


  usernameErr: any = false
  emailErr: any = false
  validEmailErr: any = false
  passwordErr: any = false
  userTypeErr: any = false
  newpasswordErr: any = false
  repeatpasswordErr: any = false
  mismatchErr: any = false

  roleArr: any = []
  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  userRoleArr: any = []

  constructor(
    private router: Router,
    private restapi: RestApiService,
    public common: CommonService,
    private modalService: NgbModal,
    private notifierService: NotifierService,
    private actroute: ActivatedRoute,

  ) {

  }

  ngOnInit(): void {
    this.getRoles();
    this.userid = this.actroute.snapshot.params['id'];
    if (this.userid == 0) {
      this.userid = null
    }
    if (this.userid) {
      this.getUserById();
    }
  }

  getUserById(): any {
    const data = {
      "userid": this.userid
    };
    this.common.loaderStart();
    this.restapi.getUserById(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        let temp = res.response
        this.username = temp.name
        this.email = temp.email
        this.userRoleArr = temp.roleList
      }
    });
  }

  changeusername(): any {
    this.usernameErr = false
  }

  changeemail(): any {
    this.emailErr = false
    this.validEmailErr = false
    if (this.email) {
      if (!this.email.match(this.mailformat)) {
        this.validEmailErr = true
      }
    }
  }

  changepassword(): any {
    this.passwordErr = false
  }

  changenewpassword(): any {
    this.newpasswordErr = false
  }

  changerepeatpassword(): any {
    this.repeatpasswordErr = false
    this.mismatchErr = false

    if (this.password && this.repeatpassword) {
      if (this.password !== this.repeatpassword) {
        this.mismatchErr = true
      }
    }

    if (this.newpassword && this.repeatpassword) {
      if (this.newpassword !== this.repeatpassword) {
        this.mismatchErr = true
      }
    }
  }

  add(): any {

    this.usernameErr = false
    this.emailErr = false
    this.validEmailErr = false
    this.passwordErr = false
    this.userTypeErr = false
    this.newpasswordErr = false
    this.repeatpasswordErr = false
    this.mismatchErr = false

    let err = 0


    if (this.username === '' || this.username === null || this.username === undefined) {
      this.usernameErr = true
      err++
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

    if (this.password === '' || this.password === null || this.password === undefined) {
      this.passwordErr = true
      err++
    }

    if (this.password && !this.repeatpassword) {
      if (this.repeatpassword === '' || this.repeatpassword === null || this.repeatpassword === undefined) {
        this.repeatpasswordErr = true
        err++
      }
    }


    if (this.password && this.repeatpassword) {
      if (this.password !== this.repeatpassword) {
        this.mismatchErr = true
        err++
      }
    }

    if (this.userRoleArr.length === 0) {
      this.userTypeErr = true
      err++
    }

    if (err == 0) {
      const data = {
        "username": this.username,
        "email": this.email,
        "password": this.password,
        "userRoleArr": this.userRoleArr
      }

      this.common.loaderStart();
      this.restapi.addUserAdminPanel(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/users'])
        } else {
          this.notifierService.notify('error', res.message);
        }
      });
    }
  }

  edit(): any {

    this.usernameErr = false
    this.emailErr = false
    this.passwordErr = false
    this.validEmailErr = false
    this.userTypeErr = false
    this.newpasswordErr = false
    this.repeatpasswordErr = false
    this.mismatchErr = false

    let err = 0


    if (this.username === '' || this.username === null || this.username === undefined) {
      this.usernameErr = true
      err++
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

    if (this.userRoleArr.length === 0) {
      this.userTypeErr = true
      err++
    }

    if (this.newpassword && !this.repeatpassword) {
      if (this.repeatpassword === '' || this.repeatpassword === null || this.repeatpassword === undefined) {
        this.repeatpasswordErr = true
        err++
      }
    }


    if (this.newpassword && this.repeatpassword) {
      if (this.newpassword !== this.repeatpassword) {
        this.mismatchErr = true
        err++
      }
    }



    if (err == 0) {
      const data = {
        "userid": this.userid,
        "username": this.username,
        "email": this.email,
        "password": this.newpassword,
        "userRoleArr": this.userRoleArr
      }

      this.common.loaderStart();
      this.restapi.updateUserAdminPanel(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/users'])
        } else {
          this.notifierService.notify('error', res.message);
        }
      });
    }

  }


  addRole(): any {
    this.userTypeErr = false
    var err = 0
    if (this.userType == '') {
      this.userTypeErr = true
      err++
    }
    if (err == 0) {
      for (let data of this.roleArr) {
        if (data.Id == this.userType) {
          if (!this.userRoleArr.some((item: any) => item.roleid === data.Id)) {
            if (this.userRoleArr.some((item: any) => item.roleid === 1)) {
              this.notifierService.notify('error', 'You can not choose other role with Admin!');

              return false
            } else if (this.userRoleArr.some((item: any) => item.roleid !== 1)) {
              if (this.userType != 1) {
                this.userRoleArr.push({ roleid: data.Id, rolename: data.name });
              } else {
                this.notifierService.notify('error', 'You can not choose  Admin with Other!');

                return false
              }
            } else {
              this.userRoleArr.push({ roleid: data.Id, rolename: data.name });
            }
          }
        }
      }

      // let flag = 0;
      // for (let data of this.roleArr) {
      //   if (this.userRoleArr.length > 0) {
      //     for (let i = 0; i < this.userRoleArr.length; i++) {
      //       if (this.userRoleArr[i].roleid == 1 && this.userType != 1) {
      //         this.notifierService.notify('error', 'You can not choose other role with Admin!');
      //          flag =1;
      //         return false;
      //       } else if (this.userRoleArr[i].roleid != 1 && this.userType == 1) {
      //         this.notifierService.notify('error', 'You can not choose  Admin with Other!');

      //         return false;
      //       } 
      //     }
      //   }
      //   if (flag == 0) {
      //       this.userRoleArr.push({ roleid: data.Id, rolename: data.name });
      //   }
      // }
      this.userType = ''
    }
  }

  roleRemove(i: any): any {
    this.userRoleArr.splice(i, 1)
  }

  onClickDelete(): any {
    this.modalService.open(this.deleteModal, { centered: true, size: 'md' });
  }

  resetForm(): any {
    this.userid = ''
    this.username = ''
    this.email = ''
    this.password = ''
    this.isemailverified = false
    this.isphonenoverified = false
    this.userType = ''
    this.newpassword = ''
    this.repeatpassword = ''
    this.usernameErr = false
    this.emailErr = false
    this.validEmailErr = false
    this.passwordErr = false
    this.userTypeErr = false
    this.newpasswordErr = false
    this.repeatpasswordErr = false
    this.mismatchErr = false
    this.userRoleArr = []
    this.router.navigate(['admin/app/users'])
  }

  goBack() {
    this.router.navigate(["admin/app/users"]);
  }

  closeModal(): any {
    this.modalService.dismissAll();
  }

  delete(): any {
    const data = {
      "id": this.userid,
      "usertype": this.userType
    }
    this.common.loaderStart();
    this.restapi.deleteUser(data).subscribe((res: any) => {
      this.common.loaderEnd();
      console.log(res.response);
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.closeModal()
        this.router.navigate(["admin/app/users"]);

      } else {
        this.notifierService.notify('error', res.message);
      }
    })

  }


  getRoles() {
    this.common.loaderStart();
    this.restapi.getRoles().subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.roleArr = res.response;
        console.log(this.roleArr, '?????????????????????????');

      } else {
        this.roleArr = [];
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message);
    });
  }

}
