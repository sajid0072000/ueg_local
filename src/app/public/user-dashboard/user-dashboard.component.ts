import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent  implements OnInit{
  id: any = '';
  searchText: any = ''
  categoryType: any = ''
  category: any = ''
  searchSpinner: boolean = false
  searchCourseArr: any = []
  searchLimit:number=6
  subjectList: any = []
  agerangeList: any = []
  sortingType: any = ''
  totCourse: any = '';
  getSearchCoursesArr: any = []
  sublist: any = [];
  isLive: string | null = '0';
  isShowMore:any = true;
  searchOffSet:number= 0
  prerecordedArr:any=[]
  prerecordedLimit:number=6
  prerecordedOffset:number=0
  resourcecategory: any = [];
  resourseLimit:number=6;
  resourceOffset:number=0;
  resourceArr:any=[]
  getCategoryTypeArr:any=[]
  constructor(public common:CommonService, private rest:RestApiService , private router:Router, private route:ActivatedRoute){}
  ngOnInit(): void {
    this.getLiveCourse()
    this.prerecordedCourse()
    this.getResources()
    this.getCategoryTypeFun();
  }

onSearchFun(): any {
  const data = {
      "categoryType": this.id,
      "category": this.category,
      "searchText": this.searchText,
      "limit": this.searchLimit,
      "offset": this.searchOffSet + '',
      "subjectList": this.subjectList,
      "agerangeList": this.agerangeList,
      "sortingType": this.sortingType
  }
  this.searchSpinner = true;
  this.rest.searchLiveCourse(data).subscribe((res: any) => {
      if (res.success) {
          this.searchCourseArr = res.response.courseList;
          this.searchSpinner = false
      }
      else {
          this.searchCourseArr = []
          this.searchSpinner = false
      }
  });
}


getLiveCourse():any{
  const data = {
    "categoryType": this.id,
    "categories": this.sublist,
    "searchText": this.searchText,
    "limit": this.searchLimit,
    "offset": this.searchOffSet + '',
    "subjectList": [],
    "agerangeList": this.agerangeList,
    "sortingType": this.sortingType,
    "isLive": 1
  }
  this.common.loaderStart()
  this.rest.searchLiveCourse(data).subscribe((res:any) => {
    this.common.loaderEnd();
   if(res.success){
    if (this.searchOffSet === 0) {
      this.totCourse = res.response.count;
    }
      for(let item of res.response.courseList){
        this.getSearchCoursesArr.push(item);        
      }
      this.isShowMore = res.response.courseList.length >= this.searchLimit;
  }
  })
}


prerecordedCourse():any{
 const data = {
  "categoryType": this.categoryType,
  "category": this.category,
  "searchText": this.searchText,
  "limit": this.prerecordedLimit,
  "offset": this.prerecordedOffset+'',
  "subjectList": this.subjectList,
  "agerangeList": this.agerangeList,
  "sortingType": this.sortingType,
  "isLive": '0'
} 
this.common.loaderStart()
this.rest.searchCourse(data).subscribe((res:any) => {
  this.common.loaderEnd();
 if(res.success){
  if (this.prerecordedOffset === 0) {
    this.totCourse = res.response.count;
  }
    for(let item of res.response.courseList){
      this.prerecordedArr.push(item);      
    }
    this.isShowMore = res.response.courseList.length >= this.prerecordedLimit;
}
})
}



getResources(): any {
  const data = {
    "limit": this.resourseLimit,
    "offset": this.resourceOffset,
    "resourcecategory": this.resourcecategory,
    "sortingType": this.sortingType
  };
  this.common.loaderStart()
  this.rest.getResources(data).subscribe((res:any) => {
    this.common.loaderEnd();
   if(res.success){
    if (this.searchOffSet === 0) {
      this.totCourse = res.response.count;
    }
      for(let item of res.response.resourceList){
        this.resourceArr.push(item);
      }
      this.isShowMore = res.response.resourceList.length >= this.resourseLimit;
  }
  })
}


onShowMore() {
  this.searchOffSet += this.searchLimit;
  this.getLiveCourse();
}

onShowMoreprecorded(){
  this.prerecordedOffset += this.prerecordedLimit;
  this.prerecordedCourse();
}

onShowmoreresources(){
  this.resourceOffset +=this.resourseLimit;
  this.getResources()
}

goto(path: any): any {
  this.common.navigate([path]);
}

gototAbout(): any {
  this.common.navigate(['/about-ueg'])

}


getCategoryTypeFun(): any {
  const data = {
      "searchText": this.searchText
  }
  this.rest.getCategoryType(data).subscribe((result: any) => {
      if (result.success) {
          this.getCategoryTypeArr = result.response
      } else {
          this.getCategoryTypeArr = []
      }
  })
}

}
