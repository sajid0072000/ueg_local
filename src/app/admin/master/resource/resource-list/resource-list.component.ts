import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent {

  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild("addmodal") addmodal: any;

  offset = 0;
  limit = 20;
  resourceList: any = [];
  resourceid = '' as any;
  selectedVal: any = 20;

  public pageList: Array<any> = [
    { name: "10", value: "10" },
    { name: "15", value: "15" },
    { name: "20", value: "20" },
    { name: "30", value: "30" },
    { name: "50", value: "50" },
  ];
  searchText = '' as any;
  FILE_ROOT = '';
  Video_URL = '';
  previousBtnDesable: boolean = true;
  nextBtnDesable: boolean = false;

  constructor(
    private router: Router,
    private restapi: RestApiService,
    public common: CommonService,
    private modalService: NgbModal,
    private notifierService: NotifierService
  ) {
    this.FILE_ROOT = this.restapi.FILE_URL;
    this.Video_URL = this.restapi.Video_URL;
  }

  ngOnInit(): void {
    this.getResource();
  }
  

  getResource(): any {
    let obj = {
      'offset':this.offset + "",
      'limit':this.limit,
      'searchText':this.searchText
    }
    this.common.loaderStart();
    this.restapi.fetchResources(obj).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.resourceList = res.response;
            this.nextBtnDesable = res.response.length < this.limit;  
          } else {
            this.nextBtnDesable = true;
            this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          }
        } else {
          this.nextBtnDesable = true;
        }
      } else {
        this.resourceList = [];
      }
    },
    (err:any)=>{
     this.notifierService.notify("error", err.error.message);
    })
  }
  
  changePagelimit(event: any): any {
    this.offset = 0;
    this.limit = Number(event.target.value);
    this.getResource();
  }

  previousPage(): any {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getResource();
    if (this.offset <= 0) {
      this.previousBtnDesable = true;
    }
  }

  nextPage(): any {    
    this.previousBtnDesable = false;
    this.offset = this.offset + this.limit;
    this.getResource();
  }

  add(): any {
    this.router.navigate(['admin/app/add-resource/0'])
  }

  edit(id: any): any {
    this.router.navigate(['admin/app/add-resource/' + id])
  }

  closeAddModal() {
    this.modalService.dismissAll();
  }

  onClickDelete(id: any): any {
    this.resourceid = id
    this.modalService.open(this.deleteModal, { centered: true, size: 'md' });
  }

  closeModal(): any {
    this.resourceid = '';
    this.modalService.dismissAll();
  }

  delete(): any {
    const data = { "Id": this.resourceid }
    this.common.loaderStart();
    this.restapi.deleteResources(data).subscribe((res: any) => {
      this.common.loaderEnd();
      console.log(res.response);
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.closeModal()
        this.getResource()
      } else {
        this.notifierService.notify('error', res.message);
      }
    })
  }


  search(): any {
    if (this.searchText.length >= 3) {
      this.getResource();
    }
    if (this.searchText.length == 0) {
      this.getResource();
    }
  }



}
