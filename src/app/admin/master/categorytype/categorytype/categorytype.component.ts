import { Component, OnInit, ViewChild } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { RestApiService } from "src/app/rest-api.service";
import { CommonService } from "src/app/common.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { faL } from "@fortawesome/free-solid-svg-icons";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from "@angular/router";


@Component({
  selector: "app-categorytype",
  templateUrl: "./categorytype.component.html",
  styleUrls: ["./categorytype.component.css"],
})
export class CategorytypeComponent {

  categorytype: any = "";
  categorytypeList: any = [];
  categoryTypeId: any = "";
  hidecategory: boolean = false;
  isHidden: any = "";
  categorytypeId: any = "";
  searchText: any = "";
  offset = 0;
  limit = 20;
  isActive = 0;
  isPrevious: boolean = true;

  previousBtnDesable: boolean = true;
  nextBtnDesable: boolean = false;

  selectedVal: any = 20;
  public pageList: Array<any> = [
    { name: "10", value: "10" },
    { name: "15", value: "15" },
    { name: "20", value: "20" },
    { name: "30", value: "30" },
    { name: "50", value: "50" },
  ];

  bannerImage: any = ''
  FILE_URL = '' as any;
  fullScreenImg = '' as any;
  description: any = ''


  categorytypeErr: any = '';
  categoryBannerErr: any = '';
  categoryDescriptionErr: any = '';



  @ViewChild("deleteModal") deleteModal: any;
  @ViewChild("addmodal") addmodal: any;
  constructor(
    private commonservice: CommonService,
    private notifierService: NotifierService,
    private restapi: RestApiService,
    private modalService: NgbModal,
    private router: Router
  ) { this.FILE_URL = this.restapi.FILE_URL; }

  ngOnInit(): void {
    this.getcategoryType();
  }

  goToPreview(): any {

  }

 

  imagePopUp(): any {
    this.fullScreenImg = this.FILE_URL + this.bannerImage;
    this.toggleFullScreenImg(1);
  }

  toggleFullScreenImg(flag: number): any {
    const elem = document.getElementById('fulldiv');
    if (elem) {
      elem.style.display = flag === 0 ? 'none' : 'block';
    }
  }



  gotoAdd() {
    this.router.navigate(['admin/app/add-categorytype/0'])
  }

  gotoEdit(data: any) {
    this.commonservice.sheardData = data
    this.router.navigate(['admin/app/add-categorytype/'+data.categoryTypeId])
  }

  getcategoryType() {
    const obj = {
      offset:this.offset,
      limit:this.limit
    };
    this.commonservice.loaderStart();
    this.restapi.fetchCategoryType(obj).subscribe(
      (res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          if(res.response) {
            if (res.response.length > 0) {
              this.categorytypeList = res.response;
              this.nextBtnDesable = res.response.length < this.limit;
            } else {
              this.nextBtnDesable = true;
              this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
            }
          } else {
            this.nextBtnDesable = true;
          }
        } else {
          this.categorytypeList = [];
        }
      }, (err: any) => { }
    );
  }

  

  closeAddModal() {
    this.modalService.dismissAll();
  }

  
  closeModal(): any {
    this.modalService.dismissAll();
  }

  enableActive(e: any): any {
    const checked = e.target.checked == 0 ? 0 : 1;
    const checkedValue = e.target.value;
    const data = {
      categoryTypeId: checkedValue,
      Hidden: checked + "",
    };

    this.commonservice.loaderStart();
    this.restapi.updateHidden(data).subscribe((res: any) => {
      this.commonservice.loaderEnd();
      if (res.success) {
        this.notifierService.notify("success", res.message);
        this.getcategoryType();
      } else {
        this.notifierService.notify("error", res.message);
      }
    });
  }

  changePagelimit(event: any): any {
    this.offset = 0;
    this.limit = Number(event.target.value);
    this.getcategoryType();
  }

  previousPage(): any {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getcategoryType();
    if (this.offset <= 0) {
      this.previousBtnDesable = true;
    }
  }

  nextPage(): any {
    this.previousBtnDesable = false;
    this.offset = this.offset + this.limit;
    this.getcategoryType();
  }

  

  search(): any {
    if (this.searchText.length >= 3) {
      this.getcategoryType();
    }
    if (this.searchText.length == 0) {
      this.getcategoryType();
    }
  }

  deleteCategorytype() {
    const obj = {
      userId: this.commonservice.getUserId(),
      categoryTypeId: this.categoryTypeId
    };
    this.commonservice.loaderStart();
    this.restapi.deleteCategoryType(obj).subscribe((res: any) => {
      this.commonservice.loaderEnd();
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.closeModal()
        this.getcategoryType()
      } else {
        this.notifierService.notify('error', res.message);
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message);
    })
  }
  onClickDelete(id:any): any {
    this.categoryTypeId = id;
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

}
