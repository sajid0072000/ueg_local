import { Component, ViewChild, HostListener, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from '../rest-api.service'
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { NotifierService } from 'angular-notifier';


@Component({
    selector: 'app-public',
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit, OnDestroy {

    @ViewChild('enrolNowModal') enrolNowModal: any;
    @ViewChild('loginModal') loginModal: any;
    @ViewChild('otpModal') otpModal: any;
    @ViewChild('forgotModal') forgotModal: any;

    courseDiv: boolean = false
    educatorDiv: boolean = false
    searchDiv: boolean = false
    searchText: any = ''
    getCategoryTypeArr: any = []

    firstname: any = ''
    lastname: any = ''
    email: any = ''
    mobile: any = ''
    dob: any = ''
    address: any = ''
    message: any = ''
    checkTerm: boolean = false

    firstnameErr: boolean = false
    validfirstNameErr: boolean = false
    lastnameErr: boolean = false
    validlastNameErr: boolean = false
    emailErr: boolean = false
    validEmailErr: boolean = false
    mobileErr: boolean = false
    validmobilErr: boolean = false
    checkTermErr: boolean = false
    messageErr: boolean = false

    limit: any = 10;
    offset: any = 0;
    getCartlistArr: any = [];
    totalAmount: number = 0;
    sum: any = "";

    mobNavMenu: boolean = false
    mobSearchBar: boolean = false
    password: any = ''
    passwordErr: boolean = false

    subjectRes: any = '';

    ukstudyDiv: boolean = false

    ukstudyArr: any = [
        {
            id: 0,
            schoolName: "UK SCHOOLS",
            shortheader: "Details about UK Schools",
            imgSchool: "assets/img/icon-foot-tp1.svg",
            componentPath: 'ukschoollist'
        },
        {
            id: 1,
            schoolName: "UK UNIVERSITIES",
            shortheader: "Details about UK Universities",
            imgSchool: "assets/img/icon-foot-tp2.svg",
            componentPath: "ukuniversitylist"
        },

    ];

    signUpdetails: any = {};
    username: any = '';
    usrNameErr: boolean = false;
    otp: any = 0;
    otperr: boolean = false;
    loginFlag: boolean = false;
    userid: any = '';
    userName: any = '';
    globalSearchText: string = '';
    searchSpinner: boolean = false;
    globalSearchList: any = [];

    constructor(private modalService: NgbModal, private rest: RestApiService, private router: Router, public common: CommonService, private notifierService: NotifierService) {

    }

    ngOnDestroy(): void {
        if (this.subjectRes == true) {
            this.common.Subject.unsubscribe();
        }
        if (this.userid) {
            this.common.loginSubject.unsubscribe();
            this.loginFlag = false
        }
        window.removeEventListener('resize', this.checkScreenSize.bind(this));

    }
    ngOnInit(): void {
        this.getCategoryType()
        this.getCategoryTypeFun()
        this.getCart();
        let name = this.common.getLoginUserName();
        if (name) {
            name = name.split(' ');
            this.userName = name[0];
        }
        this.common.Subject.subscribe((res: any) => {
            if (res.success) {
                this.subjectRes = res.success;
                this.getCart();
            }
        });

        if (this.common.getUserId()) {
            this.loginFlag = true;
        }
        this.common.loginSubject.subscribe((res: any) => {
            if (res.userid != '') {
                this.userid = res.userid;
                this.loginFlag = true;
            } else {
                this.loginFlag = false;
            }
        });
        this.checkScreenSize();
        window.addEventListener('resize', this.checkScreenSize.bind(this));

        window.addEventListener('click', (event) => {
            console.log(event.target)
            if (!(<HTMLInputElement>event.target).matches('.mcick') &&
                !(<HTMLInputElement>event.target).matches('.navbar-toggler-icon')) {
                try {
                    this.mobNavMenu = false;
                } catch (e) {
                }
            }
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.checkScreenSize();
    }

    checkScreenSize() {
        if (window.innerWidth > 768) {
            this.mobNavMenu = false;
            // this.searchDiv  = false;
        }
    }
    togMobSearchMenu(): any {
        this.mobSearchBar = this.mobSearchBar ? false : true
        this.mobNavMenu = false;
    }

    globalSearch(): void {
        if (this.globalSearchText.length >= 3) {
            const data = {
                searchText: this.globalSearchText
            };
            this.searchSpinner = true;
            this.rest.globalSearch(data).subscribe((res: any) => {
                this.searchSpinner = false;
                if (res.response) {
                    this.globalSearchList = res.response;
                }
            }, (err: any) => {
                this.searchSpinner = false;
            })
        }

    }



    redirectTo(obj: any) {
        this.searchDiv = false;
        if (obj.type === 'course') {
            this.common.navigate(['course-details/' + obj.id])
        } else if (obj.type === 'educator') {
            this.common.navigate(['educator-details/' + obj.id])
        } else if (obj.type === 'resource') {
            this.common.navigate(['resources-details/' + obj.id])
        } else if (obj.type === 'school') {
            this.common.navigate(['ukschooldetails/' + obj.id])
        } else if (obj.type === 'university') {
            this.common.navigate(['ukuniversityDetails/' + obj.id])
        }
    }

    togMobMenu(): any {
        console.log('>>>>>>click tog')
        this.mobNavMenu = this.mobNavMenu ? false : true
        this.mobSearchBar = false;
        this.submenu = "";
        this.searchDiv = false;
    }

    toggleMenuUkstudy(): any {
        this.educatorDiv = false
        this.searchDiv = false
        this.courseDiv = false
        this.ukstudyDiv = !this.ukstudyDiv
    }

    firstnameFun(): any {

    }

    lastnameFun(): any {

    }

    getCart(): any {
        const data = {
            userid: this.common.getUserId(),
            type: "resource",
            limit: this.limit,
            offset: this.offset,
        };
        this.rest.getCart(data).subscribe(
            (res: any) => {
                if (res.success) {
                    this.getCartlistArr = res.response.resourceList;
                    this.totalAmount = res.response.totalPrice
                } else {
                    this.notifierService.notify("error", res.message);
                }
            },
            (err: any) => {
                this.notifierService.notify("error", err.error.message);
            }
        );
    }

    emptyCart() {
        let userid: any = localStorage.getItem("userid");
        let sessionid: any = this.common.getSessionId();
        const data = {
            id: userid ? userid : sessionid
        }
        this.common.loaderStart();
        this.rest.emptyCart(data).subscribe(
            (res: any) => {
                this.common.loaderEnd();
                if (res.success) {
                    this.notifierService.notify("success", res.message);
                    this.getCartlistArr = [];
                    this.totalAmount = 0;
                    this.common.cartSubject.next({ success: true });
                } else {
                    this.notifierService.notify("error", res.message);
                }
            },
            (err: any) => {
                this.notifierService.notify("error", err.error.message);
            }
        );
    }


    getCategoryTypeFun(): any {
        const data = {
            "searchText": this.searchText
        }

        this.rest.getCategoryType(data).subscribe((result: any) => {
            if (result.success) {
                this.getCategoryTypeArr = result.response
            } else {
                this.getCategoryTypeArr = []
            }
        })
    }

    goto(path: any): any {
        this.educatorDiv = false
        this.searchDiv = false
        this.courseDiv = false
        this.ukstudyDiv = false
        /* this.router.navigate(['/']).then(() => {
            this.router.navigate([path]);
        window.scrollTo(0,0)

        }); */
        this.common.navigate([path]);

    }

    toggleMenuCourse(): any {
        this.educatorDiv = false
        this.searchDiv = false
        this.ukstudyDiv = false
        this.courseDiv = !this.courseDiv
    }

    toggleMenuEducator(): any {
        this.courseDiv = false
        this.searchDiv = false
        this.ukstudyDiv = false
        this.educatorDiv = !this.educatorDiv
    }

    toggleMenuSearch(): any {
        this.courseDiv = false
        this.educatorDiv = false
        this.ukstudyDiv = false
        this.searchDiv = !this.searchDiv;
        this.globalSearchText = '';
        this.globalSearchList = [];
        this.mobNavMenu = false;
    }

    openEnrol(): any {
        this.resetForm()
        this.modalService.open(this.enrolNowModal, { centered: true, size: 'md' });
    }

    openLogin(): any {
        this.closeModal()
        this.modalService.open(this.loginModal, { centered: true, size: 'md' });
    }


    closeModal(): any {
        this.modalService.dismissAll();
        this.resetForm()
    }

    addCourseenRoll(): any {
        this.firstnameErr = false
        this.validfirstNameErr = false
        this.lastnameErr = false
        this.validlastNameErr = false
        this.emailErr = false
        this.validEmailErr = false
        this.mobileErr = false
        this.validmobilErr = false
        this.checkTermErr = false
        let err = 0
        let filter =
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (this.firstname == "" || this.firstname == null || this.firstname == undefined) {
            this.firstnameErr = true
            err++
        }

        if (!this.firstname || /^\s*$/.test(this.firstname) || /\s{2,}/.test(this.firstname)) {
            this.validfirstNameErr = true;
            err++;
        }
        if (this.lastname == "" || this.lastname == null || this.lastname == undefined) {
            this.lastnameErr = true
            err++
        }


        if (!this.lastname || /^\s*$/.test(this.lastname) || /\s{2,}/.test(this.lastname)) {
            this.validlastNameErr = true;
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
        if (this.checkTerm == false || this.checkTerm == null || this.checkTerm == undefined) {
            this.checkTermErr = true
            err++
        }
        if (err == 0) {
            const data = {
                "firstname": this.firstname,
                "lastname": this.lastname,
                "mobile": this.mobile,
                "email": this.email,
                "dob": this.dob,
                "address": this.address,
                "message": this.message
            }
            this.common.loaderStart()
            this.rest.addCourseEnrollFree(data).subscribe((res: any) => {
                this.common.loaderEnd()
                if (res.success) {
                    this.notifierService.notify('success', res.message);
                    this.closeModal()
                    this.resetForm()
                } else {
                    this.notifierService.notify('error', res.message);
                }
            }, (err: any) => {
                this.notifierService.notify('error', err.error.message)
            })
        }
    }


    resetForm(): any {
        this.firstname = ''
        this.lastname = ''
        this.email = ''
        this.mobile = ''
        this.dob = ''
        this.address = ''
        this.message = ''
        this.checkTerm = false
        this.firstnameErr = false
        this.validfirstNameErr = false
        this.lastnameErr = false
        this.validlastNameErr = false
        this.emailErr = false
        this.validEmailErr = false
        this.mobileErr = false
        this.validmobilErr = false
        this.checkTermErr = false
        this.messageErr = false;
        this.username = '';
        this.usrNameErr = false;
        this.otp = '';
        this.otperr = false;
        this.password = ''
        this.passwordErr = false
    }


    // first name
    regTest(string: any): boolean {
        var regex = /^[A-Za-z\s]+$/;
        return regex.test(string);
    }

    onKeyPressFirstName(event: any): any {
        this.firstnameErr = false;
        this.validfirstNameErr = false;
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
        this.validlastNameErr = false;
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


    checkTermFun(): any {
        this.checkTermErr = false
    }


    passwordFun(): any {
        this.passwordErr = false
    }

    login(): any {
        this.emailErr = false
        this.validEmailErr = false
        this.passwordErr = false
        let err = 0
        let filter =
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
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
        if (this.password == "" || this.password == null || this.password == undefined) {
            this.passwordErr = true
            err++
        }
        if (err === 0) {
            const obj = {
                email: this.email,
                password: this.password,
                usertype: '3'
            };
            this.common.loaderStart()
            this.rest.userSignIn(obj).subscribe((res: any) => {
                this.common.loaderEnd()
                if (res.success) {
                    this.common.setUserName(res.response.name)
                    this.common.getItemuserId(res.response.userid)
                    this.closeModal();
                    this.common.loginSubject.next({ userid: res.response.userid });

                } else {
                    this.notifierService.notify('error', res.message);
                }
            }, (err: any) => {
                this.notifierService.notify('error', err.error.message)
            })
        }
    }


    openRegisterModal(modal: any) {
        this.closeModal();
        this.modalService.open(modal, { centered: true, size: 'md', backdrop: false });
    }

    signUp() {
        this.usrNameErr = false;
        this.emailErr = false;
        this.validEmailErr = false;
        this.passwordErr = false;
        let err = 0;

        if (this.username === '' || this.username === undefined || this.username === null) {
            this.usrNameErr = true;
            err++;
        }

        let filter =
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
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
        if (this.password == "" || this.password == null || this.password == undefined) {
            this.passwordErr = true
            err++
        }

        if (this.checkTerm == false || this.checkTerm == null || this.checkTerm == undefined) {
            this.checkTermErr = true
            err++
        }

        if (err == 0) {
            const data = {
                username: this.username,
                email: this.email,
                password: this.password,
                usertype: '3'
            };
            this.signUpdetails = data;

            this.common.loaderStart();
            this.rest.userSignUp(data).subscribe((res: any) => {
                this.common.loaderEnd();
                if (res.success) {
                    this.notifierService.notify('success', res.message);
                    this.openOtpModal();
                }
            }, (err: any) => {
                this.notifierService.notify('error', err.error.message);
            });

        }
    }


    validOtp() {
        let err = 0;
        if (this.otp.toString().length != 6) {
            this.otperr = true;
            err++;
        }
        if (err == 0) {
            const data = {
                otp: this.otp,
                username: this.signUpdetails.username,
                email: this.signUpdetails.email,
                password: this.signUpdetails.password,
                usertype: this.signUpdetails.usertype
            };
            this.common.loaderStart();
            this.rest.userVerification(data).subscribe((res: any) => {
                this.common.loaderEnd();
                if (res.success) {
                    this.notifierService.notify('success', res.message);
                    this.common.setUserName(res.response.name)
                    this.common.getItemuserId(res.response.userid)
                    this.closeModal();
                    this.common.loginSubject.next({ userid: res.response.userid });

                } else {
                    this.notifierService.notify('error', res.message);
                }
            })
        }
    }

    openOtpModal() {
        this.closeModal();
        this.modalService.open(this.otpModal, { centered: true, size: 'md', backdrop: false });
    }

    usernameFun() {
        this.usrNameErr = false;
    }

    removeOtpErr() {
        this.otperr = false;
    }

    logOut() {
        this.common.clearUserData();
        this.common.loginSubject.next({ userid: '' });
        this.router.navigate(['/']);
        window.scrollTo(0, 0)

    }


    openFogetPasswordModal(): any {
        this.closeModal()
        this.modalService.open(this.forgotModal, { centered: true, size: 'md', backdrop: false });
    }


    getCategoryType(): any {
        const data = {
            "searchText": ""
        }
        this.common.loaderStart();
        this.rest.getCategoryType(data).subscribe((res: any) => {
            this.common.loaderEnd();
            if (res.success) {
                this.common.categorytypeArr = res.response
            } else {
                this.common.categorytypeArr = [];
            }
        }, (err: any) => {
            this.notifierService.notify("error", err.error.message)
        })
    }

    clearSearch() {
        if (this.globalSearchText.length <= 3) {
            this.globalSearchList = [];
            this.searchSpinner = false
        }
    }
    getStaticIconPath(item: any): string {
        switch (item.type) {
            case 'course':
                return this.common.imgCheck(item.courseicon);
            case 'resource':
                return 'assets/img/icn.resource.svg';
            case 'university':
                return 'assets/img/icn.university.svg';
            case 'school':
                return 'assets/img/icn.school.svg';
            case 'educator':
                return 'assets/img/educator-icon-1.svg';
            default:
                return 'assets/img/course-icon-4.svg';
        }
    }
    submenu: any = ''

    submenuFun(path: any): any {
        if (path !== this.submenu) {
            this.submenu = path
        } else {
            this.submenu = ''
        }
    }

    deleteCart(id: any): any {
        let userid: any = localStorage.getItem("userid");
        let sessionid: any = this.common.getSessionId();
        const data = {
          userid: userid ? userid : "",
          sessionid: sessionid,
          courseid: "",
          type: "resource",
          resourceid: "",
          cartid: id,
        };
        this.common.loaderStart();
        this.rest.deleteCart(data).subscribe(
          (res: any) => {
            this.common.loaderEnd();
            if (res.success) {
              this.common.notify("success", res.message);
              this.getCart();
              this.common.Subject.next({ success: true });
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