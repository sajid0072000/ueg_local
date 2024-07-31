import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { RestApiService } from "src/app/rest-api.service";
import {
  faEdit,
  faTrash,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { NgxSpinnerService } from "ngx-spinner";
import { CommonService } from "src/app/common.service";
import { NotifierService } from "angular-notifier";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-educator-list",
  templateUrl: "./educator-list.component.html",
  styleUrls: ["./educator-list.component.css"],
})
export class EducatorListComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  offset = 0;
  limit = 20;
  educatorsList: any = [];
  educatorid = "";
  searchText = '' as any

  isActive = 0;
  isPrevious: boolean = true;
  selectedVal: any = 20;
  public pageList: Array<any> = [
    { name: "10", value: "10" },
    { name: "15", value: "15" },
    { name: "20", value: "20" },
    { name: "30", value: "30" },
    { name: "50", value: "50" },
  ];
  propularArr: any = [
    { value: null, name: "Not Set" },
    { value: "0", name: "Not Set" },
    { value: "1", name: "True" }
  ]
  featuredArr: any = [
    { value: null, name: "Not Set" },
    { value: '0', name: "Not Set" },
    { value: "1", name: "True" }
  ]

  isapproved:boolean=false
  ishidden:boolean=false
  roleid:any = '';
  FILE_URL:any=''
  sortingFlag:boolean = false;
  headerArr:any = [
    {name : 'Educator Name' ,sortFlag: 0 , colname:'name' },
    {name : 'Email Address', sortFlag: 0 , colname:'email'},
    {name : 'Popular' ,sortFlag: 0, colname:'popular'},
    {name : 'Featured',sortFlag: 0 , colname:'featured'},
    {name : 'Hidden',sortFlag: 0, colname:'hidden' },
    {name : 'Approved' ,sortFlag: 0 ,colname:'approved'},
  ]
  previousBtnDesable: boolean = true;
  nextBtnDesable: boolean = false;

  @ViewChild("deleteModal") deleteModal: any;
  constructor(
    private router: Router,
    private restapi: RestApiService,
    private commonservice: CommonService,
    private notifierService: NotifierService,
    private modalService: NgbModal
  ) { this.FILE_URL = this.restapi.FILE_URL }

  ngOnInit(): void {
    this.getEducator();
    this.roleid = this.commonservice.getRoleId();
  }

  gotoDownloadlist(): any {
  }


  showAll(): any {
    this.isapproved = false
    this.ishidden = false
    this.getEducator()
  }


  gotoAwaitingApproved(): any {
    this.isapproved = true
    this.ishidden = false
    this.getEducator()
  }


  hidden(): any {
    this.isapproved = false
    this.ishidden = true
    this.getEducator();
  }


  getEducator(item:any = null): any {   
    let sortObj:any ={}
    if(item != null){
      if(item.sortFlag == 0){
        item.sortFlag = 1;
      } else{
        item.sortFlag =  item.sortFlag == 1 ? 2 : 1;
      }
      sortObj['column'] = item.colname;
      sortObj['type'] = item.sortFlag == 1 ?'asc' : 'desc';
    }     
    let obj = {
      offset: this.offset + "",
      limit: this.limit,
      searchText: this.searchText,
      isapproved: this.isapproved,
      ishidden:this.ishidden,
      sort:item ? sortObj : null 
    };
    this.commonservice.loaderStart();
    this.restapi.getEducator(obj).subscribe(
      (res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          if (res.response) {
            this.sortingFlag =!this.sortingFlag;
            if (res.response.length > 0) {
              this.educatorsList = res.response;
              this.nextBtnDesable = res.response.length < this.limit;
            } else {
              this.educatorsList=[]
              this.nextBtnDesable = true;
              this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
            }
          } else {
            this.nextBtnDesable = true;
          }
        } else {
          this.educatorsList = [];
        }
      },
      (err: any) => {
        this.notifierService.notify("error", err.error.message);
      }
    );
  }


  changePagelimit(event: any): any {
    this.offset = 0;
    this.limit = Number(event.target.value);
    const currentSortItem = this.headerArr.find((item: any) => item.sortFlag !== 0);
    if(currentSortItem) {
      currentSortItem.sortFlag = currentSortItem.sortFlag === 1 ? 2 : 1;
    }
    this.getEducator(currentSortItem);
  }


  previousPage(): any { 
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    const currentSortItem = this.headerArr.find((item: any) => item.sortFlag !== 0);
    if(currentSortItem) {
      currentSortItem.sortFlag = currentSortItem.sortFlag === 1 ? 2 : 1;
    }
    this.getEducator(currentSortItem);
    if (this.offset <= 0) {
      this.previousBtnDesable = true;
    }
  }
 


