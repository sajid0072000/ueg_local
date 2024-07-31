import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { CommonService } from "src/app/common.service";
import { RestApiService } from "src/app/rest-api.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-qualificationsubject',
  templateUrl: './add-qualificationsubject.component.html',
  styleUrls: ['./add-qualificationsubject.component.css']
})
export class AddQualificationsubjectComponent {
  @ViewChild("deleteModal") deleteModal: any;


  subjectId: any = '';
  subjectname: any = "";
  subjectArr: any = [];
  subjectErr: any = '';

  constructor(
    private commonservice: CommonService,
    private notifierService: NotifierService,
    private restapi: RestApiService,
    private modalService: NgbModal,
    private router:Router,
    private actroute:ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.subjectId = this.actroute.snapshot.params['id'];
    if (this.subjectId == 0) {
      this.subjectId = null
    }
    if (this.subjectId) {
      let data = this.commonservice.sheardData
      if(!data){
        this.router.navigate(["admin/app/qualification-subject"]);
      }
      this.subjectname = data.Name;
    }
  }




  changeSubjectFun():any{
    this.subjectErr = '';
  }

  add(): any {
    this.subjectErr = '';

    let err = 0

    if (this.subjectname == '' || this.subjectname == null || this.subjectname == undefined) {
      this.subjectErr = 'Subject Name Required';
      err++
    }

    if (err == 0) {
      const obj = {
        name: this.subjectname
      }
      this.commonservice.loaderStart();
      this.restapi.addQualificationSubject(obj).subscribe((res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.notifierService.notify("success", res.message);
          this.resetform();
        } else {
          this.notifierService.notify("error", res.message);
        }
      },
        (err: any) => {
          this.notifierService.notify("error", err.error.message);
        })
    }


  }
  edit(): any {
    this.subjectErr = '';

    let err = 0

    if (this.subjectname == '' || this.subjectname == null || this.subjectname == undefined) {
      this.subjectErr = 'Subject Name Required';
      err++
    }

    if (err == 0) {
      const obj = {
        name: this.subjectname,
        id: this.subjectId
      }
      this.commonservice.loaderStart();
      this.restapi.updateQaulificationSubject(obj).subscribe((res: any) => {
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

  goBack() {
        this.router.navigate(["admin/app/qualification-subject"]);
    }

  resetform() {
    this.subjectname = '';
    this.subjectErr = '';
    this.router.navigate(["admin/app/qualification-subject"]);
  }

  validationForm(): any {
    this.subjectErr = '';
    if (this.subjectname == '' || this.subjectname == null || this.subjectname == undefined) {
      this.subjectErr = '*Subject Name Required';
      return false;
    }
    return true;
  }

  closeAddModal() {
    this.resetform();
    this.modalService.dismissAll();
  }

  deleteSubject() {
    const obj = {
      id: this.subjectId
    };

    this.commonservice.loaderStart();
    this.restapi.deleteQualificationSubject(obj).subscribe((res: any) => {
      this.commonservice.loaderEnd();
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.closeModal();
        this.router.navigate(["admin/app/qualification-subject"]);
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




}
