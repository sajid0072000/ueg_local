import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  searchText:any=''
  offset = 0;
  limit = 20;
  usersList: any = [];
  selectedVal: any = 20;
  public pageList: Array<any> = [
    { name: '10', value: '10' },
    { name: '15', value: '15' },
    { name: '20', value: '20' },
    { name: '30', value: '30' },
    { name: '50', value: '50' }
  ];

  usertype: any = ''

  buttonArr:any=[
    {"name":"All", "isActive":true, value:""},
    {"name":"Admin", "isActive":false, value:1},
    {"name":"Educator", "isActive":false, value:2},
    {"name":"Employee", "isActive":false, value:3},
  ]

  constructor(
    private router: Router,
    private restapi: RestApiService,
    public common: CommonService,
    private modalService: NgbModal,
    private notifierService: NotifierService
  ) {

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getUsers();
  }

  userTypeFun(data:any, i:any):any{

    for(let [index,obj] of this.buttonArr.entries()){
      if(index==i){
        obj.isActive = true
        this.usertype = data.value
        this.getUsers()
      }else{
        obj.isActive = false
      }
    }
  }
  previousBtnDesable: boolean = true;
  nextBtnDesable: boolean = false;

  getUsers(): any {
    let obj = {
      'offset': this.offset + '',
      'limit': this.limit,
      'usertype': this.usertype,
      'searchText':this.searchText
    }
    this.common.loaderStart();
    this.restapi.getAllUsers(obj).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.usersList = res.response;
            this.nextBtnDesable = res.response.length < this.limit;
          } else {
            this.usersList = []
            this.nextBtnDesable = true;
            this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          }
        } else {
          this.nextBtnDesable = true;
          this.usersList = [];
        }
      } else {
        this.usersList = [];
      }
    })
  }


  changePagelimit(event: any): any {
    this.offset = 0;
    this.limit = Number(event.target.value);
    this.getUsers();
  }

  previousPage(): any {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getUsers();
    if (this.offset <= 0) {
      this.previousBtnDesable = true;
    }
  }

  nextPage(): any {
    this.previousBtnDesable = false;
    this.offset = this.offset + this.limit;
    this.getUsers();
  }


  add(): any {
    this.router.navigate(['admin/app/add-users/0'])
  }

  edit(id: any): any {
    this.router.navigate(['admin/app/add-users/' + id])
  }


  search(): any {
    if (this.searchText.length >= 3) {
        this.getUsers();
    }
    if (this.searchText.length == 0) {
        this.getUsers();
    }
  }

}
