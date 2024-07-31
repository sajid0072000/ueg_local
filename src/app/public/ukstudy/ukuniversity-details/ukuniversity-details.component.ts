import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { CommonService } from "src/app/common.service";
import { RestApiService } from "src/app/rest-api.service";
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'app-ukuniversity-details',
  templateUrl: './ukuniversity-details.component.html',
  styleUrls: ['./ukuniversity-details.component.css']
})
export class UkuniversityDetailsComponent implements OnInit {
  universityId: any = "";
  Location: string | null = ''
  Name: any = ''
  MainInformation: any = ''
  UniversityInformation: any = ''
  AdditionalInformation: any = ''
  AdmissionsPolicy: any = ''
  ImageUri1: any = ''
  ImageUri2: any = ''
  ImageUri3: any = ''
  LogoUri: any = '';
  mobImageUrl3: any = '';
  mobImageUrl2: any = '';
  mobImageUrl1: any = '';
  universityEducatorLimit: any = '10'
  universitEducatorOffest: any = '0'
  otherEducatorLImit: any = '10'
  otherEducatorOffest: any = '0'
  getUniversityEducatorList: any = []
  getotherUniversityEducatorList: any = []
  outsideschoolLocationList: any = []
  currentInstitueId: any = ''
  slideConfigeducatorwho:any={}
  slideConfigeotheruniversity:any={}

  showImageUri1: any = '';
  showImageUri2: any = '';
  showImageUri3: any = '';
  isLondonLoc = false;
  constructor(private activeroute: ActivatedRoute,
    public common: CommonService,
    private rest: RestApiService,
    private router: Router,
    private notifierService: NotifierService,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.universityId = this.activeroute.snapshot.paramMap.get('id');
    this.universityDetails()

    window.addEventListener('resize', (event: any) => {
      console.log(event.target.innerWidth);
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

  scrollToSection(id: string): void {
    this.viewportScroller.scrollToAnchor(id);
  }


  universityDetails(): any {
    const data = {
      Id: this.universityId,
    }
    this.rest.universityDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.currentInstitueId = res.response.Id;
        this.Name = res.response.Name;
        this.Location = res.response.Location;
        if (this.Location && this.Location.toLowerCase().indexOf("london") > -1) {
          this.isLondonLoc = true;
        }
        this.MainInformation = res.response.MainInformation;
        this.UniversityInformation = res.response.UniversityInformation;
        this.AdditionalInformation = res.response.AdditionalInformation;
        this.AdmissionsPolicy = res.response.AdmissionsPolicy;
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
        this.getUniversityEducators()
      } else {
        this.common.notify("error", res.message);
      }
    }, (err: any) => {
      this.common.notify("error", err.error.message);
    });
  }

  getUniversityEducators(): any {
    const data = {
      "institution": this.Name,
      "limit": this.universityEducatorLimit,
      "offset": this.universitEducatorOffest
    }
    this.rest.getUniversityEducators(data).subscribe((res: any) => {
      if (res.success) {
        this.getUniversityEducatorList = res.response;
        this.slideConfigeducatorwho = this.common.getSlickCaroOption(this.getUniversityEducatorList);
      }
      this.getOtherUniversities();
    }, (err: any) => {
      this.common.notify("error", err.error.message);
    });
  }

  getOtherUniversities(): any {
    const data = {
      "currentinstitutionid": this.currentInstitueId,
      "limit": this.otherEducatorLImit,
      "offset": this.otherEducatorOffest,
      "type": this.isLondonLoc ? 'inside' : 'outside'
    }
    this.rest.getOtherUniversities(data).subscribe((res: any) => {
      this.common.pageLoadEnd('p-loaded');
      if (res.success) {
        this.getotherUniversityEducatorList = res.response;
        this.slideConfigeotheruniversity = this.common.getSlickCaroOption(this.getotherUniversityEducatorList);
      }
    }, (err: any) => {
      this.common.notify("error", err.error.message);
    });
  }

  goto(path: any): any {
    this.common.navigate([path]);
  }

  gotoOther(path: any): any {
    this.common.navigate([path]);
  }
}
