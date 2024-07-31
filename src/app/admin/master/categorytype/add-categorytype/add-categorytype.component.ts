import { Component, OnInit, ViewChild } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { RestApiService } from "src/app/rest-api.service";
import { CommonService } from "src/app/common.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-categorytype',
  templateUrl: './add-categorytype.component.html',
  styleUrls: ['./add-categorytype.component.css']
})
export class AddCategorytypeComponent {
  @ViewChild("deleteModal") deleteModal: any;

  public Editor = ClassicEditor;

  courseiconbannerImage: any = ''
  FILE_URL = '' as any;
  fullScreenImg = '' as any;
  description: any = ''
  categoryTypeId: any = "";

  categorytype: any = "";
  categorytypeList: any = [];

  categorytypeErr: any = '';
  categoryBannerErr: any = '';
  categoryDescriptionErr: any = '';
  hidecategory: boolean = false
  bannerImage:any=''

  shortheader:any=''
  shortheaderErr:any=''

  barcolor:any=''
  barcolorErr:any=''

  courseicon:any=''
  courseiconErr:any=''

  educatoricon:any=''
  educatoriconErr:any=''

  educatorbanner:any=''
  educatorbannerErr:any=''

  educatordescription:any=''
  educatordescriptionErr:any=''

  constructor(
    private router: Router,
    public commonservice: CommonService,
    private notifierService: NotifierService,
    private restapi: RestApiService,
    private modalService: NgbModal,
    private actroute: ActivatedRoute
  ) { this.FILE_URL = this.restapi.FILE_URL; }

  ngOnInit(): void {

    this.categoryTypeId = this.actroute.snapshot.params['id'];
    if (this.categoryTypeId == 0) {
      this.categoryTypeId = null
    }
    if (this.categoryTypeId) {
      let data = this.commonservice.sheardData

      if(!data){
        this.router.navigate(["admin/app/categorytype"]);
      }

      this.categoryTypeId = data.categoryTypeId;
      this.categorytype = data.name;
      this.hidecategory = data.Hidden === 1 ? true : false;
      this.bannerImage = data.bannerImage
      this.description = data.description

      this.shortheader=data.shortheader
      this.barcolor=data.barcolor
      this.courseicon=data.courseicon
      this.educatoricon=data.educatoricon
      this.educatorbanner=data.educatorbanner
      this.educatordescription=data.educatordescription
    }
  }

  uploadBtncourseicon(): any {
    let elem = document.getElementById('file-input-courseicon')
    if (elem) {
      elem.click()
    }
  }

