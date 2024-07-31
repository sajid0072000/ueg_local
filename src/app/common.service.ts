import {Injectable} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {Subject} from 'rxjs';
import {RestApiService} from './rest-api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GetStatedComponent} from './public/get-stated/get-stated.component';
import {EnrolOnCourseComponent} from './public/enrol-on-course/enrol-on-course.component';
import {ContactEducatorComponent} from './public/contact-educator/contact-educator.component';
import {ShareDataComponent} from './public/share-data/share-data.component';
import {ImageModalComponent } from './admin/image-modal/image-modal.component';
import { NotifierService } from "angular-notifier";

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    Subject = new Subject<any>();
    cartSubject = new Subject<any>();
    loginSubject = new Subject<any>();

    sheardId: any = ''
    get sheardData(): any {
        const d = localStorage.getItem('sheardData');
        if(d) {
            try{
                return JSON.parse(d);
            } catch(e) {
                return d;
            }
        } else {
            return null;
        }
      }
    
      set sheardData(value: any) {
        localStorage.setItem('sheardData', value);
      }
    FILE_URL = ''
    categorytypeArr: Array<any> = [];
    slideConfig: any = {}
    schoolformData:any={
        Name:'',
        Location:'',
        MainInformation:'',
        SchoolInformation:'',
        AdditionalInformation:'',
        AdmissionsPolicy:'',
        logoURI:'',
        ImageUri1:'',
        ImageUri2:'',
        ImageUri3:'',
        flag:''
      }
      universityFormData:any={
            name:'',
            universitylocation:'',
            mainInformation:'',
            universityInformation:'',
            additionalInformation:'',
            admissionsPolicy:'',
            logoUrl:'',
            imageUrl1:'',
            imageUrl2:'',
            imageUrl3:'',
            flag:''
      }

    fullScreenImg:any={}
    backgroundColour:any=''
    constructor(private spinner: NgxSpinnerService, private rest: RestApiService, private modalService: NgbModal, private notifierService: NotifierService
    ) {
        this.FILE_URL = this.rest.FILE_URL;        
    }

      
      
     openImageModal(imageUrl:any,backgroundColour:any=''):any{        
        this.modalService.open(ImageModalComponent,{ centered:true,size:"xxl", backdrop:true})
        if (imageUrl) {
            this.fullScreenImg = this.imgCheck(imageUrl);
            this.backgroundColour=backgroundColour
            
          }
    }

    navigate(url: string[]):any {
        window.location.href = window.location.origin + '/' + url.join('/');
    }


    getUsername(data: any): any {
        sessionStorage.setItem('name', data);
    }

    getItemuserId(data: any): any {
        sessionStorage.setItem('userid', data);
    }

    imgCheck(imageurl: any): any {
        try {
            if (imageurl.substring(0, 4) == 'http' || imageurl.substring(0, 5) == 'https') {
                return imageurl
            } else {
                return this.FILE_URL + imageurl
            }
        } catch (e) {
            return '';
        }
    }

    getUserId(): any {
        return sessionStorage.getItem('userid')
    }

    getLoginUserName(): any {
        return sessionStorage.getItem('name');
    }

    getUserType(): any {
        const type = sessionStorage.getItem('usertype');
        if (type) {
            return JSON.parse(type);
        } else {
            return null;
        }
    }

    loaderStart(): void {
        // this.spinner.show();
    }

    loaderEnd(): void {
        // this.spinner.hide();
    }

    pageLoadEnd(elemId: string): void{
        const elem = document.getElementById(elemId);
        if(elem) {
            elem.classList.remove('display-none');
            elem.classList.add('display-show');
        }
    }

    formatTime(min: any): any {
        if (isNaN(min) || min < 0) {
            return '0';
        }
        if (min <= 60) {
            return ` ${min} Minutes`;
        }
        const hours = Math.floor(min / 60);
        const remainingMinutes = min % 60;
        let temp = '';
        if (hours > 0) {
            if (hours !== 1) {
                temp = `${hours} Hours`;
            } else {
                temp = `${hours} Hour`;
            }
        }

        if (remainingMinutes > 0) {
            temp += ` ${remainingMinutes} Minutes`;
        }

        return temp;
    }

    formatDate(date: any, flag = 0, format = 'YYYY-MM-DD') {
        let d = flag === 0 ? new Date(date) : date, month = '' + (d.getMonth() + 1), day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (format === 'YYYY-MM-DD') {
            return [year, month, day].join('-');
        } else {
            return [day, month, year].join('-');
        }
    }

    convertMinsToHrsMins(duration: number) {
        duration = duration * 60;
        // Hours, minutes and seconds
        const hrs = ~~(duration / 3600);
        const mins = ~~((duration % 3600) / 60);
        const secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;

        return ret;
    }

    getToken(): any {
        return sessionStorage.getItem('token');
    }

    encryptPayload(data: any) {
        return data;
    }

    decryptPayload(data: any) {
        return data;
    }

    clearUserData(): any {
        sessionStorage.clear();
    }


    encryptParams(data: any) {
        return data;
    }

    decryptParams(data: any) {
        return data;
    }


    getUserTypePermission(): any {
        if (sessionStorage.getItem('usertype') === '1') {
            return 1;
        }
        if (sessionStorage.getItem('usertype') === '2') {
            return 2;
        }
        if (sessionStorage.getItem('usertype') === '3') {
            return 3;
        }
    }

    getStarted(): any {
        this.modalService.open(GetStatedComponent, {size: 'xl', backdrop: true, windowClass:"get_str_cmp"});
    }

    enroloncourse(): any {
        this.modalService.open(EnrolOnCourseComponent, {size: 'md', backdrop: true});
    }

    contactEducator(): any {
        this.modalService.open(ContactEducatorComponent, {size: 'md', backdrop: true});
    }

    shareData(): any {
        this.modalService.open(ShareDataComponent, {size: 'md', backdrop: true});
    }

    setRoleArr(data: any) {
        sessionStorage.setItem('role', JSON.stringify(data));
    }

    setRoleId(data: any) {
        sessionStorage.setItem('roleid', JSON.stringify(data));
    }

    setUser(data: any) {
        sessionStorage.setItem('user', JSON.stringify(data));
    }

    getRoleArr() {
        const rolearr = sessionStorage.getItem('role');
        if (rolearr) {
            return JSON.parse(rolearr);
        } else {
            return null;
        }
    }

    getRoleId() {
        let rid: any = sessionStorage.getItem('roleid')
        return JSON.parse(rid)
    }

    setUserName(data: any) {
        sessionStorage.setItem('name', data)
    }

    addBodyClass(): any {
        let elem: any = document.getElementById('admin')
        elem.classList.add("body-admin");
    }

    removeBodyClass(): any {
        let elem: any = document.getElementById('admin')
        elem.classList.remove("body-admin");
    }

    changeText(text: any): any {        
        if(text){
            if (text.length <= 450) {
                return text;
            } else {
                return text.slice(0, 450) + '...';
            }
        } else {
            return '';
        }
    }
    changeEmail(text:any){
        if(text) {
            if (text.length <= 15) {
                return text;
            } else {
                return text.slice(0, 15) + '...';
            }
        } else {
            return '';
        }
    }

    chngeCarousalText(carausaltext: any): any {
        if (carausaltext.length <= 28) {
            return carausaltext;
        } else {
            return carausaltext.slice(0, 28);
        }
    }

    generateSessionId() {
        let sessionid = Math.floor(Math.random() * 10000 + 1);
        return sessionid;
    }


    groupBy(xs: any, key: any) {
        return xs.reduce(function (rv: any, x: any) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

    getCurrentYear(): number {
        const dt = new Date();
        return dt.getFullYear();
    }

    getSessionId(): any {
        let sessionid: any = sessionStorage.getItem('sessionid');
        if (sessionid) {
            return sessionid;
        } else {
            sessionid = Math.floor(Math.random() * 100000 + 1);
            sessionStorage.setItem('sessionid', sessionid);
            return sessionStorage.getItem('sessionid');
        }
    }


    getSlickCaroOption(arr: any): any {
        let arrow: boolean = false;

        if (arr.length > 6) {
            arrow = true;
        }
        let slideConfig: any = {
            mobileFirst:true,
            slidesToShow: 6,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 500,
            arrows: arrow,
            dots: false,
            draggable: true,
            pauseOnHover: false,
            centerMode: false,
            responsive: [
                {
                  breakpoint: 1366,
                  settings: {
                    slidesToShow: 6,
                    mobileFirst:true,
                  }
                },{
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 4,
                      mobileFirst:true,
                    }
                  },
                {
                  breakpoint:600,
                  settings: {
                    slidesToShow:3,
                    mobileFirst:true,
                    arrows:true
                  }
                },
                {
                    breakpoint:500,
                    settings: {
                      slidesToShow:2,
                      mobileFirst:true,
                      arrows:true
                    }
                  },
                {
                    breakpoint:414,
                    settings: {
                      slidesToShow:1,
                      mobileFirst:true,
                      arrows:true
                    }
                  },
                
                {
                    breakpoint:400,
                    settings: {
                      slidesToShow: 1,
                      mobileFirst:true,
                      arrows:true
                    }
                  },
                  {
                    breakpoint:375,
                    settings: {
                      slidesToShow: 1,
                      mobileFirst:true,
                      arrows:true
                    }
                  },
                  {
                    breakpoint:360,
                    settings: {
                      slidesToShow: 1,
                    }
                  },
                  {
                    breakpoint:320,
                    settings: {
                      slidesToShow: 1,
                      mobileFirst:true,
                      arrows:true
                    }
                  },
                  {
                    breakpoint:300,
                    settings: {
                      slidesToShow: 1,
                      mobileFirst:true,
                      arrows:true
                    }
                  }
              ]
        };
        return slideConfig
    }



    getCurrentDateFormat() {
        const date = new Date();

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const monthName = monthNames[monthIndex];
        const daySuffix = this.getDaySuffix(day);

        const formattedDate = `${day}${daySuffix} ${monthName}, ${year}`;

        return formattedDate;
    }
    getDaySuffix(day: any):any {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    notify(type: any, message: any): any {
        this.notifierService.notify(type, message);
    }

}
