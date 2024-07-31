import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-get-startedlist',
  templateUrl: './get-startedlist.component.html',
  styleUrls: ['./get-startedlist.component.css']
})
export class GetStartedlistComponent  implements OnInit{




  limit=20
  offset=0
  getstartedListArr:any=[]
  dayListArr:any=[]




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
  constructor(private rest:RestApiService, public common:CommonService, private notifierService:NotifierService){}
  ngOnInit(): void {
    this.getLiveCourseSchedule()
  }

  getLiveCourseSchedule(): any {
    const data = {
      "limit":this.limit,
      "offset":this.offset
  }
    this.common.loaderStart();
    this.rest.getLiveCourseSchedule(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
            if(res.response) {
                if (res.response.length > 0) {
                  this.getstartedListArr = res.response;
                  this.nextBtnDesable = res.response.length < this.limit;
                } else {
                  this.nextBtnDesable = true;
                  this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
                }
              } else {
                this.nextBtnDesable = true;
              }
        } else {
            this.getstartedListArr = []
        }
    }, (err: any) => {
        this.notifierService.notify("error", err.error.message)
    });
}

changePagelimit(event: any): any {
  this.offset = 0;
  this.limit = Number(event.target.value);
  this.getLiveCourseSchedule();
}

previousPage(): any {
  this.offset = this.offset > 0 ? this.offset - this.limit : 0;
  this.offset = this.offset < 0 ? 0 : this.offset;
  this.getLiveCourseSchedule();
  if (this.offset <= 0) {
      this.previousBtnDesable = true;
  }
}

nextPage(): any {
  this.previousBtnDesable = false;
  this.offset = this.offset + this.limit;
  this.getLiveCourseSchedule();
}

}
