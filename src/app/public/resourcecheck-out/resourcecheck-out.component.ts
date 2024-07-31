import { Component, OnDestroy, OnInit } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { CommonService } from "src/app/common.service";
import { RestApiService } from "src/app/rest-api.service";

@Component({
  selector: "app-resourcecheck-out",
  templateUrl: "./resourcecheck-out.component.html",
  styleUrls: ["./resourcecheck-out.component.css"],
})
export class ResourcecheckOutComponent implements OnInit, OnDestroy {
  limit: any = 10;
  offset: any = 0;
  cartid: any = "";
  getCartlistArr: any = [];
  quantity: any = "";
  price: any = "";
  updateresourcePrice: any = "";
  initialValue: any = 0;
  totalPrice: any = 0;
  subjectRes: any = '';
  email = '';
  name = '';
  address = '';
  phone = '';
  zip = '';
  country = '';
  emailErr:boolean=false
  validEmailErr:boolean=false
  nameErr:boolean=false
  addressErr:boolean=false
  phoneErr:boolean=false
  validPhoneErr:boolean=false
  zipErr:boolean=false
  countryErr:boolean=false

  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  constructor(
    public common: CommonService,
    private rest: RestApiService,
    private notifierService: NotifierService
  ) { }
  
  ngOnInit(): void {
    this.getCart();
    this.common.cartSubject.subscribe((res: any) => {
      if (res.success) {
        this.subjectRes = res.success;
        this.totalPrice = 0;
        this.getCartlistArr = [];
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subjectRes == true) {
      this.common.cartSubject.unsubscribe();
    }
  }

  gotoBack(): any {
    history.back();
  }

  incrementFun() {
    this.updateresourcePrice = Number(this.price) + this.updateresourcePrice;
    this.quantity += 1;
  }

  decrementFun() {
    this.updateresourcePrice -= Number(this.price);
    this.quantity -= 1;
  }

  getCart(): any {
    const data = {
        userid: this.common.getUserId(),
        type: "resource",
        limit: this.limit,
        offset: this.offset,
    };
    this.common.loaderStart();
    this.rest.getCart(data).subscribe(
        (res: any) => {
    this.common.loaderEnd();

            if (res.success) {
                this.getCartlistArr = res.response.resourceList;
                this.totalPrice = res.response.totalPrice
            } else {
                this.common.notify("error", res.message);
            }
        },
        (err: any) => {
            this.common.notify("error", err.error.message);
        }
    );
}

  deleteCart(id: any): any {
    let userid: any = localStorage.getItem("userid");
    const data = {
      userid: userid ? userid : "",
      sessionid: Math.floor(Math.random() * 1000000 + 1),
      courseid: "",
      type: "resource",
      resourceid: "",
      cartid: id,
    };
    this.common.loaderStart();
    this.rest.deleteCart(data).subscribe(
      (res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.common.notify("success", res.message);
          this.getCart();
          this.common.Subject.next({ success: true });
        } else {
          this.common.notify("error", res.message);
        }
      },
      (err: any) => {
        this.common.notify("error", err.error.message);
      }
    );
  }

  updateCart(obj: any): any {
    if(obj.quantity < 1){
      obj.quantity = 1
    }
    const data = {
      quantity: obj.quantity,
      id: obj.cartid,
    };
    this.common.loaderStart()
    this.rest.updateCart(data).subscribe((res: any) => {
      this.common.loaderEnd()
      if (res.success) {
        this.common.notify('success', res.message)
        this.getCart()
        this.common.Subject.next({ success: true });
      } else {
        this.common.notify('error', res.message)
      }
    }, (err: any) => {
      this.common.notify('error', err.error.message)
    })
  }



  changeEmailFun(): any {
    this.emailErr = false
    if (this.email) {
      if (!this.email.match(this.mailformat)) {
        this.validEmailErr = true
      } else {
        this.validEmailErr = false
      }
    }
  }

  changeNameFun(): any {
    this.nameErr = false
  }

  changeAddressFun(): any {
    this.addressErr = false
  }

  changePhoneFun(): any {
    this.phoneErr = false;
    if (this.phone) {
      if (
        this.phone.toString().length > 15 ||
        this.phone.toString().length < 7
      ) {
        this.validPhoneErr = true
      } else {
        this.validPhoneErr = false
      }
    }
  }

  changeCountryFun(): any {
    this.countryErr = false
  }

  changeZipFun(): any {
    this.zipErr = false
  }

  payNow(): any {

    let err = 0

    this.emailErr=false
    this.validEmailErr=false
    this.nameErr=false
    this.addressErr=false
    this.phoneErr=false
    this.validPhoneErr=false
    this.zipErr=false
    this.countryErr=false

    if(this.getCartlistArr.length == 0){
      this.notifierService.notify("error", "Cart is empty");
      return false
    }

    if (
      this.email == "" ||
      this.email == null ||
      this.email == undefined
    ) {
      this.emailErr = true
      err++;
    }

    if (this.email) {
      if (!this.email.match(this.mailformat)) {
        this.validEmailErr = true
        err++;
      }
    }

    if (
      this.name == "" ||
      this.name == null ||
      this.name == undefined
    ) {
      this.nameErr = true
      err++;
    }

    if (
      this.address == "" ||
      this.address == null ||
      this.address == undefined
    ) {
      this.addressErr = true
      err++;
    }

    if (
      this.phone == "" ||
      this.phone == null ||
      this.phone == undefined
    ) {
      this.phoneErr = true;
      err++;
    }

    if (this.phone) {
      if (
        this.phone.toString().length > 15 ||
        this.phone.toString().length < 7
      ) {
        this.validPhoneErr = true
        err++;
      }
    }

    if (
      this.zip == "" ||
      this.zip == null ||
      this.zip == undefined
    ) {
      this.zipErr = true;
      err++;
    }

    if (
      this.country == "" ||
      this.country == null ||
      this.country == undefined
    ) {
      this.countryErr = true;
      err++;
    }


    if(err==0){
      const data = {
        sessionid: this.common.getSessionId(),
        email: this.email,
        name: this.name,
        address: this.address,
        phone: this.phone,
        zip: this.zip,
        country: this.country,
        userid: this.common.getUserId(),
        type: "resource",
      };
      this.rest.createCheckoutSession(data).subscribe((res: any) => {
        if (res.success) {
          window.location.href = res.response;
        } else {
          this.common.notify("error", res.message);
        }
      });
    }
  }

}
