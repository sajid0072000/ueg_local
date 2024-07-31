import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-add-education-level',
  templateUrl: './add-education-level.component.html',
  styleUrls: ['./add-education-level.component.css']
})
export class AddEducationLevelComponent {
  @ViewChild('deleteModal') deleteModal: any;

  educationLevelid = '' as any;

  Name: any = ''
  MinAge: any = ''
  MaxAge: any = ''
  DisplayAge: any = ''

  NameErr: boolean = false
  MinAgeErr: boolean = false
  MaxAgeErr: boolean = false
  DisplayAgeErr: boolean = false

  Deleted: any = false
  IsActive: any = false

  constructor(
    private router: Router,
    private restapi: RestApiService,
    private actroute: ActivatedRoute,
    private notifierService: NotifierService,
    private common: CommonService,
    private modalService: NgbModal,
    public datepipe: DatePipe

  ) {
  }

  ngOnInit(): void {
    this.educationLevelid = this.actroute.snapshot.params['id'];
    if (this.educationLevelid == 0) {
      this.educationLevelid = null
    }
    if (this.educationLevelid) {
      this.fetchEducationLevelsById();
    }

  }

  fetchEducationLevelsById(): any {
    const data = {
      "Id": this.educationLevelid
    };
    this.common.loaderStart();
    this.restapi.fetchEducationLevelsById(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        let temp = res.response[0]
        this.Name = temp.Name
        this.MinAge = temp.MinAge
        this.MaxAge = temp.MaxAge
        this.DisplayAge = temp.DisplayAge
        this.Deleted = temp.Deleted==0?false:true
        this.IsActive= temp.IsActive==0?false:true
      }
    });
  }




  changeName(): any {
    this.NameErr = false
  }

  changeMinAge(): any {
    this.MinAgeErr = false
  }

  changeMaxAge(): any {
    this.MaxAgeErr = false
  }

  changeDisplayAge(): any {
    this.DisplayAgeErr = false
  }



  add(): any {

    this.NameErr = false
    this.MinAgeErr = false
    this.MaxAgeErr = false
    this.DisplayAgeErr = false

    let err = 0

    if (this.Name === '' || this.Name === null || this.Name === undefined) {
      this.NameErr = true
      err++
    }

    if (this.MinAge === '' || this.MinAge === null || this.MinAge === undefined) {
      this.MinAgeErr = true
      err++
    }

    if (this.MaxAge === '' || this.MaxAge === null || this.MaxAge === undefined) {
      this.MaxAgeErr = true
      err++
    }

    if (this.DisplayAge === '' || this.DisplayAge === null || this.DisplayAge === undefined) {
      this.DisplayAgeErr = true
      err++
    }

    if (err == 0) {
      let data = {
        "Name": this.Name,
        "MinAge": this.MinAge,
        "MaxAge": this.MaxAge,
        "DisplayAge": this.DisplayAge,
        Deleted:this.Deleted===false?0:1,
        IsActive:this.IsActive===false?0:1,
      }

      this.restapi.addEducationLevel(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/education-level-list'])
        } else {
          this.notifierService.notify('error', res.message);
        }
      })
    }
  }

  goBack() {
    this.router.navigate(["admin/app/education-level-list"]);
  }

  resetForm(): any {
    this.NameErr = false
    this.MinAgeErr = false
    this.MaxAgeErr = false
    this.DisplayAgeErr = false
    this.Name = ''
    this.MinAge = ''
    this.MaxAge = ''
    this.DisplayAge = ''
    this.router.navigate(['admin/app/education-level-list'])
  }

  edit(): any {

    this.NameErr = false
    this.MinAgeErr = false
    this.MaxAgeErr = false
    this.DisplayAgeErr = false

    let err = 0

    if (this.Name === '' || this.Name === null || this.Name === undefined) {
      this.NameErr = true
      err++
    }

    if (this.MinAge === '' || this.MinAge === null || this.MinAge === undefined) {
      this.MinAgeErr = true
      err++
    }

    if (this.MaxAge === '' || this.MaxAge === null || this.MaxAge === undefined) {
      this.MaxAgeErr = true
      err++
    }

    if (this.DisplayAge === '' || this.DisplayAge === null || this.DisplayAge === undefined) {
      this.DisplayAgeErr = true
      err++
    }

    if (err == 0) {
      let data = {
        "Id": this.educationLevelid,
        "Name": this.Name,
        "MinAge": this.MinAge,
        "MaxAge": this.MaxAge,
        "DisplayAge": this.DisplayAge,
        Deleted:this.Deleted===false?0:1,
        IsActive:this.IsActive===false?0:1,
      }

      this.restapi.updateEducationLevel(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/education-level-list'])
        } else {
          this.notifierService.notify('error', res.message);
        }
      })
    }
  }

  onClickDelete(): any {
    this.modalService.open(this.deleteModal, { centered: true, size: 'md' });
  }

  closeModal(): any {
    this.modalService.dismissAll();
  }

  delete(): any {
    const data = { "Id": this.educationLevelid }
    this.common.loaderStart();
    this.restapi.deleteEducationLevel(data).subscribe((res: any) => {
      this.common.loaderEnd();
      console.log(res.response);
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.closeModal()
        this.router.navigate(["admin/app/education-level-list"]);

      } else {
        this.notifierService.notify('error', res.message);
      }
    })

  }


}
