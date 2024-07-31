import { Component, OnInit, ViewChild } from "@angular/core";

import { CommonService } from "src/app/common.service";
import { NotifierService } from "angular-notifier";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RestApiService } from "src/app/rest-api.service";
import { Router } from "@angular/router";
import { NgOption } from "@ng-select/ng-select";


@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  // 
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
  userid = "" as any;
  courseid = "" as any;
  lessionid = "" as any;
  unittitle = "" as any;
  description = "" as any;
  videourl = "" as any;
  FILE_URL = "" as any;
  FILE_ROOT = this.restapi.FILE_URL;
  offset = 0;
  limit = 20;
  unitid: any = "";
  selectedVal: any = 20;
  subjectErr: any = "";
  parentErr: any = "";
  categoryErr: any = "";

  public pageList: Array<any> = [
    { name: "10", value: "10" },
    { name: "15", value: "15" },
    { name: "20", value: "20" },
    { name: "30", value: "30" },
    { name: "50", value: "50" },
  ];
  @ViewChild("deleteModal") deleteModal: any;
  @ViewChild("addmodal") addmodal: any

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
    this.getSubjectData();
  }

  goToPreview():any{

  }


  gotoAdd(): any {
    this.router.navigate(['admin/app/add-subject/0'])
  }

  gotoEdit(data: any): any {
    this.commonservice.sheardData = data
    this.router.navigate(['admin/app/add-subject/'+data.Id])
  }

  closeAddModal() {
    this.modalService.dismissAll();
  }

  getSubjectData(): any {
    const obj = {
      offset: this.offset,
      limit: this.limit,
      searchText:this.searchText
    }
    this.commonservice.loaderStart();
    this.restapi.fetchSubject(obj).subscribe((res: any) => {
      this.commonservice.loaderEnd();
      if (res.success) {
        if(res.response) {
          if (res.response.length > 0) {
            this.subjectList = res.response;
            this.nextBtnDesable = res.response.length < this.limit;
          } else {
            this.nextBtnDesable = true;
            this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          }
        } else {
          this.nextBtnDesable = true;
        }
      } else {
        this.subjectList = [];
      }
    }, (err: any) => {
    })


  }



  changePagelimit(event: any): any {
    this.offset = 0;
    this.limit = Number(event.target.value);
    this.getSubjectData();
  }

  nextPage(): any {
    this.previousBtnDesable = false;
    this.offset = this.offset + this.limit;
    this.getSubjectData();
  }
  previousPage(): any {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getSubjectData();
    if (this.offset <= 0) {
      this.previousBtnDesable = true;
    }
  }

  search(): any {
    if (this.searchText.length % 3 === 0) {
      this.getSubjectData();
    }
    if (this.searchText.length == 0) {
      this.getSubjectData();
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
          this.getSubjectData()
        } else {
          this.notifierService.notify("error", res.message);
        }
      },
      (err: any) => {
        this.notifierService.notify("error", err.error.message);
      }
    );
  }

  onClickDelete(id:any): any {
    this.subjectId=id
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }


  closeModal(): any {
    this.modalService.dismissAll();

  }

}
