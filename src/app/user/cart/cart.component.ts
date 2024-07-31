import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartList = [] as any;
  FILE_URL = '';
  total = 0;

  constructor(
    private router: Router,
    private restapi: RestApiService,
    public common: CommonService,
    private modalService: NgbModal,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.getCart();
    this.FILE_URL = this.restapi.FILE_URL;
  }

  getCart(): any {
    let obj = {
      "userid": this.common.getUserId(),
      "sessionid": "",
      "type": "cart"
    }
    this.common.loaderStart();
    this.restapi.getCart(obj).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.cartList = res.response;
        this.calculateTotal();
      } else {
        this.cartList = [];
        this.total = 0;
      }
    });
  }

  calculateTotal(): void {
    let totalAmt = 0;
    for (let data of this.cartList) {
      totalAmt += data.price * data.quantity;
    }
    this.total = totalAmt;
  }

  remove(courseid: any): any {
    let obj = {
      "userid": this.common.getUserId(),
      "sessionid": "",
      "courseid": courseid,
      "type": "cart"
    }
    this.common.loaderStart();
    this.restapi.deleteCart(obj).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.getCart();
      } else {
        this.notifierService.notify('error', res.message);
      }
    });
  }

  updateQuantity(courseid: any, newQuantity: number): any {
    if (newQuantity < 1) {
      return;
    }

    let obj = {
      "userid": this.common.getUserId(),
      "sessionid": "",
      "courseid": courseid,
      "quantity": newQuantity,
      "type": "cart"
    }
    this.common.loaderStart();
    this.restapi.updateCartQuantity(obj).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.getCart();
      } else {
        this.notifierService.notify('error', res.message);
      }
    });
  }

  goto(id: any): any {
    this.common.navigate(['/user/app/course/' + this.common.encryptParams(id)]);
  }

  moveToWishlist(id: any): any {
    let courseList = [];
    courseList.push({ "courseid": id });
    let data = {
      "userid": this.common.getUserId(),
      "sessionid": "",
      "courseList": courseList,
      "type": "wish"
    }

    this.common.loaderStart();
    this.restapi.addToCart(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.getCart();
      } else {
        this.notifierService.notify('error', res.message);
      }
    });
  }
}
