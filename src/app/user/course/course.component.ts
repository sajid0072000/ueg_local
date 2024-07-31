import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {

  courseid='' as any
  courseDetails={} as any
  FILE_URL = '' as any;
  createdByAuthor='' as any
  createdByAuthorImg='' as any


  constructor(
    private router: Router,
    private restapi: RestApiService,
    private actroute: ActivatedRoute,
    private notifierService: NotifierService,
    public common: CommonService,


  ) {
    this.FILE_URL = this.restapi.FILE_URL;
  }

  ngOnInit(): void {
    this.courseid = this.common.decryptParams(this.actroute.snapshot.params['id']);

    this.courseDetailsOnboarding()

  }


  courseDetailsOnboarding(): any {
    var data = {
      "courseid": this.courseid
    }
    this.common.loaderStart();
    this.restapi.courseDetailsOnboarding(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        let tot = 0
        let objRes= res.response
        let arr = objRes.lessionDetails
        for(let data of arr){
          let subtot= 0
          for(let obj of data.List){
            if(obj.type == "unit"){
              subtot = subtot + obj.minute
            }
            tot = subtot
          }
          data.totalMin = tot
        }
        this.courseDetails = objRes

        for(var [index,data] of objRes.educatorDetails.entries()){


        this.createdByAuthor = index==0?data.educatorname: null

        this.createdByAuthorImg = index==0?data.educatorphotouri: null


        }

      }else{
        this.courseDetails ={}
      }
    });
  }



}
