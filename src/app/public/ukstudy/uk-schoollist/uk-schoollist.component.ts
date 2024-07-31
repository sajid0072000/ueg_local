import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../../rest-api.service'
import { CommonService } from '../../../common.service'
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
declare var $: any;

@Component({
  selector: 'app-uk-schoollist',
  templateUrl: './uk-schoollist.component.html',
  styleUrls: ['./uk-schoollist.component.css']
})
export class UkSchoollistComponent implements OnInit {
  id: any = '';
  FILE_URL: any = ''
  isShowMore: boolean = true;
  sublist: any = [];
  sortingType: any = ''
  schlList: any = []
  schoolListArr: any = []
  popularschoolsArr: any = []
  featuredSchoolArr: any = []
  allSchoolsArr: any = []
  filterScoolArr: any = []
  schoolLimit: number = 12
  schoolOffset: number = 0
  totalSchools: number = 0
  slideconfigPopularschool:any={}
  slideconfigFeaturedschool:any={}
  navdivfilter:any=false
  searchText: any = ''
  searchCourseArr: any = []
  searchSpinner: boolean = false
  searchLimit = "9"
  searchOffSet = "0"
  serchSchoollist:any=[]
  constructor(private route: ActivatedRoute, private rest: RestApiService, public common: CommonService, private router: Router, private notifierService: NotifierService) {
    this.FILE_URL = this.rest.FILE_URL;
  }

  ngOnInit(): void {
    this.getPopularFeaturedSclFun()
    this.getSchoolFilterFun()
  }

  getPopularFeaturedSclFun(): any {
    const data = {}
    this.rest.getPopularFeaturedScl(data).subscribe((result: any) => {
      this.common.pageLoadEnd('p-loaded');
      if (result.success) {
        this.popularschoolsArr = result.response.popularList;
        this.slideconfigPopularschool=this.common.getSlickCaroOption(this.popularschoolsArr);

        this.featuredSchoolArr = result.response.featuredList
        this.slideconfigFeaturedschool=this.common.getSlickCaroOption(this.featuredSchoolArr);
      } else {
        this.popularschoolsArr = []
        this.featuredSchoolArr = []
      }
      this.filterSchools(1);

    })
  }



  ngAfterViewInit(): void {
  }

  getSchoolFilterFun(): any {
    this.rest.getSchoolFilter().subscribe((result: any) => {
      if (result.success) {
        this.filterScoolArr = result.response
      } else {
        this.filterScoolArr = []
      }
    })
  }

  schoolCheckFun(e: any, i: any): any {
    this.allSchoolsArr=[]
    if (e.target.checked) {
      this.sublist.push(e.target.value)
    } else {
      for (const [index, data] of this.sublist.entries()) {
        if (data === e.target.value) {
          this.sublist.splice(index, 1)
        }
      }
    }
    this.schoolListArr = this.sublist
    this.filterSchools(1)
  }


  filterSchools(flag = 0): any {
    const data = {
      "limit": this.schoolLimit,
      "offset": this.schoolOffset,
      "schoolList": this.schoolListArr,
      "sortingType": this.sortingType,
    };
    this.rest.getSchools(data).subscribe((result: any) => {
      this.common.loaderEnd();
      if (result.success) {
        if (flag === 1) {
          this.totalSchools = result.response.count
          this.allSchoolsArr = result.response.resourceList
        } else {
          for (const obj of result.response.resourceList) {
            this.allSchoolsArr.push(obj);
          }
        }
        this.isShowMore = result.response.resourceList.length >= this.schoolLimit;
      } else {
        this.common.notify("error", result.message);
      }
    })

  }

  runFilterSortBy(type: string): any {
    this.sortingType = type;
    this.filterSchools(1)
  }

  onShowMore() {
    this.schoolOffset += this.schoolLimit;
    this.filterSchools();
  }

  goto(path: any): any {
    this.common.navigate([path]);
    // window.scrollTo(0,0)

  }




  navdivfilterfun(){
      if(this.navdivfilter){
          this.navdivfilter = false
      } else{
          this.navdivfilter=true
      }
  }

  
  serchEducator():any{
    const data ={
      "limit": this.searchLimit,
      "offset": this.searchOffSet,
      "schoolList": this.schoolListArr,
      "sortingType": this.sortingType,
      "searchText":this.searchText
    }
    this.searchSpinner=true
    this.rest.getSchools(data).subscribe((result:any) =>{
    if(result.success){
      this.searchSpinner=false
     this.serchSchoollist = result.response.resourceList;
    }
    })
  }


  onSearchFun(): any {
    if (this.searchText.length >= 3) {
        this.serchEducator();
    }
    if (this.searchText.length == 0) {
        this.serchSchoollist=[]
    }
}

SerchClearFun():any{
  this.serchSchoollist=[]
}


}
