import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent {

  wishList = [] as any
  FILE_URL = '' as any;
  searchText ='' as any

  constructor(
    private router: Router,
    private restapi: RestApiService,
    public common: CommonService,
    private modalService: NgbModal,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.getCart();
    this.FILE_URL = this.restapi.FILE_URL;
  }

  getCart(): any {
    let obj = {
      "userid": this.common.getUserId(),
      "sessionid": "",
      "type": "wish",
      "searchText": this.searchText
    }
    this.common.loaderStart();
    this.restapi.getCart(obj).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.wishList = res.response
      } else {
        this.wishList = []
      }
    })
  }

  goto(id:any):any{

    this.common.navigate(['/user/app/course/'+ this.common.encryptParams(id)]);

  }

  search(): any {
    if (this.searchText.length >= 3) {
      this.getCart();
    }
    if (this.searchText.length == 0) {
      this.getCart();
    }
  }

}
