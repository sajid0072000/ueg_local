import { Component, OnInit, ViewChild } from "@angular/core";

import { CommonService } from "src/app/common.service";
import { NotifierService } from "angular-notifier";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RestApiService } from "src/app/rest-api.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-institue-list',
  templateUrl: './institue-list.component.html',
  styleUrls: ['./institue-list.component.css']
})
export class InstitueListComponent implements OnInit {
  name = "" as any;
  institueList = "" as any
  institueId = "" as any




  offset = 0;
  limit = 20;
  unitid: any = "";
  selectedVal: any = 10;
  instituetErr = "" as any


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
  previousBtnDesable: boolean = false;
  nextBtnDesable: boolean = false;
  constructor(
    private router: Router,
    private restapi: RestApiService,
    private commonservice: CommonService,
    private notifierService: NotifierService,
    private modalService: NgbModal

  ) {

  }

  ngOnInit(): void {
    this.getInstitueData();
  }

  goToPreview(): any {

  }



  gotoAdd(): any {
    this.router.navigate(['admin/app/add-institutes/0'])
  }

  gotoEdit(data: any): any {
    this.commonservice.sheardData = data
    this.router.navigate(['admin/app/add-institutes/'+ data.Id])
  }

  closeAddModal() {
    this.modalService.dismissAll();
  }
  closeModal(){  
    this.modalService.dismissAll()
  }


  getInstitueData(): any {
    const obj = {
      userId: this.commonservice.getUserId(),
      offset: this.offset,
      limit: this.limit,
      searchText:this.searchText
    }
    this.commonservice.loaderStart();
    this.restapi.fetchInstitue(obj).subscribe((res: any) => {
      this.commonservice.loaderEnd();
      if (res.success) {
        if(res.response) {
          if (res.response.length > 0) {
            this.institueList = res.response;
            this.nextBtnDesable = res.response.length < this.limit;
          } else {
            this.nextBtnDesable = true;
            this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          }
        } else {
          this.nextBtnDesable = true;
        }
      } else {
        this.institueList = [];
      }
    }, (err: any) => {
    })
  }

  changePagelimit(event: any): any {
    this.offset = 0;
    this.limit = Number(event.target.value);
    this.getInstitueData();
  }

  nextPage(): any {
    this.previousBtnDesable = false;
    this.offset = this.offset + this.limit;
    this.getInstitueData();
  }
  previousPage(): any {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getInstitueData();
    if (this.offset <= 0) {
      this.previousBtnDesable = true;
    }
  }

  search(): any {
    if (this.searchText.length >=3) {
      this.getInstitueData();
    }
    if (this.searchText.length == 0) {
      this.getInstitueData();
    }
  }



  deleteInstitue(): any {
    const obj = {
      userId: this.commonservice.getUserId(),
      id: this.institueId,
    };
    this.commonservice.loaderStart();
    this.restapi.deleteInstitue(obj).subscribe(
      (res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.notifierService.notify("success", res.message);
          this.closeModal()
          this.getInstitueData()
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
    this.institueId=id
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

}
