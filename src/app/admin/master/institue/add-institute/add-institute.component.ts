import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonService } from "src/app/common.service";
import { NotifierService } from "angular-notifier";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RestApiService } from "src/app/rest-api.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-institute',
  templateUrl: './add-institute.component.html',
  styleUrls: ['./add-institute.component.css']
})
export class AddInstituteComponent {
  @ViewChild("deleteModal") deleteModal: any;

  name = "" as any;
  institueId = "" as any
  instituetErr = "" as any

  constructor(
    private router: Router,
    private restapi: RestApiService,
    private commonservice: CommonService,
    private notifierService: NotifierService,
    private modalService: NgbModal,
    private actroute: ActivatedRoute

  ) {

  }

  ngOnInit(): void {
    this.institueId = this.actroute.snapshot.params['id'];
    if (this.institueId == 0) {
      this.institueId = null
    }
    if (this.institueId) {
      let data = this.commonservice.sheardData
      if (!data) {
        this.router.navigate(["admin/app/institutes"]);
      }
      this.name = data.Name;
    }
  }




  changeInstituteName(): any {
    this.instituetErr = ""
  }

  add(): any {
    this.instituetErr = ""

    let err = 0

    if (this.name == "" || this.name == null || this.name == undefined) {
      this.instituetErr = "Institute name required";
      err++
    }

    if (err == 0) {

      const obj = {
        userId: this.commonservice.getUserId(),
        name: this.name
      }

      console.log(obj);

      this.commonservice.loaderStart();
      this.restapi.inserInstitue(obj).subscribe((res: any) => {
        this.commonservice.loaderEnd()
        if (res.success) {
          this.resetForm();
          this.notifierService.notify("success", res.message);
          this.router.navigate(["admin/app/institutes"]);

        } else {
          this.notifierService.notify("error", res.message);
        }
      }, (err: any) => {
        this.notifierService.notify("error", err.error.message);
      })

    }


  }


  edit(): any {

    this.instituetErr = ""

    let err = 0

    if (this.name == "" || this.name == null || this.name == undefined) {
      this.instituetErr = "Institute name required";
      err++
    }

    if (err == 0) {

      const obj = {
        userId: this.commonservice.getUserId(),
        name: this.name,
        id: this.institueId
      }
      this.commonservice.loaderStart();
      this.restapi.updateInstitue(obj).subscribe((res: any) => {
        this.commonservice.loaderEnd()
        if (res.success) {
          this.resetForm();
          this.notifierService.notify("success", res.message);
          this.router.navigate(["admin/app/institutes"]);

        } else {
          this.notifierService.notify("error", res.message);
        }
      }, (err: any) => {
        this.notifierService.notify("error", err.error.message);
      })
    }
  }

  closeModal(): any {
    this.modalService.dismissAll();
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
          this.router.navigate(["admin/app/institutes"]);
        } else {
          this.notifierService.notify("error", res.message);
        }
      },
      (err: any) => {
        this.notifierService.notify("error", err.error.message);
      }
    );
  }

  resetForm(): any {
    this.name = ""
    this.router.navigate(["admin/app/institutes"]);

  }


  onClickDelete(): any {
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

  goBack():any{
    this.router.navigate(["admin/app/institutes"]);
  }

}
