import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from "../common.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent {

    menuArr = [] as any;

    constructor(private router: Router, public common: CommonService) {
    }


    ngOnInit(): void {
        const userType = this.common.getUserType();
        // if(userType === 1) {
        //     this.router.navigate(['/admin/app'])
        // } else if(userType === 2) {
        //     this.router.navigate(['/admin/app'])
        // }  else if(userType === 3) {
        //     this.router.navigate(['/user/app'])
        // } else {
        //     this.router.navigate(['/'])
        // }
        this.getMenu()
    }

    getMenu(): any {
        this.menuArr.push(
            {path: "/user/app/user-profile", name: "Profile", child: []},
            { path: "/pre-recorded" , name:"Pre Recorded Courses" , child:[]}
            /*{path: "/user/app/cart", name: "Cart", child: []},
            {path: "/user/app/wish-list", name: "Wish List", child: []},*/
        )
    }

    goto(path: string) {
        this.common.navigate([path])
    }

    logout(): void {
        this.common.clearUserData();
        this.common.navigate(['/'])
    }

}