  onFileChangedcourseicon(event: any): any {
    this.courseiconErr = '';

    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      this.commonservice.loaderStart();
      this.restapi.uploadFile(fd).subscribe((res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.courseicon = res.response.fileName;
        }
      })
    }
  }

  uploadBtneducatoricon(): any {
    let elem = document.getElementById('file-input-educatoricon')
    if (elem) {
      elem.click()
    }
  }

  onFileChangededucatoricon(event: any): any {
    this.educatoriconErr = '';

    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      this.commonservice.loaderStart();
      this.restapi.uploadFile(fd).subscribe((res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.educatoricon = res.response.fileName;
        }
      })
    }
  }

  uploadBtneducatorbanner(): any {
    let elem = document.getElementById('file-input-educatorbanner')
    if (elem) {
      elem.click()
    }
  }

  onFileChangededucatorbanner(event: any): any {
    this.educatorbannerErr = '';

    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      this.commonservice.loaderStart();
      this.restapi.uploadFile(fd).subscribe((res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.educatorbanner = res.response.fileName;
        }
      })
    }
  }

  uploadBtn(): any {
    let elem = document.getElementById('file-input')
    if (elem) {
      elem.click()
    }
  }

  onFileChanged(event: any): any {
    this.categoryBannerErr = '';

    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      this.commonservice.loaderStart();
      this.restapi.uploadFile(fd).subscribe((res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.bannerImage = res.response.fileName;
        }
      })
    }
  }

  changeCategoryTypeFun(): any {
    this.categorytypeErr = '';

  }

  changeShortheaderFun(): any {
    this.shortheaderErr = '';

  }

  changeBarcolorFun(): any {
    this.barcolorErr = '';

  }


  changeCategoryTypeDescriptionFun(): any {
    this.categoryDescriptionErr = '';

  }

  changeeducatordescriptionFun(): any {
    this.educatordescriptionErr = '';

  }

  add(): any {

    this.categorytypeErr = '';
    this.categoryBannerErr = '';
    this.categoryDescriptionErr = '';
    this.shortheaderErr = '';
    this.barcolorErr = '';
    this.educatordescriptionErr = '';
    this.courseiconErr = '';
    this.educatorbannerErr = '';
    this.educatordescriptionErr = '';




    let err = 0

    if (this.categorytype == '' || this.categorytype == null || this.categorytype == undefined) {
      this.categorytypeErr = "Category type name is required";
      err++;
    }

    if (this.shortheader == '' || this.shortheader == null || this.shortheader == undefined) {
      this.shortheaderErr = "Short header is required";
      err++;
    }

    if (this.barcolor == '' || this.barcolor == null || this.barcolor == undefined) {
      this.barcolorErr = "Bar colour is required";
      err++;
    }

    if (this.courseicon == '' || this.courseicon == null || this.courseicon == undefined) {
      this.courseiconErr = "Course icon is required";
      err++;
    }

    if (this.educatoricon == '' || this.educatoricon == null || this.educatoricon == undefined) {
      this.educatoriconErr = "Educator icon is required";
      err++;
    }


    if (this.bannerImage == '' || this.bannerImage == null || this.bannerImage == undefined) {
      this.categoryBannerErr = "Course banner image is required";
      err++;
    }

    if (this.educatorbanner == '' || this.educatorbanner == null || this.educatorbanner == undefined) {
      this.educatorbannerErr = "Educator banner image is required";
      err++;
    }

    if (this.description == '' || this.description == null || this.description == undefined) {
      this.categoryDescriptionErr = "Course description is required";
      err++;
    }

    if (this.educatordescription == '' || this.educatordescription == null || this.educatordescription == undefined) {
      this.educatordescriptionErr = "Educator description is required";
      err++;
    }


    if (err == 0) {

      const obj = {
        name: this.categorytype,
        description: this.description,
        bannerImage: this.bannerImage,
        Hidden: this.hidecategory === false ? "0" : "1",
        shortheader:this.shortheader,
        barcolor:this.barcolor,
        courseicon:this.courseicon,
        educatoricon:this.educatoricon,
        educatorbanner:this.educatorbanner,
        educatordescription:this.educatordescription
      };
      this.commonservice.loaderStart();
      this.restapi.addCategoryType(obj).subscribe(
        (res: any) => {
          this.commonservice.loaderEnd();
          if (res.success) {
            this.resetForm();
            this.notifierService.notify("success", res.message);
            this.router.navigate(["admin/app/categorytype"]);
          } else {
            this.notifierService.notify("error", res.message);
          }
        },
        (err: any) => {
          this.notifierService.notify("error", err.error.message);
        }
      );


    }

  }
  edit(): any {
    this.categorytypeErr = '';
    this.categoryBannerErr = '';
    this.categoryDescriptionErr = '';
    this.shortheaderErr = '';
    this.barcolorErr = '';
    this.educatordescriptionErr = '';
    this.courseiconErr = '';
    this.educatorbannerErr = '';
    this.educatordescriptionErr = '';

    let err = 0

    if (this.categorytype == '' || this.categorytype == null || this.categorytype == undefined) {
      this.categorytypeErr = "Category type name is required";
      err++;
    }

    if (this.shortheader == '' || this.shortheader == null || this.shortheader == undefined) {
      this.shortheaderErr = "Short header is required";
      err++;
    }

    if (this.barcolor == '' || this.barcolor == null || this.barcolor == undefined) {
      this.barcolorErr = "Bar colour is required";
      err++;
    }

    if (this.courseicon == '' || this.courseicon == null || this.courseicon == undefined) {
      this.courseiconErr = "Course icon is required";
      err++;
    }

    if (this.educatoricon == '' || this.educatoricon == null || this.educatoricon == undefined) {
      this.educatoriconErr = "Educator icon is required";
      err++;
    }


    if (this.bannerImage == '' || this.bannerImage == null || this.bannerImage == undefined) {
      this.categoryBannerErr = "Course banner image is required";
      err++;
    }

    if (this.educatorbanner == '' || this.educatorbanner == null || this.educatorbanner == undefined) {
      this.educatorbannerErr = "Educator banner image is required";
      err++;
    }

    if (this.description == '' || this.description == null || this.description == undefined) {
      this.categoryDescriptionErr = "Course description is required";
      err++;
    }

    if (this.educatordescription == '' || this.educatordescription == null || this.educatordescription == undefined) {
      this.educatordescriptionErr = "Educator description is required";
      err++;
    }

    if (err == 0) {
      const obj = {
        categoryTypeId: this.categoryTypeId,
        name: this.categorytype,
        description: this.description,
        bannerImage: this.bannerImage,
        Hidden: this.hidecategory === false ? "0" : "1",
        shortheader:this.shortheader,
        barcolor:this.barcolor,
        courseicon:this.courseicon,
        educatoricon:this.educatoricon,
        educatorbanner:this.educatorbanner,
        educatordescription:this.educatordescription
      };

      this.commonservice.loaderStart();
      this.restapi.updateCategoryType(obj).subscribe(
        (res: any) => {
          this.commonservice.loaderEnd();
          if (res.success) {
            this.notifierService.notify("success", res.message);
            this.resetForm();
            this.router.navigate(["admin/app/categorytype"]);
          } else {
            this.notifierService.notify("error", res.message);
          }
        },
        (err: any) => {
          this.notifierService.notify("error", err.error.message);
        }
      );
    }
  }

  deleteCategorytype() {
    const obj = {
      userId: this.commonservice.getUserId(),
      categoryTypeId: this.categoryTypeId
    };
    this.commonservice.loaderStart();
    this.restapi.deleteCategoryType(obj).subscribe((res: any) => {
      this.commonservice.loaderEnd();
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.closeModal()
        this.router.navigate(["admin/app/categorytype"]);
      } else {
        this.notifierService.notify('error', res.message);
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message);
    })
  }
  onClickDelete(): any {
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

  resetForm() {
    this.categorytype = "";
    this.hidecategory = false;
    this.categorytypeErr = '';
    this.router.navigate(["admin/app/categorytype"]);
  }
  closeModal(): any {
    this.modalService.dismissAll();
  }
  goBack() {
    this.router.navigate(["admin/app/categorytype"]);
  }


}
