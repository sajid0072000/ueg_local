import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-levels',
  templateUrl: './add-levels.component.html',
  styleUrls: ['./add-levels.component.css']
})
export class AddLevelsComponent {
  @ViewChild("deleteModal") deleteModal: any;


  levelname: any = '';
  levelArr: any = [];
  levelId: any = '';
  score: any = '';
  categoryArr: any = [];
  categoryId: any = '';
  levelErr: any = '';
  parentcategoryname: any = '';
  spinner: boolean = false;
  levelNameErr: any = ''
  parentcategorynameErr: any = ''

  constructor(private commonservice: CommonService,
    private notifierService: NotifierService,
    private restapi: RestApiService,
    private modalService: NgbModal,
    private router: Router,
    private actroute: ActivatedRoute

  ) { }


  ngOnInit(): void {
    this.levelId = this.actroute.snapshot.params['id'];
    if (this.levelId == 0) {
      this.levelId = null
    }
    if (this.levelId) {
      let data = this.commonservice.sheardData
      if (!data) {
        this.router.navigate(["admin/app/qualification-levels"]);
      }
      this.levelname = data.Name;
      this.parentcategoryname = data.categoryname;
      this.categoryId = data.ParentCategory
    }
  }



  changeLevelFun(): any {
    this.levelNameErr = ''
  }

  add(): any {
    this.levelNameErr = ''
    this.parentcategorynameErr = ''

    let err = 0

    if (this.levelname == '' || this.levelname == null || this.levelname == undefined) {
      this.levelNameErr = 'Level Name Required';
      err++;
    }

    if (this.categoryId == '' || this.categoryId == null || this.categoryId == undefined) {
      this.parentcategorynameErr = 'Category name Required';
      err++;
    }

    if (err == 0) {

      const obj = {
        userId: this.commonservice.getUserId(),
        name: this.levelname,
        parentCategory: this.categoryId
      }
      this.commonservice.loaderStart();
      this.restapi.addQualificationLevel(obj).subscribe((res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.notifierService.notify("success", res.message);
          this.resetform();
        } else {
          this.notifierService.notify("error", res.message);
        }
      }, (err) => {
        this.notifierService.notify("error", err.error.message);
      }
      );

    }


  }

  edit(): any {
    this.levelNameErr = ''
    this.parentcategorynameErr = ''

    let err = 0

    if (this.levelname == '' || this.levelname == null || this.levelname == undefined) {
      this.levelNameErr = 'Level Name Required';
      err++;
    }

    if (this.categoryId == '' || this.categoryId == null || this.categoryId == undefined) {
      this.parentcategorynameErr = 'Category name Required';
      err++;
    }

    if (err == 0) {
      const obj = {
        userId: this.commonservice.getUserId(),
        name: this.levelname,
        parentCategory: this.categoryId,
        id: this.levelId
      }
      this.commonservice.loaderStart();
      this.restapi.updateQualificationLevel(obj).subscribe((res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetform();
        } else {
          this.notifierService.notify('error', res.message);
        }
      }, (err: any) => {
        this.notifierService.notify('error', err.error.message);
      })
    }
  }

  deleteQualificationLevel() {
    const obj = {
      userId: this.commonservice.getUserId(),
      id: this.levelId
    }
    this.commonservice.loaderStart();
    this.restapi.deleteQualificationLevel(obj).subscribe((res: any) => {
      this.commonservice.loaderEnd();
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.closeModal();
        this.resetform()
      } else {
        this.notifierService.notify('error', res.message);
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message);
    })
  }

  validationForm(): any {
    this.levelErr = '';
    if (this.levelname == '' || this.levelname == null || this.levelname == undefined) {
      this.levelErr = '*Level Name Required';
      return false;
    }
    return true;
  }

  resetform():any {
    this.levelname = '';
    this.parentcategoryname = '';
    this.levelErr = '';
    this.router.navigate(["admin/app/qualification-levels"]);
  }

  onClickDelete(): any {
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

  closeModal(): any {
    this.modalService.dismissAll();
  }

  searchCategoryName() {
    this.parentcategorynameErr = ''
    const obj = {
      searchText: this.parentcategoryname,
      categoryTypeId: ""
    }
    this.spinner = true;
    this.restapi.getCategories(obj).subscribe((res: any) => {
      this.spinner = false;
      if (res.success) {
        this.categoryArr = res.response;
      }
      else {
        this.categoryArr = []
        this.spinner = false
      }
    }, (err: any) => {
      this.notifierService.notify('err', err.error.message)
    })

  }
  getparentCategoryIdByName() {
    for (let data of this.categoryArr) {
      if (data.name === this.parentcategoryname) {
        this.categoryId = data.categoriesid;
        break;
      }
    }
  }

  goBack() {
    this.router.navigate(["admin/app/qualification-levels"]);
  }

}
