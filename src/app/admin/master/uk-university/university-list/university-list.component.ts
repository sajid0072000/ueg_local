import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.css']
})
export class UniversityListComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal: any;

  universityList: any = [];
  searchText: any = '';
  selectedVal: any = 20;
  public pageList: Array<any> = [
    { name: '10', value: '10' },
    { name: '15', value: '15' },
    { name: '20', value: '20' },
    { name: '30', value: '30' },
    { name: '50', value: '50' }
  ];
  limit: any = 20;
  offset: any = 0;
  previousBtnDesable: boolean = true;
  nextBtnDesable: boolean = false;
  universityId:any = '';


  constructor(
    private router: Router,
    private restapi: RestApiService,
    public common: CommonService,
    private modalService: NgbModal,
    private notifierService: NotifierService
  ) { }
  ngOnInit(): void {
    this.getUniversityList();
  }

  getUniversityList() {
    const data = {
      limit: this.limit,
      offset: this.offset,
      searchText: this.searchText
    };
    this.common.loaderStart();
    this.restapi.getUkUniversity(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.universityList = res.response;
            this.nextBtnDesable = res.response.length < this.limit;
          } else {
            this.universityList=[]
            this.nextBtnDesable = true;
            this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          }
        } else {
          this.nextBtnDesable = true;
        }
      } else {
        this.universityList = [];
      }
    });
  }

  add() {
    this.router.navigate(['admin/app/add-university/0']);
  }
  edit(id: any) {
    this.router.navigate(['admin/app/add-university/' + id]);

  }
  search() {
    if (this.searchText.length >=3 ) {
      this.getUniversityList();
    }
    if (this.searchText.length == 0) {
      this.getUniversityList();
    }
  }


  onClickDelete(id: any , modal:any) {
    this.universityId = id;
    this.modalService.open(modal , {centered : true  , backdrop : false});
  }
  delete(){
    const data = {
      Id:this.universityId
    };
    this.common.loaderStart();
    this.restapi.deleteUkUniversity(data).subscribe((res:any)=>{
      this.common.loaderEnd();
      if(res.success){
        this.notifierService.notify('success' , res.message);
        this.getUniversityList();
        this.closeModal();
      } else{
        this.notifierService.notify('error', res.message);
      }
    },(err:any)=>{
      this.notifierService.notify('error' , err.error.message);
    })
  }

  closeModal(){
    this.universityId = '';
    this.modalService.dismissAll();    
  }



  changePagelimit(event: any): any {
    this.offset = 0;
    this.limit = Number(event.target.value);
    this.getUniversityList();
  }

  previousPage(): any {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getUniversityList();
    if (this.offset <= 0) {
      this.previousBtnDesable = true;
    }
  }

  nextPage(): any {
    this.previousBtnDesable = false;
    this.offset = this.offset + this.limit;
    this.getUniversityList();
  }
}
