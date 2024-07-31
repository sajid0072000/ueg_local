import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../rest-api.service'
import { CommonService } from '../../common.service'
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-educators',
  templateUrl: './educators.component.html',
  styleUrls: ['./educators.component.css']
})
export class EducatorsComponent {

  id: any = ''
  FILE_URL: any = ''
  categoryDetails: any = {}
  totCourse: any = ''
  subjectLimit = "50"
  subjectOffSet = "0"
  fetchSubjectArr: any = [];
  subjectKeys: any = []
  propularLimit: any = 10
  propularOffset: any = 0
  getPopularEducatorsArr: any = []
  featuredLimit: any = 10
  featuredOffset: any = 0
  getFeaturedEducatorssArr: any = []
  limitfilterEducator: any = 12;
  offsetfilterEducator: any = 0;
  subjectList: any = [];
  sortingType: any = '';
  totEducator: any = '';
  getSearchEducatorsArr: any = [];
  isShowMore: any = true;
  slideConfig1:any={}
  slideConfig2:any={}
  searchText: any = ''

  searchCourseArr: any = []
  searchSpinner: boolean = false
  searchLimit = "9"
  searchOffSet = "0"
  constructor(private route: ActivatedRoute, private rest: RestApiService, public common: CommonService, private router: Router) {
    this.FILE_URL = this.rest.FILE_URL;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCategoryTypeById();
    setTimeout(() => {
      this.getPopularEducators();
      this.getCategories();
    }, 100);
  }


  getCategoryTypeById(): any {
    const data = {
      "categoryTypeId": this.id
    }
    this.rest.getCategoryTypeById(data).subscribe((result: any) => {
      if (result.success) {
        this.categoryDetails = result.response
      }
    })
  }

  onColapsSubject(id: any, i: any): any {
    for (let [index, data] of this.subjectKeys.entries()) {
      if (index === i) {
        if (data.isView) {
          data.isView = false
        } else {
          data.isView = true
        }
      }
    }
  }
  sublist: any = [];

  subjectCheckFun(e: any, i: any): any {
    this.getSearchEducatorsArr=[]
    if (e.target.checked) {
      this.sublist.push(e.target.value)
    } else {
      for (const [index, data] of this.subjectList.entries()) {
        if (data === e.target.value) {
          this.sublist.splice(index, 1)
        }
      }
    }
    this.subjectList = this.sublist;
    this.filterEducator(1)
  }

  runFilterSortBy(type: string): any {
    this.sortingType = type;
    this.filterEducator(1)
  }

  goto(path: any): any {
    this.common.navigate([path]);

  }

  getCategories(): any {
    const data = {
      searchText: "",
      categoryTypeId: this.id
    };
    this.rest.getSpecificCategoryForEducator(data).subscribe((res: any) => {
      if (res.success) {
        this.fetchSubjectArr = res.response;
        this.fetchSubjectArr.sort((a: any, b: any) => {
          if ( a.name < b.name ){
            return -1;
          }
          if ( a.name > b.name ){
            return 1;
          }
          return 0;
        });
      }
    });
  }

  groupBy(objectArray: any, property: any) {
    return objectArray.reduce(function (acc: any, obj: any) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }



  getPopularEducators(): any {
    const data = {
      "limit": this.propularLimit,
      "offset": this.propularOffset,
      "categorytype": this.id
    }
    this.common.loaderStart()
    this.rest.getPopularEducators(data).subscribe((result: any) => {

      if (result.success) {
        this.getPopularEducatorsArr = result.response;
        this.slideConfig1=this.common.getSlickCaroOption(this.getPopularEducatorsArr)

      } else {
        this.getPopularEducatorsArr = []
      }
      this.getFeaturedEducators();
    
    })
  }

  getFeaturedEducators(): any {
    const data = {
      "limit": this.featuredLimit,
      "offset": this.featuredOffset,
      "categorytype": this.id
    }
    this.rest.getFeaturedEducators(data).subscribe((result: any) => {
      this.common.pageLoadEnd('p-loaded');
      if (result.success) {
        this.getFeaturedEducatorssArr = result.response
        this.slideConfig2=this.common.getSlickCaroOption(this.getFeaturedEducatorssArr);
      } else {
        this.getFeaturedEducatorssArr = []
      }
      this.filterEducator(1);
    });
  }

  filterEducator(flag = 0): any {
    if(flag === 1){
      this.offsetfilterEducator = 0;
    }
    const data = {
      "categoryType": this.id,
      "limit": this.limitfilterEducator,
      "offset": this.offsetfilterEducator + '',
      "subjectList": this.subjectList,
      "sortingType": this.sortingType,
    };
    this.rest.searchEducator(data).subscribe((result: any) => {
      this.common.loaderEnd();
      if (result.success) {
        if (flag === 1) {
          this.totEducator = result.response.educatorcount
          this.getSearchEducatorsArr = result.response.educatorList;
        } else {
          for (const obj of result.response.educatorList) {            
            this.getSearchEducatorsArr.push(obj);
          }
        }
        this.isShowMore = result.response.educatorList.length >= this.limitfilterEducator;
      }
    });
  }

sercheducatorlist:any=[]
eductorOffset:any=0
educatorLimit:any=9
  serchEducator():any{
    const data ={
      "categoryType": this.id,
      "limit": this.educatorLimit,
      "offset": this.eductorOffset + '',
      "subjectList": this.subjectList,
      "sortingType": this.sortingType,
      "searchText":this.searchText
    }
    this.rest.searchEducator(data).subscribe((result:any) =>{
    this.common.loaderEnd();
    if(result.success){
     this.sercheducatorlist = result.response.educatorList;
    }
    })
  }


  onSearchFun(): any {
    if (this.searchText.length >= 3) {
        this.serchEducator();
    }
    if (this.searchText.length == 0) {
        this.sercheducatorlist=[]
    }
}

SerchClearFun():any{
  this.sercheducatorlist=[]
}
  onShowMore() {
    this.offsetfilterEducator += this.limitfilterEducator;
    this.filterEducator();
  }


  navdivfilter:any=false


  navdivfilterfun(){
      if(this.navdivfilter){
          this.navdivfilter = false
      } else{
          this.navdivfilter=true
      }
  }


  
 

}
