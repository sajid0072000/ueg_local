import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-add-educator-of-the-month',
  templateUrl: './add-educator-of-the-month.component.html',
  styleUrls: ['./add-educator-of-the-month.component.css']
})
export class AddEducatorOfTheMonthComponent {
  @ViewChild('deleteModal') deleteModal: any;


  public Editor = ClassicEditor;

  educatorofthemonthid: any = ''

  FILE_URL: any = ''
  Video_URL: any = ''

  fetchEducatorIdArr: any = []

  DateStarting: any = ''
  DateStartingErr: boolean = false
  EducatorId: any = ''
  EducatorIdErr: boolean = false
  Content: any = ''
  ContentErr: boolean = false

  constructor(
    private router: Router,
    private restapi: RestApiService,
    private actroute: ActivatedRoute,
    private notifierService: NotifierService,
    private common: CommonService,
    private modalService: NgbModal,
    public datepipe: DatePipe

  ) {
    this.FILE_URL = this.restapi.FILE_URL;
    this.Video_URL = this.restapi.Video_URL;
  }

  ngOnInit(): void {
    this.educatorofthemonthid = this.actroute.snapshot.params['id'];
    if (this.educatorofthemonthid == 0) {
      this.educatorofthemonthid = null
    }
    if (this.educatorofthemonthid) {
      this.fetchDetailsEducatorOfTheMonth();
    }
    this.fetchEducatorId()

  }

  fetchDetailsEducatorOfTheMonth(): any {
    const data = {
      "Id": this.educatorofthemonthid
    };
    this.common.loaderStart();
    this.restapi.fetchDetailsEducatorOfTheMonth(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        let temp = res.response[0]
        let temp1 = temp.DateStarting
        let latest_date = this.datepipe.transform(temp1, 'yyyy-MM-ddThh:mm');
        this.DateStarting = latest_date
        this.Content = temp.Content
        this.EducatorId = temp.EducatorId
      }
    });
  }


  fetchEducatorId(): any {

    let data = {
      "userId": this.common.getUserId(),
      "searchText": ""
    }

    this.restapi.fetchEducatorId(data).subscribe((res: any) => {
      if (res.success) {
        this.fetchEducatorIdArr = res.response
      } else {
        this.fetchEducatorIdArr = []
      }
    })

  }

  changeDateStarting(): any {
    this.DateStartingErr = false
  }
  chngeEducatorId():any{
    this.EducatorIdErr=false
  }

  changeContent(): any {
    this.ContentErr = false
  }

  add(): any {

    this.DateStartingErr = false
    this.EducatorIdErr = false
    this.ContentErr = false

    let err = 0

    if (this.DateStarting === '' || this.DateStarting === undefined || this.DateStarting === null) {
      this.DateStartingErr = true
      err++
    }

    if (this.EducatorId === '' || this.EducatorId === undefined || this.EducatorId === null) {
      this.EducatorIdErr = true
      err++
    }

    if (this.Content === '' || this.Content === undefined || this.Content === null) {
      this.ContentErr = true
      err++
    }

    if (err == 0) {
      let data = {
        "DateStarting": this.DateStarting,
        "EducatorId": this.EducatorId,
        "Content": this.Content
      }
      this.restapi.insertEducatorOfTheMonth(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/educator-of-the-month-list'])
        } else {
          this.notifierService.notify('error', res.message);
        }
      })
    }
  }

  resetForm(): any {
    this.DateStartingErr = false
    this.EducatorIdErr = false
    this.ContentErr = false
    this.DateStarting = ''
    this.EducatorId = ''
    this.Content = ''
    this.router.navigate(["admin/app/educator-of-the-month-list"]);

  }

  edit(): any {

    this.DateStartingErr = false
    this.EducatorIdErr = false
    this.ContentErr = false

    let err = 0

    if (this.DateStarting === '' || this.DateStarting === undefined || this.DateStarting === null) {
      this.DateStartingErr = true
      err++
    }

    if (this.EducatorId === '' || this.EducatorId === undefined || this.EducatorId === null) {
      this.EducatorIdErr = true
      err++
    }

    if (this.Content === '' || this.Content === undefined || this.Content === null) {
      this.ContentErr = true
      err++
    }

    if (err == 0) {
      let data = {
        "Id": this.educatorofthemonthid,
        "DateStarting": this.DateStarting,
        "EducatorId": this.EducatorId,
        "Content": this.Content
      }
      this.restapi.updateEducatorOfTheMonth(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/educator-of-the-month-list'])
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
    const data = { "Id": this.educatorofthemonthid }
    this.common.loaderStart();
    this.restapi.deleteEducatorOfTheMonth(data).subscribe((res: any) => {
      this.common.loaderEnd();
      console.log(res.response);
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.closeModal()
        this.router.navigate(["admin/app/educator-of-the-month-list"]);

      } else {
        this.notifierService.notify('error', res.message);
      }
    })

  }
  goBack() {
    this.router.navigate(["admin/app/educator-of-the-month-list"]);
  }


}
