import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-categories-list',
  templateUrl: './add-categories-list.component.html',
  styleUrls: ['./add-categories-list.component.css']
})
export class AddCategoriesListComponent {
  @ViewChild("deleteModal") deleteModal: any;

  categoryId: any = ''
  categoryNameErr: any = "";
  parentCategoryNameErr: any = "";
  parentcategoryTypeErr: any = "";
  descErr: any = "";

  categoryName = "" as any;
  categoryArr: any = [];

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


  constructor(
    private router: Router,
    private restapi: RestApiService,
    private actroute: ActivatedRoute,
    private notifierService: NotifierService,
    private common: CommonService,
    private modalService: NgbModal,

  ) { }


  ngOnInit(): void {
    this.categoryId = this.actroute.snapshot.params['id'];
    if (this.categoryId == 0) {
      this.categoryId = null
    }
    if (this.categoryId) {
      let data = this.common.sheardData
      if(!data){
        this.router.navigate(["admin/app/categories"]);
      }
      this.categoryId = data.categoriesId;
      this.categoryName = data.name
      this.description = data.description
      this.parentcategoryId = data.parentCategoryId
      this.categoryTypeId = data.categoryTypeId
      this.parentcategoryname = data.parentCategoryName
      this.categoryType = data.categoryTypeName
    }
  }

  changeCategoryName(): any {
    this.categoryNameErr = "";
  }

  changeCategoryDescription(): any {
    this.descErr = "";
  }

  searchCategoryName() {
    this.parentCategoryNameErr = "";
    const obj = {
      searchText: this.parentcategoryname,
      categoryTypeId: this.categoryTypeId
    };
    this.spinner = true;
    this.restapi.getCategories(obj).subscribe(
      (res: any) => {
        this.spinner = false;
        if (res.success) {
          this.categoryArr = res.response;
        } else {
          this.categoryArr = [];
          this.spinner = false;
        }
      },
      (err: any) => {
        this.notifierService.notify("err", err.error.message);
      }
    );
  }
  getparentCategoryIdByName() {
    for (let data of this.categoryArr) {
      if (data.name === this.parentcategoryname) {
        this.parentcategoryId = data.categoriesid;
        break;
      }
    }
  }

  searchCategoryTypeName() {
    this.parentcategoryTypeErr = "";
    const obj = {
      searchText: this.categoryType,
    };
    this.spinnerType = true;
    this.restapi.getCategoryType(obj).subscribe(
      (res: any) => {
        this.spinnerType = false;
        if (res.success) {
          this.categoryTypeArr = res.response;
        } else {
          this.categoryTypeArr = [];
          this.spinnerType = false;
        }
      },
      (err: any) => {
        this.notifierService.notify("err", err.error.message);
      }
    );
  }
  getCategoryTypeIdByName() {
    for (let data of this.categoryTypeArr) {
      if (data.name === this.categoryType) {
        this.categoryTypeId = data.categorytypeid;
        break;
      }
    }
  }


  onClickDelete(): any {
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

  deleteCategory(): any {
    const obj = {
      userId: this.common.getUserId(),
      id: this.categoryId,
    };
    this.common.loaderStart();
    this.restapi.deleteCategories(obj).subscribe(
      (res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify("success", res.message);
          this.closeModal()
          this.router.navigate(['admin/app/categories'])
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

  add(): any {

    this.categoryNameErr = "";
    this.descErr = "";
    this.parentCategoryNameErr = "";
    this.parentcategoryTypeErr = "";

    let err = 0

    if (
      this.categoryName == "" ||
      this.categoryName == null ||
      this.categoryName == undefined
    ) {
      this.categoryNameErr = "Category name required";
      err++;
    }
    if (
      this.description == "" ||
      this.description == null ||
      this.description == undefined
    ) {
      this.descErr = "Description required";
      err++;
    }
    if (
      this.parentcategoryId == "" ||
      this.parentcategoryId == null ||
      this.parentcategoryId == undefined
    ) {
      this.parentCategoryNameErr = "Parent category name required";
      err++;
    }

    if (
      this.categoryTypeId == "" ||
      this.categoryTypeId == null ||
      this.categoryTypeId == undefined
    ) {
      this.parentcategoryTypeErr = "Parent category type required";
      err++;
    }


    if (err == 0) {

      const obj = {
        userId: this.common.getUserId(),
        name: this.categoryName,
        desc: this.description,
        parentCategoryId: this.parentcategoryId,
        categoryTypeId: this.categoryTypeId,
      };
      this.common.loaderStart();
      this.restapi.addCategories(obj).subscribe(
        (res: any) => {
          this.common.loaderEnd();
          if (res.success) {
            this.resetForm();

            this.notifierService.notify("success", res.message);
            this.router.navigate(['admin/app/categories'])

          } else {
            this.notifierService.notify("error", res.message);
          }
        },
        (err) => {
          this.notifierService.notify("error", err.error.message);
        }
      );


    }

  }
  edit(): any {
    this.categoryNameErr = "";
    this.descErr = "";
    this.parentCategoryNameErr = "";
    this.parentcategoryTypeErr = "";

    let err = 0

    if (
      this.categoryName == "" ||
      this.categoryName == null ||
      this.categoryName == undefined
    ) {
      this.categoryNameErr = "Category name required";
      err++;
    }
    if (
      this.description == "" ||
      this.description == null ||
      this.description == undefined
    ) {
      this.descErr = "Description required";
      err++;
    }
    if (
      this.parentcategoryId == "" ||
      this.parentcategoryId == null ||
      this.parentcategoryId == undefined
    ) {
      this.parentCategoryNameErr = "Parent category name required";
      err++;
    }

    if (
      this.categoryTypeId == "" ||
      this.categoryTypeId == null ||
      this.categoryTypeId == undefined
    ) {
      this.parentcategoryTypeErr = "Parent category type required";
      err++;
    }


    if (err == 0) {
      const obj = {
        userId: this.common.getUserId(),
        name: this.categoryName,
        desc: this.description,
        parentCategoryId: this.parentcategoryId,
        categoryTypeId: this.categoryTypeId,
        id: this.categoryId,
      };
      this.common.loaderStart();
      this.restapi.updateCategories(obj).subscribe(
        (res: any) => {
          this.common.loaderEnd();
          if (res.success) {
            this.resetForm();
            this.notifierService.notify("success", res.message);
            this.router.navigate(['admin/app/categories'])

          } else {
            this.notifierService.notify("error", res.message);
          }
        },
        (err: any) => {
          this.notifierService.notify("error", err.error.message);
        }
      );
    }
  }


  resetForm() {
    this.categoryNameErr = "";
    this.parentcategoryname = "";
    this.categoryType = "";
    (this.categoryNameErr = ""), (this.descErr = "");
    this.parentCategoryNameErr = "";
    this.parentcategoryTypeErr = "";
    this.router.navigate(['admin/app/categories'])
  }
  goBack(): any {
    this.router.navigate(['admin/app/categories'])
  }

}
