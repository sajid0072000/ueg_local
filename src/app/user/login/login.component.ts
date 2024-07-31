import {Component, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';

import {Router} from '@angular/router';
import {RestApiService} from 'src/app/rest-api.service';
import {CommonService} from "../../common.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private router: Router, private restapi: RestApiService, private notifierService: NotifierService,
                private common: CommonService) {
    }

    ngOnInit(): void {
        const userType = this.common.getUserType();
        if(userType === 1) {
            this.router.navigate(['/admin/app'])
        } else if(userType === 2) {
            this.router.navigate(['/admin/app'])
        }  else if(userType === 3) {
            this.router.navigate(['/user/app'])
        }
    }

    goto(): any {
        sessionStorage.setItem('name', 'user');
        sessionStorage.setItem('userid', '4');
        sessionStorage.setItem('usertype', '3');
        this.router.navigate(['/user/app']);
    }

}
