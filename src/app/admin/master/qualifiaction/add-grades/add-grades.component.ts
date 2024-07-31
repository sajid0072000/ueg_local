import { Component, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { CommonService } from "src/app/common.service";
import { RestApiService } from "src/app/rest-api.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-grades',
  templateUrl: './add-grades.component.html',
  styleUrls: ['./add-grades.component.css']
})
export class AddGradesComponent {
  @ViewChild("deleteModal") deleteModal: any;


  gradeId: any = "";
  gradename: any = "";
  gradeArr: any = [];
  score: any = "";
  gradePoint: any = "";
  categoryArr: any = [];
  categoryId: any = "";
  parentArr: any = [];
  parentcategoryname: any = "";
  searchText: any = "";
  offset = 0;
  limit = 20;
  isActive = 0;
  isPrevious: boolean = true;
  selectedVal: any = 20;

  spinner: boolean = false;
  gradeNameErr: any = '';
  scoreErr: any = '';
  gradePointErr: any = '';

  constructor(
    private commonservice: CommonService,
    private notifierService: NotifierService,
    private restapi: RestApiService,
    private modalService: NgbModal,
    private router:Router,
    private actroute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.gradeId = this.actroute.snapshot.params['id'];
    if (this.gradeId == 0) {
      this.gradeId = null
    }
    if (this.gradeId) {
      let data = this.commonservice.sheardData
      if (!data) {
        this.router.navigate(["admin/app/qualification-grade"]);
      }
      this.gradename = data.Name;
      this.score = data.Score;
      this.gradePoint = data.ParentCategory;
    }
  }



  changeGradeFun(): any {
    this.gradeNameErr = '';
  }

  changeScoreFun(): any {
    this.scoreErr = '';
  }

  changePoinFun(): any {
    this.gradePointErr = '';
  }


  add(): any {
    this.gradeNameErr = '';
    this.scoreErr = '';
    this.gradePointErr = ''

    let err = 0

    if (this.gradename == '' || this.gradename == null || this.gradename == undefined) {
      this.gradeNameErr = 'Grade name required';
      err++
    }
    if (this.score == '' || this.score == null || this.score == undefined) {
      this.scoreErr = 'Score required';
      err++
    }
    if (this.gradePoint == '' || this.gradePoint == null || this.gradePoint == undefined) {
      this.gradePointErr = 'Parent category  required';
      err++;
    }


    if (err == 0) {

      const obj = {
        userId: this.commonservice.getUserId(),
        name: this.gradename,
        score: this.score,
        parentCategory: this.gradePoint,
      };
      this.commonservice.loaderStart();
      this.restapi.addQualificationGrade(obj).subscribe((res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.notifierService.notify("success", res.message);
          this.resetForm();
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
    this.gradeNameErr = '';
    this.scoreErr = '';
    this.gradePointErr = ''

    let err = 0

    if (this.gradename == '' || this.gradename == null || this.gradename == undefined) {
      this.gradeNameErr = 'Grade name required';
      err++
    }
    if (this.score == '' || this.score == null || this.score == undefined) {
      this.scoreErr = 'Score required';
      err++
    }
    if (this.gradePoint == '' || this.gradePoint == null || this.gradePoint == undefined) {
      this.gradePointErr = 'Point  required';
      err++;
    }


    if (err == 0) {
      const obj = {

        "userId": this.commonservice.getUserId(),
        "name": this.gradename,
        "score": this.score,
        "parentCategory": this.gradePoint,
        "id": this.gradeId
      }

      this.commonservice.loaderStart();
      this.restapi.updateQualificationGrade(obj).subscribe((res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm();
        } else {
          this.notifierService.notify('error', res.message);
        }
      }, (err: any) => {
        this.notifierService.notify('error', err.error.message);
      })
    }
  }

  closeAddModal() {
    this.resetForm();
    this.modalService.dismissAll();
  }

  deleteGrade() {
    const obj = {
      userId: this.commonservice.getUserId(),
      id: this.gradeId
    };
    this.commonservice.loaderStart();
    this.restapi.deleteQualificationGrade(obj).subscribe((res: any) => {
      this.commonservice.loaderEnd();
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.resetForm()
        this.closeModal()
      } else {
        this.notifierService.notify('error', res.message);
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message);
    })

  }
  onClickDelete(): any {
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

  closeModal(): any {
    this.modalService.dismissAll();
  }
  resetForm() {
    this.gradename = '';
    this.score = '';
    this.gradePoint = '';
    this.gradeNameErr = '';
    this.scoreErr = '';
    this.gradePointErr = ''
    this.router.navigate(["admin/app/qualification-grade"]);
  }

  goBack() {
    this.router.navigate(["admin/app/qualification-grade"]);
  }
}
