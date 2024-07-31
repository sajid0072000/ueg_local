import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent {
  @ViewChild('deleteModal') deleteModal: any;

  partnerid: any = ''

  Guid: any = ''
  GuidErr: boolean = false
  Name: any = ''
  NameErr: boolean = false
  CompanyName: any = ''
  CompanyNameErr: boolean = false
  ShortCompanyName: any = ''
  ShortCompanyNameErr: boolean = false
  ContactEmail: any = ''
  ContactEmailErr: boolean = false

  ShowCourses: boolean = false
  ShowEducators: boolean = false
  ShowPartnerships: boolean = false
  ShowUsing: boolean = false

  FILE_URL: any = ''
  Video_URL: any = ''

  constructor(
    private router: Router,
    private restapi: RestApiService,
    private actroute: ActivatedRoute,
    private notifierService: NotifierService,
    private common: CommonService,
    private modalService: NgbModal,

  ) {
    this.FILE_URL = this.restapi.FILE_URL;
    this.Video_URL = this.restapi.Video_URL;
  }

  ngOnInit(): void {
    this.partnerid = this.actroute.snapshot.params['id'];
    if (this.partnerid == 0) {
      this.partnerid = null
    }
    if (this.partnerid) {
      this.fetchPartnersById();
    }

  }
  fetchPartnersById(): any {
    const data = {
      "Id": this.partnerid
    };
    this.common.loaderStart();
    this.restapi.fetchPartnersById(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        let temp = res.response[0]
        this.Name = temp.Name
        this.Guid = temp.Guid
        this.CompanyName = temp.CompanyName
        this.ShortCompanyName = temp.ShortCompanyName
        this.ContactEmail = temp.ContactEmail
        this.ShowCourses = temp.ShowCourses===0?false:true
        this.ShowEducators = temp.ShowEducators===0?false:true
        this.ShowPartnerships = temp.ShowPartnerships===0?false:true
        this.ShowUsing = temp.ShowUsing===0?false:true
      }
    });
  }







  changeGuid(): any {
    this.GuidErr = false
  }

  changeName(): any {
    this.NameErr = false
  }

  changeCompanyName(): any {
    this.CompanyNameErr = false
  }

  changeShortCompanyName(): any {
    this.ShortCompanyNameErr = false
  }

  changeContactEmail(): any {
    this.ContactEmailErr = false
  }


  add(): any {
    this.GuidErr = false
    this.NameErr = false
    this.CompanyNameErr = false
    this.ShortCompanyNameErr = false
    this.ContactEmailErr = false

    let err = 0

    if (this.Guid === '' || this.Guid === undefined || this.Guid === null) {
      this.GuidErr = true
      err++
    }

    if (this.Name === '' || this.Name === undefined || this.Name === null) {
      this.NameErr = true
      err++
    }


    if (this.CompanyName === '' || this.CompanyName === undefined || this.CompanyName === null) {
      this.CompanyNameErr = true
      err++
    }


    if (this.ShortCompanyName === '' || this.ShortCompanyName === undefined || this.ShortCompanyName === null) {
      this.ShortCompanyNameErr = true
      err++
    }


    // if (this.ContactEmail === '' || this.ContactEmail === undefined || this.ContactEmail === null) {
    //   this.ContactEmailErr = true
    //   err++
    // }

    if (err == 0) {
      let data = {
        "Guid": this.Guid,
        "Name": this.Name,
        "CompanyName": this.CompanyName,
        "ShortCompanyName": this.ShortCompanyName,
        "ContactEmail": this.ContactEmail,
        "MailTo": "",
        "DistributionId": "",
        "ShowCourses": this.ShowCourses === false ? "0" : "1",
        "ShowEducators": this.ShowEducators === false ? "0" : "1",
        "ShowPartnerships": this.ShowPartnerships === false ? "0" : "1",
        "ShowUsing": this.ShowUsing === false ? "0" : "1"
      }
      this.common.loaderStart();
      this.restapi.addPartners(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/partner-list'])
        } else {
          this.notifierService.notify('error', res.message);
        }
      })
    }
  }

  resetForm(): any {

    this.GuidErr = false
    this.NameErr = false
    this.CompanyNameErr = false
    this.ShortCompanyNameErr = false
    this.ContactEmailErr = false

    this.ShowCourses = false
    this.ShowEducators = false
    this.ShowPartnerships = false
    this.ShowUsing = false

    this.Guid = ''
    this.Name = ''
    this.CompanyName = ''
    this.ShortCompanyName = ''
    this.ContactEmail = ''
    this.partnerid = ''
    this.router.navigate(["admin/app/partner-list"]);


  }


  edit(): any {
    this.GuidErr = false
    this.NameErr = false
    this.CompanyNameErr = false
    this.ShortCompanyNameErr = false
    this.ContactEmailErr = false

    let err = 0

    if (this.Guid === '' || this.Guid === undefined || this.Guid === null) {
      this.GuidErr = true
      err++
    }

    if (this.Name === '' || this.Name === undefined || this.Name === null) {
      this.NameErr = true
      err++
    }


    if (this.CompanyName === '' || this.CompanyName === undefined || this.CompanyName === null) {
      this.CompanyNameErr = true
      err++
    }


    if (this.ShortCompanyName === '' || this.ShortCompanyName === undefined || this.ShortCompanyName === null) {
      this.ShortCompanyNameErr = true
      err++
    }


    // if (this.ContactEmail === '' || this.ContactEmail === undefined || this.ContactEmail === null) {
    //   this.ContactEmailErr = true
    //   err++
    // }

    if (err == 0) {
      let data = {
        "Id": this.partnerid,
        "Guid": this.Guid,
        "Name": this.Name,
        "CompanyName": this.CompanyName,
        "ShortCompanyName": this.ShortCompanyName,
        "ContactEmail": this.ContactEmail,
        "MailTo": "",
        "DistributionId": "",
        "ShowCourses": this.ShowCourses === false ? "0" : "1",
        "ShowEducators": this.ShowEducators === false ? "0" : "1",
        "ShowPartnerships": this.ShowPartnerships === false ? "0" : "1",
        "ShowUsing": this.ShowUsing === false ? "0" : "1"
      }
      this.common.loaderStart();
      this.restapi.updatePartners(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/partner-list'])
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
    const data = { "Id": this.partnerid }
    this.common.loaderStart();
    this.restapi.deletePartners(data).subscribe((res: any) => {
      this.common.loaderEnd();
      console.log(res.response);
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.closeModal()
        this.router.navigate(["admin/app/partner-list"]);

      } else {
        this.notifierService.notify('error', res.message);
      }
    })

  }

  goBack() {
    this.router.navigate(["admin/app/partner-list"]);
  }




}