nextPage(): any {  
  this.previousBtnDesable = false;
  this.offset = this.offset + this.limit;
  const currentSortItem = this.headerArr.find((item: any) => item.sortFlag !== 0);
  if (currentSortItem) {
      currentSortItem.sortFlag = currentSortItem.sortFlag === 1 ? 2 : 1;
  }
  this.getEducator(currentSortItem);
}

  gotoAdd(): any {
    this.router.navigate(["admin/app/add-educator/0"]);
  }

  gotoEdit(obj: any): any {
    const id = obj.educatorid === null ? obj.userdetailsid : obj.educatorid;
    if(this.roleid == 1 || this.roleid == 3){
       this.router.navigate(["admin/app/add-educator/" + id]);
    } 
    else if(this.commonservice.getUserId() == obj.educatorid){
      this.router.navigate(["admin/app/add-educator/" + id]);
    }
    
  }

  deleteEducator(): any {
    let params = {
      userId: this.commonservice.getUserId(),
      educatorid: this.educatorid,
    };
    this.commonservice.loaderStart();
    this.restapi.deleteEducator(params).subscribe(
      (res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.notifierService.notify("success", res.message);
          this.closeModal();
          this.getEducator();
        } else {
          this.notifierService.notify("error", res.message);
        }
      },
      (err: any) => {
        this.commonservice.loaderEnd();
        this.notifierService.notify("error", err.error.message);
      }
    );
  }

  onClickDelete(id: any): any {
    this.educatorid = id;
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

  closeModal(): any {
    this.educatorid = "";
    this.modalService.dismissAll();
  }

  enableActive(e: any): any {
    const checked = e.target.checked == 0 ? 0 : 1;
    const checkedValue = e.target.value;
    var data = {
      educatorid: checkedValue,
      active: checked,
    };
    this.commonservice.loaderStart();
    this.restapi.enableActive(data).subscribe((res: any) => {
      this.commonservice.loaderEnd();
      if (res.success) {
        this.notifierService.notify("success", res.message);
        this.getEducator();
      } else {
        this.notifierService.notify("error", res.message);
      }
    });
  }

  approve(e: any): any {
    const checked = e.target.checked == 0 ? 0 : 1;
    const checkedValue = e.target.value;

    let params = {
      educatorid: checkedValue,
      approvedby: Number(this.commonservice.getUserId()),
      approved: checked,
    };
    this.commonservice.loaderStart();
    this.restapi.enableApprove(params).subscribe(
      (res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.getEducator();
          this.notifierService.notify("success", res.message);
        } else {
          this.notifierService.notify("error", res.message);
        }
      },
      (err: any) => {
        this.commonservice.loaderEnd();
        this.notifierService.notify("error", err.error.message);
      }
    );
  }



  search(): any {
    if (this.searchText.length % 3 === 0) {
      this.getEducator();
    }
    if (this.searchText.length == 0) {
      this.getEducator();
    }
  }

  downloadlistCsvfile(): any {
    const data = {
      "userid":this.commonservice.getUserId()
   }
    this.commonservice.loaderStart()
    this.restapi.downloadListAsCsv(data).subscribe((res: any) => {
      this.commonservice.loaderEnd()
      if (res.success) {
        window.open(this.FILE_URL + res.response, "_blank");
      } else {
        this.notifierService.notify('error', res.message)
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message)
    })
  }



 
}
