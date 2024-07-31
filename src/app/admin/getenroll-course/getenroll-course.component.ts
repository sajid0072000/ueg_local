import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-getenroll-course',
  templateUrl: './getenroll-course.component.html',
  styleUrls: ['./getenroll-course.component.css']
})
export class GetenrollCourseComponent  implements OnInit{
  limit=20
  offset=0
  enrolloncourseListArr:any=[]
 
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

  constructor(private rest:RestApiService , public common:CommonService , private notifierService:NotifierService){

  }

  ngOnInit(): void {
    this.getEnrollOnCourse()
  }



  getEnrollOnCourse(): any {
    const data = {
      "limit":this.limit,
      "offset":this.offset
  }
    this.common.loaderStart();
    this.rest.getEnrollOnCourse(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
            if(res.response) {
                if (res.response.length > 0) {
                  this.enrolloncourseListArr = res.response;
                  this.nextBtnDesable = res.response.length < this.limit;
                } else {
                  this.nextBtnDesable = true;
                  this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
                }
              } else {
                this.nextBtnDesable = true;
              }
        } else {
            this.enrolloncourseListArr = []
        }
    }, (err: any) => {
        this.notifierService.notify("error", err.error.message)
    });
}

changePagelimit(event: any): any {
  this.offset = 0;
  this.limit = Number(event.target.value);
  this.getEnrollOnCourse();
}

previousPage(): any {
  this.offset = this.offset > 0 ? this.offset - this.limit : 0;
  this.offset = this.offset < 0 ? 0 : this.offset;
  this.getEnrollOnCourse();
  if (this.offset <= 0) {
      this.previousBtnDesable = true;
  }
}

nextPage(): any {
  this.previousBtnDesable = false;
  this.offset = this.offset + this.limit;
  this.getEnrollOnCourse();
}

}