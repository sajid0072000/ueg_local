import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { CommonService } from "src/app/common.service";
import { RestApiService } from "src/app/rest-api.service";
declare var $: any;


@Component({
  selector: "app-schools",
  templateUrl: "./schools.component.html",
  styleUrls: ["./schools.component.css"],
})
export class SchoolsComponent implements OnInit {
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

  constructor(
    private activeroute: ActivatedRoute,
    public common: CommonService,
    private rest: RestApiService,
    private notifierService: NotifierService
  ) { }
  ngOnInit(): void {
    this.schoolId = this.activeroute.snapshot.paramMap.get('id');
    this.schoolDetails();
  }

  schoolDetails(): any {
    const data = {
      Id: this.schoolId,
    };
    this.common.loaderStart();
    this.rest.schoolDetails(data).subscribe(
      (res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.Name = res.response.Name
          this.Location = res.response.Location
          this.MainInformation = res.response.MainInformation
          this.SchoolInformation = res.response.SchoolInformation
          this.AdditionalInformation = res.response.AdditionalInformation
          this.AdmissionsPolicy = res.response.AdmissionsPolicy
          this.ImageUri1 = res.response.ImageUri1
          this.ImageUri2 = res.response.ImageUri2
          this.ImageUri3 = res.response.ImageUri3
          this.LogoUri = res.response.LogoUri;
          this.schoolsOutsideOfTheLocation();
        } else {
          this.notifierService.notify("error", res.message);
        }
      },
      (err: any) => {
        this.notifierService.notify("error", err.error.message);
      }
    );
  }

  schoolsOutsideOfTheLocation(): any {
    const data = {
      "Location": this.Location
    }
    this.common.loaderStart()
    this.rest.schoolsOutsideOfTheLocation(data).subscribe((res: any) => {
      this.common.loaderEnd()
      if (res.success) {
        this.outsideschoolLocationList = res.response
        this.design()
      } else {
        this.notifierService.notify("error", res.message);
      }
    }, (err: any) => {
      this.notifierService.notify("error", err.error.message)
    })
  }

  design(): any {
    setTimeout(() => {
      $("#tech_caro").owlCarousel({
        loop: true,
        margin: 20,
        autoplay: false,
        nav: false,
        dots:false,
        responsive: {
            0: {
                items:1,
            },
            600: {
                items: 2,
            },
            1000: {
                items:3,
            }
        }
      });
    }, 1000);
  }

}
