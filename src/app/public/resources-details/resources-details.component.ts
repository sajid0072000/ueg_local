import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { CommonService } from "src/app/common.service";
import { RestApiService } from "src/app/rest-api.service";

@Component({
  selector: "app-resources-details",
  templateUrl: "./resources-details.component.html",
  styleUrls: ["./resources-details.component.css"],
})
export class ResourcesDetailsComponent implements OnInit {
  @ViewChild("alredyselected") alredyselected: any;
  resourceid: any = "";
  resourcename: any = "";
  resourceimg: any = "";
  resourceprice: any = "";
  agerangename: any = "";
  resourcelevel: any = "";
  resourcecategoryname: any = "";
  resourcedesc1: any = "";
  resourcedesc2: any = "";
  resourseDetailsArr: any = [];
  schoolListArr: any = [];
  furtherResourcesByCategoryArr: any = [];
  limit: any = 10;
  offset: any = 0;
  incrementplusone: number = 1;
  quantity: any = 1;
  updateresourcePrice: number = 0;
  furtherResourceId: any = "";
  resourcecategoryid:any=''
  backgroundColor:any = '';

  constructor(
    public common: CommonService,
    private rest: RestApiService,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private modalService: NgbModal,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.resourceid = this.route.snapshot.paramMap.get("id");
    this.resourseDetails(this.resourceid);
    
  }

  openSelectedModal(): any {
    this.modalService.open(this.alredyselected, {
      centered: true,
      backdrop: false,
      size: "true",
    });
  }

  resourseDetails(resourceid:any): any {
    const data = {
      resourceid: resourceid,
    };
    this.common.loaderStart();
    this.rest.resourceDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.resourcename = res.response.resourcename;
        this.resourceimg = res.response.resourceimg;
        this.resourceprice = res.response.resourceprice;
        this.resourcecategoryname = res.response.resourcecategoryname;
        this.agerangename = res.response.agerangename;
        this.resourcelevel = res.response.resourcelevel;
        this.resourcedesc1 = res.response.resourcedesc1;
        this.resourcedesc2 = res.response.resourcedesc2;
        this.schoolListArr = res.response.schoolList;
        this.updateresourcePrice = Number(res.response.resourceprice);
        this.resourcecategoryid = res.response.resourcecategoryid;
        this.backgroundColor = res.response.backgroundColour;
        this.getfurtherResourcesByCategory();

      }
    });
  }

  getfurtherResourcesByCategory(): any {
    const data = {
      resourcecategory: this.resourcecategoryid,
      limit: this.limit,
      offset: this.offset,
      resourceid:this.resourceid
    };
    this.rest.furtherResourcesByCategory(data).subscribe((res: any) => {
      this.common.pageLoadEnd('p-loaded');
      // this.common.loaderEnd();
      if (res.success) {
        this.furtherResourcesByCategoryArr = res.response;
      }
    });
  }

  gotoFurtherResourcesdetails(id: any): any {
    /* this.quantity = 1;
    this.furtherResourceId = id;
    this.resourceid = id;
    this.resourseDetails(id); */
    this.common.navigate(["/resources-details/" + id]);
  }

  incrementFun() {
    this.updateresourcePrice =
      Number(this.resourceprice) + this.updateresourcePrice;
    this.quantity += 1;
  }

  decrementFun() {
    this.updateresourcePrice -= Number(this.resourceprice);
    this.quantity -= 1;
  }

  addCart(): any {
    const data = {
      userid: this.common.getUserId(),
      // sessionid: session,
      resourceid: this.resourceid,
      type: "resource",
      quantity: this.quantity,
    };
    this.common.loaderStart();
    this.rest.addToCart(data).subscribe(
      (res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          if (res.status === 1004) {
            this.common.notify("warning", res.message);
          }
          if (res.status === 200) {
            this.common.notify("success", res.message);
            this.common.Subject.next({ success: true });
          }
        } else {
          this.common.notify("error", res.message);
        }
      },
      (err: any) => {
        this.common.notify("error", err.error.message);
      }
    );
  }

  gotoCheckout(): any {
    this.common.navigate(["/checkout"]);

  }

  goto(){
    this.common.navigate(["/resources"]);

  }

  gotoResourceFilter(name:any){
    this.common.sheardData = name
    this.common.navigate(["/resources"]);

  }
}
