import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonService } from "src/app/common.service";
import { NotifierService } from "angular-notifier";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RestApiService } from "src/app/rest-api.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgOption } from "@ng-select/ng-select";

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html',
  styleUrls: ['./add-subjects.component.css']
})
export class AddSubjectsComponent {
  @ViewChild("deleteModal") deleteModal: any;

  subjectId: any = '';
  parentId = "" as any;
  parentname: any = '';
  subjectName = "" as any;
  categoryId = "" as any;
  subjectList: any = [];
  parentSubjectArr: any = [];
  parentcategoryname: any;
  categoryArr: any = [];
  upDatebtnFlag: boolean = false;
  //
  index = 0
  categorySpinner: boolean = false
  spinner: boolean = false;
  description = "" as any;
  videourl = "" as any;
  FILE_URL = "" as any;
  unitid: any = "";
  selectedVal: any = 20;
  subjectErr: any = "";
  parentErr: any = "";
  categoryErr: any = "";

  constructor(
    private router: Router,
    private restapi: RestApiService,
    private commonservice: CommonService,
    private notifierService: NotifierService,
    private modalService: NgbModal,
    private actroute: ActivatedRoute
  ) {
    this.FILE_URL = this.restapi.FILE_URL;
  }


  ngOnInit(): void {
    this.subjectId = this.actroute.snapshot.params['id'];
    if (this.subjectId == 0) {
      this.subjectId = null
    }
    if (this.subjectId) {
      let data = this.commonservice.sheardData
      if (!data) {
        this.router.navigate(["admin/app/subjectlist"]);
      }
      this.subjectName = data.Name;
      this.parentname = data.parentName;
      this.parentcategoryname = data.categoryName;
      this.parentId = data.ParentId;
      this.categoryId = data.CategoryId;
    }
  }




  changeSubjectNameFun(): any {
    this.subjectErr = "";
  }

  goBack() {
    this.router.navigate(["admin/app/subjectlist"]);
  }

  add(): any {

    this.subjectErr = "";
    this.parentErr = "";
    this.categoryErr = "";

    let err = 0


    if (this.subjectName == "" || this.subjectName == null) {
      this.subjectErr = "Subject name required";
      err++;
    }
    if (this.parentname == "" || this.parentname == null) {
      this.parentErr = "Parent subject name required";
      err++;
    }
    if (this.parentcategoryname == "" || this.parentcategoryname == null) {
      this.categoryErr = "Parent category  name required";
      err++;
    }

    if (err == 0) {

      const obj = {
        name: this.subjectName,
        parentId: this.parentId,
        categoryId: this.categoryId,
      }

      this.commonservice.loaderStart();
      this.restapi.insertSubject(obj).subscribe((res: any) => {
        this.commonservice.loaderEnd()
        if (res.success) {
          this.resetForm();
          this.notifierService.notify("success", res.message);
          this.router.navigate(["admin/app/subjectlist"]);

        } else {
          this.notifierService.notify("error", res.message);
        }
      }, (err: any) => {
        this.notifierService.notify("error", err.error.message);
      })

    }
  }


  edit(): any {
    this.subjectErr = "";
    this.parentErr = "";
    this.categoryErr = "";

    let err = 0


    if (this.subjectName == "" || this.subjectName == null) {
      this.subjectErr = "Subject name required";
      err++;
    }
    if (this.parentname == "" || this.parentname == null) {
      this.parentErr = "Parent subject name required";
      err++;
    }
    if (this.parentcategoryname == "" || this.parentcategoryname == null) {
      this.categoryErr = "Category type name required";
      err++;
    }

    if (err == 0) {
      const obj = {
        id: this.subjectId,
        name: this.subjectName,
        parentId: this.parentId,
        categoryId: this.categoryId,
      }
      this.commonservice.loaderStart();
      this.restapi.updateSubject(obj).subscribe((res: any) => {
        this.commonservice.loaderEnd()
        if (res.success) {
          this.resetForm();
          this.notifierService.notify("success", res.message);
          this.router.navigate(["admin/app/subjectlist"]);

        } else {
          this.notifierService.notify("error", res.message);
        }
      }, (err: any) => {
        this.notifierService.notify("error", err.error.message);
      })
    }
  }




  deleteSubject(): any {
    const obj = {
      id: this.subjectId,
    };
    this.commonservice.loaderStart();
    this.restapi.deleteSubject(obj).subscribe(
      (res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.notifierService.notify("success", res.message);
          this.closeModal()
          this.router.navigate(["admin/app/subjectlist"]);
        } else {
          this.notifierService.notify("error", res.message);
        }
      },
      (err: any) => {
        this.notifierService.notify("error", err.error.message);
      }
    );
  }

  resetForm(): any {
    this.subjectName = "";
    this.parentId = "";
    this.categoryId = "";
    this.parentname = "";
    this.parentcategoryname = "";
    this.subjectErr = "";
    this.parentErr = "";
    this.categoryErr = "";
    this.router.navigate(["admin/app/subjectlist"]);

  }







  onClickDelete(): any {
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

  closeModal(): any {
    this.modalService.dismissAll();

  }



  // subject

  searchparentSubjectName() {
    this.parentErr = "";
    const obj = {
      searchText: this.parentname
    }
    this.spinner = true;
    this.restapi.getSubjects(obj).subscribe((res: any) => {
      this.spinner = false;
      if (res.success) {
        this.parentSubjectArr = res.response
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message);
    })
  }



  getparentSubjectId() {
    for (let obj of this.parentSubjectArr) {
      if (obj.name === this.parentname) {
        this.parentId = obj.id;
        break;
      }
    }
  }

  searchCategoryName() {
    this.categoryErr = "";
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


}
