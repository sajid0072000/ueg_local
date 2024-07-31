import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../rest-api.service'
import { CommonService } from '../../common.service'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, AfterViewInit {
    id: any = '';
    category: any = ''
    searchText: any = ''
    categoryTypeName: any = ''
    getPopularCoursesArr: any = []
    FILE_URL: any = ''
    getCategoriesArr = [] as any
    propularLimit = "10"
    propularOffset = "0"
    featuredLimit = "10"
    featuredOffset = "0"
    categorytype: any = ''
    getFeaturedCoursesArr: any = []
    searchLimit = 12
    searchOffSet = 0
    subjectLimit = "50"
    subjectOffSet = "0"
    fetchSubjectArr: any = {}
    subjectKeys: any = []
    ageRangeArr: any = [
        { age: "Beginner" },
        { age: "Intermediate" },
        { age: "Advanced" },
        { age: "7-11" },
        { age: "11-14" },
        { age: "14-16" },
        { age: "16-18" },
        { age: "Adult" },
    ];
    subjectList: any = []
    agerangeList: any = []
    getSearchCoursesArr: any = []
    catLimit = "10"
    catOffset = "0";
    isShowMore: any = true;
    agelist: any = [];
    sublist: any = [];
    sortingType: any = ''
    searchSpinner: boolean = false
    searchCourseArr: any = []
    categoryDetails: any = {};
    isLive: string | null = '0';
    categoryTreeArr: any = [];
    slideConfigpopular:any = {}
    slideConfigfeatured:any = {}
    slideConfigPrerecordpopular:any={}
    slideconfigfetured:any={}
    slideconfiFeturedlive:any={}
    constructor(private route: ActivatedRoute, private rest: RestApiService, public common: CommonService, private router: Router ) {
        this.FILE_URL = this.rest.FILE_URL;
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.isLive = this.route.snapshot.paramMap.get('isLive');
        this.getCategoryTypeById();
        this.getCategoriesFun();
        setTimeout(() => {
            if (this.isLive == '0') {
                this.getPreRecPopularCoursesFun();
            } else {
                this.getPopularCoursesFun();
            }
            this.fetchSubjectFun()
        }, 100);
        this.getCategoriesTree();
    }



    ngAfterViewInit(): void {
    }


    getCategoriesFun(): any {
        const data = {
            "limit": this.catLimit,
            "offset": this.catOffset
        }
        this.rest.getTopCategories(data).subscribe((result: any) => {
            if (result.success) {
                let temp = result.response
                for (let data of temp) {
                    data.isActive = false
                }
                this.getCategoriesArr = temp
            } else {
                this.getCategoriesArr = []
            }
        })
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

    getCategoriesTree(): void {
        this.rest.getCategoriesTree({ categoryTypeId: this.id }).subscribe((res: any) => {
            if (res.success) {
                for (const obj of res.response) {
                    obj.isView = true;
                }
                this.categoryTreeArr = res.response;
            }
        })
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

    onColapsSubject(id: any, i: any): any {
        for (let [index, data] of this.categoryTreeArr.entries()) {
            if (index === i) {
                if (data.isView) {
                    data.isView = false
                } else {
                    data.isView = true
                }
            }
        }
    }


    subjectCheckFun(e: any, i: any): any {
        this.getSearchCoursesArr=[]
        if (e.target.checked) {
            this.sublist.push(e.target.value)
        } else {
            for (const [index, data] of this.sublist.entries()) {
                if (data === e.target.value) {
                    this.sublist.splice(index, 1)
                }
            }
        }
        // this.subjectList = this.sublist
        this.filterCourse(1)
    }

    ageCheckFun(e: any, i: any): any {
        if (e.target.checked) {
            this.agelist.push(e.target.value)
        } else {
            for (const [index, data] of this.agerangeList.entries()) {
                if (data === e.target.value) {
                    this.agelist.splice(index, 1)
                }
            }
        }
        this.agerangeList = this.agelist
        this.filterCourse(1)
    }

    fetchSubjectFun(): any {
        const data = {
            "limit": this.subjectLimit,
            "offset": this.subjectOffSet
        }
        this.rest.fetchSubject(data).subscribe((result: any) => {
            if (result.success) {
                let temp: any = result.response
                const groupedSubject: any = this.groupBy(temp, 'parentName');
                this.fetchSubjectArr = groupedSubject;
                let tempArr = Object.keys(groupedSubject);
                tempArr[tempArr.indexOf('null')] = 'Other';
                tempArr.sort();
                let resultArr = []
                for (let obj of tempArr) {
                    resultArr.push({ "objKey": obj, "isView": true })
                }
                this.subjectKeys = resultArr
            } else {
                this.fetchSubjectArr = []
            }
        })
    }


    getPopularCoursesFun(): any {
        const data = {
            "limit": this.propularLimit,
            "offset": this.propularOffset,
            "categorytype": this.id
        }
        this.common.loaderStart()
        this.rest.getPopularLiveCourses(data).subscribe((result: any) => {
            if (result.success) {
                this.getPopularCoursesArr = result.response
                this.slideConfigpopular=this.common.getSlickCaroOption(this.getPopularCoursesArr)
            } else {
                this.getPopularCoursesArr = []
            }
            this.getFeaturedCoursesFun();

        })
    }

    getPreRecPopularCoursesFun(): any {
        const data = {
            "limit": this.propularLimit,
            "offset": this.propularOffset,
            "categorytype": this.id
        }
        this.common.loaderStart()
        this.rest.getPopularCourses(data).subscribe((result: any) => {
            if (result.success) {
                this.getPopularCoursesArr = result.response;
                this.slideConfigPrerecordpopular=this.common.getSlickCaroOption(this.getPopularCoursesArr)
            } else {
                this.getPopularCoursesArr = []
            }
            this.getPreFeaturedCoursesFun();
        })
    }

    getPreFeaturedCoursesFun(): any {
        const data = {
            "limit": this.featuredLimit,
            "offset": this.featuredOffset,
            "categorytype": this.id
        }
        this.rest.getFeaturedCourses(data).subscribe((result: any) => {
            if (result.success) {
                this.getFeaturedCoursesArr = result.response;
                this.slideconfigfetured=this.common.getSlickCaroOption(this.getFeaturedCoursesArr)
            } else {
                this.getFeaturedCoursesArr = []
            }
            this.filterCourse(1);
        });
    }
    getFeaturedCoursesFun(): any {
        const data = {
            "limit": this.featuredLimit,
            "offset": this.featuredOffset,
            "categorytype": this.id
        }
        this.rest.getFeaturedLiveCourses(data).subscribe((result: any) => {
            this.common.pageLoadEnd('p-loaded');
            if (result.success) {
                this.getFeaturedCoursesArr = result.response;
                this.slideconfiFeturedlive=this.common.getSlickCaroOption(this.getFeaturedCoursesArr)
            } else {
                this.getFeaturedCoursesArr = []
            }
            this.filterCourse(1);
        })
    }


    onShowMore() {
        this.searchOffSet += this.searchLimit;
        this.filterCourse();
    }

    searchFun(){
        if(this.searchText.length >=3){
            this.searchCourse();
        } else{
            this.searchCourseArr =[];
        }
    }

    searchCourse(): any {
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


    clearFun():any{
        this.searchCourseArr = []
    }

    totCourse: any = '';

    filterCourse(flag = 0): any {
        const data = {
            "categoryType": this.id,
            "categories": this.sublist,
            "searchText": this.searchText,
            "limit": this.searchLimit,
            "offset": this.searchOffSet + '',
            "subjectList": [],
            "agerangeList": this.agerangeList,
            "sortingType": this.sortingType,
            "isLive": this.isLive
        };
        if (this.isLive === '1') {
            this.rest.searchLiveCourse(data).subscribe((result: any) => {
                this.common.loaderEnd();
                if (result.success) {
                    if (flag === 1) {
                        if (this.searchOffSet === 0) {
                            this.totCourse = result.response.count;
                        }
                        this.getSearchCoursesArr = result.response.courseList;
                    } else {
                        for (const obj of result.response.courseList) {
                            this.getSearchCoursesArr.push(obj);
                        }
                    }
                    this.isShowMore = result.response.courseList.length >= this.searchLimit;
                }
            })
        } else {
            this.rest.searchCourse(data).subscribe((result: any) => {
                this.common.loaderEnd();
                if (result.success) {
                    if (flag === 1) {
                        this.totCourse = result.response.length;
                        this.getSearchCoursesArr = result.response;
                    } else {
                        for (const obj of result.response) {
                            this.getSearchCoursesArr.push(obj);
                        }
                    }
                    this.totCourse = this.getSearchCoursesArr.length;

                    this.isShowMore = result.response.length >= this.searchLimit;
                }
            })
        }

    }

    getCategoryFilter(data: any, i: any): any {
        for (const [index, data] of this.getCategoriesArr.entries()) {
            if (index === i) {
                data.isActive = true
            } else {
                data.isActive = false
            }
        }
        this.category = data
        this.filterCourse(1)
    }

    runFilterSortBy(type: string): any {
        this.sortingType = type;
        this.filterCourse(1)
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

}
