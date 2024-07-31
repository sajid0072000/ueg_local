import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

import { Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from "../../common.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email: any = '';
    password: any = '';
    emailErr: any = '';
    emailValidErr: any = '';
    passwordErr: any = '';
    checkTerm: any = ''
    checkTermErr: boolean = false

    hasOtp: boolean = false;
    yourEmail: string = "";
    otp: string = "";
    newPassword: string = "";
    confirmNewPassword: string = ""
    showSpinner: boolean = false;

    constructor(private router: Router, private restapi: RestApiService, private notifierService: NotifierService, private modalService: NgbModal,
        private common: CommonService) {
    }

    ngOnInit(): void {
        const roleId = this.common.getRoleId();
        if (roleId === 1) {
            this.router.navigate(['/admin/app'])
        } if (roleId === 2) {
            this.router.navigate(['/admin/app'])
        } if (roleId === 3) {
            this.router.navigate(['/admin/app'])
        }
        this.common.addBodyClass()
    }

    mailformat: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    changeEmail(): any {
        this.emailErr = false
        this.emailValidErr = false
    }

    changePassword(): any {
        this.passwordErr = false
    }

    checkTermFun(): any {
        this.checkTermErr = false
    }

    login(): any {
        this.emailErr = false
        this.emailValidErr = false
        this.passwordErr = false
        this.checkTermErr = false

        let err = 0

        if (this.email === '' || this.email === null || this.email === undefined) {
            this.emailErr = true
            err++;
        }
        // if (this.checkTerm == false || this.checkTerm == null || this.checkTerm == undefined) {
        //     this.checkTermErr = true
        //     err++
        //   }

        // if (this.email) {
        //     if (!this.email.match(this.mailformat)) {
        //         this.emailValidErr = true
        //         err++;
        //     }
        // }

        if (this.password === '' || this.password === null || this.password === undefined) {
            this.passwordErr = true
            err++
        }

        if (err === 0) {
            const obj = {
                username: this.email,
                password: this.password,
            };
            this.common.loaderStart();
            this.restapi.adminLogin(obj).subscribe((res: any) => {
                this.common.loaderEnd();
                if (res.success) {
                    this.common.setUser(res.response);
                    this.common.setRoleArr(res.response.roleList);
                    this.common.setRoleId(res.response.roleList[0].roleid);
                    this.router.navigate(['/admin/app']);
                    this.common.setUserName(res.response.name);
                    sessionStorage.setItem('userid', res.response.userid);
                    // sessionStorage.setItem('name', res.response.name);
                    // sessionStorage.setItem('usertype', res.response.userType);
                    // if (res.response.userType == 1) {
                    // }
                    // if (res.response.userType == 2) {
                    //     this.router.navigate(['/admin/app']);
                    // }
                } else {
                    this.notifierService.notify('error', res.message);
                }
            })
        }
    }

    openModal(content: any) {
        this.modalService.open(content);
    }

    closeModal() {
        this.modalService.dismissAll();
        this.hasOtp = false;
    }

    setHasOtp() {
        this.hasOtp = true;
    }

    getOtp() {
        const data = {
            email: this.yourEmail
        };
        if (this.yourEmail != "") {
            this.showSpinner = true;
            this.restapi.forgetPasswordGenOtp(data).subscribe((res: any) => {
                this.common.loaderEnd();
                if (res.success) {
                    this.notifierService.notify('success', res.message);
                    this.setHasOtp();
                    this.showSpinner = false;
                } else {
                    this.notifierService.notify('error', res.message);
                    this.showSpinner = false;
                }
            })
        } else {
            this.notifierService.notify('error', "Please Enter email");
        }
    }

    changeMyPassword() {
        const data = {
            email: this.yourEmail,
            otp: this.otp,
            newPassword: this.newPassword
        };

        if (this.newPassword == this.confirmNewPassword) {
            this.restapi.updateNewPassword(data).subscribe((res: any) => {
                if (res.success) {
                    this.notifierService.notify('success', res.message);
                    this.setHasOtp();
                    this.closeModal();
                } else {
                    this.notifierService.notify('error', res.message);
                }
            })
        } else {
            this.notifierService.notify('error', "New password and Confirm password is not matched!");
        }
    }
}
