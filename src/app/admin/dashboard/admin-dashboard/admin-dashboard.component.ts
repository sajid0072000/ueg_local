import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  limit = 20
  offset = 0
  activityArr: any = []

  previousBtnDesable: boolean = true;
  nextBtnDesable: boolean = false;
  selectedVal: any = 20;

  public pageList: Array<any> = [
    { name: '10', value: '10' },
    { name: '15', value: '15' },
    { name: '20', value: '20' },
    { name: '30', value: '30' },
    { name: '50', value: '50' }
  ];

  roleArr: any = [];
  rolid: any = '';

  constructor(private rest: RestApiService, public common: CommonService, private notifierService: NotifierService, private router: Router) { }
  ngOnInit(): void {
    this.getactivityLog();
    this.roleArr = this.common.getRoleArr();
    this.rolid = this.common.getRoleId();

  }

  changeRole():any{
    sessionStorage.removeItem('roleid')
    sessionStorage.setItem('roleid', this.rolid);
    this.common.Subject.next({});
    this.getactivityLog()
  }

  getactivityLog(): any {
    const data = {
      "limit": this.limit,
      "offset": this.offset
    }
    this.common.loaderStart();
    this.rest.getActivityLog(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.activityArr = res.response;
            this.nextBtnDesable = res.response.length < this.limit;
          } else {
            this.nextBtnDesable = true;
            this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          }
        } else {
          this.nextBtnDesable = true;
        }
      } else {
        this.activityArr = []
      }
    }, (err: any) => {
      this.notifierService.notify("error", err.error.message)
    });
  }

  changePagelimit(event: any): any {
    this.offset = 0;
    this.limit = Number(event.target.value);
    this.getactivityLog();
  }

  previousPage(): any {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getactivityLog();
    if (this.offset <= 0) {
      this.previousBtnDesable = true;
    }
  }

  nextPage(): any {
    this.previousBtnDesable = false;
    this.offset = this.offset + this.limit;
    this.getactivityLog();
  }

}
