import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { CommonService } from "src/app/common.service";
import { RestApiService } from "src/app/rest-api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-qualificationsubject",
  templateUrl: "./qualificationsubject.component.html",
  styleUrls: ["./qualificationsubject.component.css"],
})
export class QualificationsubjectComponent implements OnInit {
  subjectId: any = '';
  subjectname: any = "";
  subjectArr: any = [];
  subjectErr: any = '';
  searchText: any = "";
  offset = 0;
  limit = 20;
  isActive = 0;
  isPrevious: boolean = true;
  selectedVal: any = 20;

  previousBtnDesable: boolean = true;
  nextBtnDesable: boolean = false;
  public pageList: Array<any> = [
    { name: "10", value: "10" },
    { name: "15", value: "15" },
    { name: "20", value: "20" },
    { name: "30", value: "30" },
    { name: "50", value: "50" },
  ];

  @ViewChild("deleteModal") deleteModal: any;
  @ViewChild("addmodal") addmodal: any;

  constructor(
    private commonservice: CommonService,
    private notifierService: NotifierService,
    private restapi: RestApiService,
    private modalService: NgbModal,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.getQualificationSubject();
  }

  gotoAdd() {
    this.router.navigate(["admin/app/add-qualification-subject/0"]);
  }

  gotoEdit(data: any) {
    this.commonservice.sheardData = data
    this.router.navigate(["admin/app/add-qualification-subject/"+data.Id]);
  }

  getQualificationSubject() {
    const obj = {
      offset: this.offset,
      limit: this.limit,
      searchText:this.searchText
    };
    this.commonservice.loaderStart();
    this.restapi.fetchQualificationSubject(obj).subscribe((res: any) => {
      this.commonservice.loaderEnd();
      console.log(res.response)
      if (res.success) {
        if(res.response) {
          if (res.response.length > 0) {
            this.subjectArr = res.response;
            this.nextBtnDesable = res.response.length < this.limit;
          } else {
            this.nextBtnDesable = true;
            this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          }
        } else {
          this.nextBtnDesable = true;
        }
      } else {
        this.subjectArr = [];
      }
    }, (err: any) => {

    })
  }





  changePagelimit(event: any): any {
    this.offset = 0;
    this.limit = Number(event.target.value);
    this.getQualificationSubject();
    this.getQualificationSubject();
  }

  nextPage(): any {
    this.previousBtnDesable = false;
    this.offset = this.offset + this.limit;
    this.getQualificationSubject();
  }
  previousPage(): any {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getQualificationSubject();
    if (this.offset <= 0) {
      this.previousBtnDesable = true;
    }
  }

  search(): any {
    if (this.searchText.length % 3 === 0) {
      this.getQualificationSubject();
    }
    if (this.searchText.length == 0) {
      this.getQualificationSubject();
    }
  }

  goToPreview(): any {

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
        this.getQualificationSubject()
      } else {
        this.notifierService.notify('error', res.message);
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message);
    })
  }

  onClickDelete(id:any): any {
    this.subjectId = id
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

  closeModal(): any {
    this.modalService.dismissAll();
  }
}
