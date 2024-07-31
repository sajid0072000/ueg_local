import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
    selector: 'app-uk-universitylist',
    templateUrl: './uk-universitylist.component.html',
    styleUrls: ['./uk-universitylist.component.css']
})
export class UkUniversitylistComponent implements OnInit {

    id: any = '';
    FILE_URL: any = ''
    searchLimit: number = 12
    searchOffSet: number = 0
    isShowMore: any = true;
    sublist: any = [];
    sortingType: any = ''
    universityLimit: number = 12
    universityOffset: number = 0
    popularsUnivercityArrlist: any = []
    featuredUniversityArrList: any = []
    filterUniversityList: any = []
    universityList: any = []
    totalUniversity: number = 0
    allUniversityArrList: any = []
    slideConfigpopularuniversity:any={}
    slideConfigfeatureduniversity:any={}
    searchText: any = ''
    searchCourseArr: any = []
    searchSpinner: boolean = false
    searchuniversityLimit = 9
    searchuniversityOffSet = 0
    serchUniversityList:any=[]
    constructor(private route: ActivatedRoute, private rest: RestApiService, public common: CommonService, private router: Router) {
        this.FILE_URL = this.rest.FILE_URL;
    }

    ngOnInit(): void {
        this.getPopularFeaturedUnvs()
        this.getUniversityFilterFun()
    }
    getPopularFeaturedUnvs(): any {
        const data = {}
        // this.common.loaderStart()
        this.rest.getPopularFeaturedUnvs(data).subscribe((result: any) => {
            this.common.pageLoadEnd('p-loaded');
            if (result.success) {
                this.popularsUnivercityArrlist = result.response.popularList;
                this.slideConfigpopularuniversity = this.common.getSlickCaroOption(this.popularsUnivercityArrlist);

                this.featuredUniversityArrList = result.response.featuredList
                this.slideConfigfeatureduniversity = this.common.getSlickCaroOption(this.featuredUniversityArrList);

            } else {
                this.popularsUnivercityArrlist = []
                this.featuredUniversityArrList = []
            }
            this.filterUnivercitys(1);

        });
    }

    ngAfterViewInit(): void {
    }

    getUniversityFilterFun(): any {
        this.rest.getUniversityFilter().subscribe((result: any) => {
            if (result.success) {
                this.filterUniversityList = result.response
            } else {
                this.filterUniversityList = []
            }
        })
    }



    univeersityCheckFun(e: any, i: any): any {
        this.allUniversityArrList=[]
        if (e.target.checked) {
            this.sublist.push(e.target.value)
        } else {
            for (const [index, data] of this.sublist.entries()) {
                if (data === e.target.value) {
                    this.sublist.splice(index, 1)
                }
            }
        }
        this.universityList = this.sublist
        this.filterUnivercitys(1)
    }



    filterUnivercitys(flag = 0): any {
        const data = {
            "limit": this.universityLimit,
            "offset": this.universityOffset,
            "universityList": this.universityList,
            "sortingType": this.sortingType,
        };
        this.rest.getUniversities(data).subscribe((result: any) => {
            this.common.loaderEnd();
            if (result.success) {
                if (flag === 1) {
                    this.totalUniversity = result.response.count
                    this.allUniversityArrList = result.response.resourceList
                } else {
                    for (const obj of result.response.resourceList) {
                        this.allUniversityArrList.push(obj);
                    }
                }
                this.isShowMore = result.response.resourceList.length >= this.universityLimit;
            }
        })

    }

    runFilterSortBy(type: string): any {
        this.sortingType = type;
        this.filterUnivercitys(1)
    }

    onShowMore() {
        this.universityOffset += this.universityLimit;
        this.filterUnivercitys();
    }

    goto(path: any): any {
        this.common.navigate([path]);
    }


    navdivfilter:any=false


  navdivfilterfun(){
      if(this.navdivfilter){
          this.navdivfilter = false
      } else{
          this.navdivfilter=true
      }
  }



  
  
  serchUniversities():any{
    const data ={
      "limit": this.searchuniversityLimit,
      "offset": this.searchuniversityOffSet,
      "universityList": this.universityList,
      "sortingType": this.sortingType,
      "searchText":this.searchText
    }
    this.rest.getUniversities(data).subscribe((result:any) =>{
    if(result.success){
     this.serchUniversityList = result.response.resourceList;
    }
    })
  }


  onSearchFun(): any {
    if (this.searchText.length >= 3) {
        this.serchUniversities();
    }
    if (this.searchText.length == 0) {
        this.serchUniversityList=[]
    }
}

SerchClearFun():any{
  this.serchUniversityList=[]
}
}
