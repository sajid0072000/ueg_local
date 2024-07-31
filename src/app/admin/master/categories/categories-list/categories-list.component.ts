import { Component, OnInit, ViewChild } from "@angular/core";

import { CommonService } from "src/app/common.service";
import { NotifierService } from "angular-notifier";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RestApiService } from "src/app/rest-api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.css"],
})
export class CategoriesListComponent implements OnInit {
  categoryName = "" as any;
  categoryArr: any = [];
  categoryId: any = "";

  categoryList: any = [];
  description: any = "";
  parentcategoryname: any = "";
  parentcategoryId: any = "";
  categoryType = "" as any;
  categoryTypeArr: any = [];
  categoryTypeId: any = "";

  //

  spinner: boolean = false;
  spinnerType: boolean = false;
  userid = "" as any;
  // courseid = "" as any;
  // lessionid = "" as any;
  // unittitle = "" as any;
  // description = "" as any;
  // videourl = "" as any;
  FILE_URL = "" as any;
  FILE_ROOT = this.restapi.FILE_URL;
  offset = 0;
  limit = 20;
  unitid: any = "";
  isPrevious: boolean = true;
  selectedVal: any = 10;

  categoryNameErr: any = "";
  parentCategoryNameErr: any = "";
  parentcategoryTypeErr: any = "";
  descErr: any = "";

  public pageList: Array<any> = [
    { name: "10", value: "10" },
    { name: "15", value: "15" },
    { name: "20", value: "20" },
    { name: "30", value: "30" },
    { name: "50", value: "50" },
  ];
  @ViewChild("deleteModal") deleteModal: any;
  @ViewChild("addmodal") addmodal: any;

  searchText = "" as any;

  previousBtnDesable: boolean = true;
  nextBtnDesable: boolean = false;
  constructor(
    private router: Router,
    private restapi: RestApiService,
    private commonservice: CommonService,
    private notifierService: NotifierService,
    private modalService: NgbModal
  ) {
    this.FILE_URL = this.restapi.FILE_URL;
  }

  ngOnInit(): void {
    this.getCategoryData();
  }

  gotoAdd(): any {
    this.router.navigate(['admin/app/add-categories/0'])
  }

  onClickDelete(id:any): any {
    this.categoryId = id
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

  deleteCategory(): any {
    const obj = {
      userId: this.commonservice.getUserId(),
      id: this.categoryId,
    };
    this.commonservice.loaderStart();
    this.restapi.deleteCategories(obj).subscribe(
      (res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.notifierService.notify("success", res.message);
          this.closeModal()
          this.getCategoryData()
        } else {
          this.notifierService.notify("error", res.message);
        }
      },
      (err: any) => {
        this.notifierService.notify("error", err.message);
      }
    );
  }

  closeModal(): any {
    this.modalService.dismissAll();
  }

  gotoEdit(data: any): any {
    this.commonservice.sheardData = data
    this.router.navigate(['admin/app/add-categories/'+data.categoriesId])
  }

  closeAddModal() {
    this.modalService.dismissAll();
  }

  getCategoryData(): any {
    const obj = {
      userId: this.commonservice.getUserId(),
      offSet: this.offset,
      limit: this.limit,
      parentCategoryId: "",
      categoryTypeId: "",
      searchText:this.searchText
    };
    this.commonservice.loaderStart();
    this.restapi.fetchCategories(obj).subscribe(
      (res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          if(res.response) {
            if (res.response.length > 0) {
              this.categoryList = res.response;
              this.nextBtnDesable = res.response.length < this.limit;
            } else {
              this.nextBtnDesable = true;
              this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
            }
          } else {
            this.nextBtnDesable = true;
          }
        } else {
          this.categoryList = [];
        }
      },
      (err: any) => { }
    );
  }

  


  

 

  


  changePagelimit(event: any): any {
    this.offset = 0;
    this.limit = Number(event.target.value);
    this.getCategoryData();
  }

  nextPage(): any {
    this.previousBtnDesable = false;
    this.offset = this.offset + this.limit;
    this.getCategoryData();
  }
  previousPage(): any {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getCategoryData();
    if (this.offset <= 0) {
      this.previousBtnDesable = true;
    }
  }

  search(): any {
    if (this.searchText.length % 3 === 0) {
      this.getCategoryData();
    }
    if (this.searchText.length == 0) {
      this.getCategoryData();
    }
  }

  goToPreview(): any {

  }
}
