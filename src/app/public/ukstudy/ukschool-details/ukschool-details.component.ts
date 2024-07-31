import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { CommonService } from "src/app/common.service";
import { RestApiService } from "src/app/rest-api.service";
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'app-ukschool-details',
  templateUrl: './ukschool-details.component.html',
  styleUrls: ['./ukschool-details.component.css']
})
export class UkschoolDetailsComponent implements OnInit {
  schoolId: any = "";
  Location: any = ''
  Name: any = ''
  MainInformation: any = ''
  SchoolInformation: any = ''
  AdditionalInformation: any = ''
  AdmissionsPolicy: any = ''
  ImageUri1: any = ''
  ImageUri2: any = ''
  ImageUri3: any = ''
  LogoUri: any = ''
  outsideschoolLocationList: any = []
  schoolOutsideLimit: any = '10'
  schoolOutsideOffset: any = '0';

  mobImageUrl3: any = '';
  mobImageUrl2: any = '';
  mobImageUrl1: any = '';
  showImageUri1: any = '';
  showImageUri2: any = '';
  showImageUri3: any = '';

  slideConfig = {
    mobileFirst: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    margin: 30,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 500,
    arrows: true,
    dots: false,
    draggable: true,
    pauseOnHover: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 6,
          mobileFirst: true,
        }
      }, {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          mobileFirst: true,
          arrows: true
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          mobileFirst: true,
          arrows: true
        }
      },
      {
        breakpoint: 414,
        settings: {
          slidesToShow: 1,
          mobileFirst: true,
          arrows: true
        }
      },

      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          mobileFirst: true,
          arrows: true
        }
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          mobileFirst: true,
          arrows: true
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          mobileFirst: true,
          arrows: true
        }
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          mobileFirst: true,
          arrows: true
        }
      }
    ]

  };
  isLondonLoc = false;


  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    public common: CommonService,
    private rest: RestApiService,
    private notifierService: NotifierService,
    private viewportScroller: ViewportScroller
  ) { }
  ngOnInit(): void {
    this.schoolId = this.activeroute.snapshot.paramMap.get('id');
    this.schoolDetails();
    window.addEventListener('resize', (event: any) => {
      if(event.target.innerWidth <= 1026){
        this.showImageUri1 = this.mobImageUrl1;
        this.showImageUri3 = this.mobImageUrl3;
      } else {
        this.showImageUri1 = this.ImageUri1;
        this.showImageUri3 = this.ImageUri3;
      }
     if(event.target.innerWidth <= 807){
        this.showImageUri2 = this.mobImageUrl2;
      } else {
        this.showImageUri2 = this.ImageUri2;
      }
    });
  }

  schoolDetails(): any {
    const data = {
      Id: this.schoolId,
    };
    this.common.loaderStart();
    this.rest.ukSchoolDetails(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.Name = res.response.Name
          this.Location = res.response.Location;
          if (this.Location && this.Location.toLowerCase().indexOf("london") > -1) {
            this.isLondonLoc = true;
          }
          this.MainInformation = res.response.MainInformation
          this.SchoolInformation = res.response.SchoolInformation
          this.AdditionalInformation = res.response.AdditionalInformation
          this.AdmissionsPolicy = res.response.AdmissionsPolicy
          this.ImageUri1 = res.response.ImageUri1;
          this.ImageUri2 = res.response.ImageUri2;
          this.ImageUri3 = res.response.ImageUri3;
          this.LogoUri = res.response.LogoUri;
          this.mobImageUrl1 = res.response.MobImageUri1;
          this.mobImageUrl2 = res.response.MobImageUri2;
          this.mobImageUrl3 = res.response.MobImageUri3;
          if (window.innerWidth <= 1026) {
            this.showImageUri1 = this.mobImageUrl1;
            this.showImageUri3 = this.mobImageUrl3;
          } else {
            this.showImageUri1 = this.ImageUri1;
            this.showImageUri3 = this.ImageUri3;
          }
      
          if(window.innerWidth <= 807){
            this.showImageUri2 = this.mobImageUrl2;
          } else {
            this.showImageUri2 = this.ImageUri2;
          }
          this.schoolsOutsideOfTheLocation();
        } else {
        }
      },
      (err: any) => {
        this.notifierService.notify("error", err.error.message);
      }
    );
  }

  schoolsOutsideOfTheLocation(): any {
    const data = {
      "Location": this.Location,
      "limit": this.schoolOutsideLimit,
      "offset": this.schoolOutsideOffset,
      "type": this.isLondonLoc ? 'inside' : 'outside'
    }
    this.rest.ukschoolsOutsideLocation(data).subscribe((res: any) => {
      this.common.pageLoadEnd('p-loaded');
      if (res.success) {
        this.outsideschoolLocationList = res.response
      } else {
      }
    }, (err: any) => {
      this.common.notify("error", err.error.message)
    })
  }

  scrollToSection(sectionId: string) {
    this.viewportScroller.scrollToAnchor(sectionId);
  }

  gotoOther(path: any): any {
    const url = this.router.serializeUrl(this.router.createUrlTree([path]));
    window.open(url, '_self');
  }
}
