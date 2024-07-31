import {Component, AfterViewInit, OnInit} from '@angular/core';
import {RestApiService} from '../../rest-api.service'
import {CommonService} from '../../common.service'
import {Router} from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-prerecorded',
    templateUrl: './prerecorded.component.html',
    styleUrls: ['./prerecorded.component.css']
})
export class PrerecordedComponent implements OnInit {
    limit: any = 5
    offSet: any = 0
    getPopularCoursesArr: any = []
    FILE_URL: any = ''
    categoryType: any = ''
    category: any = ''
    searchText: any = ''
    getCategoriesArr = [] as any
    getSearchCoursesArr: any = []
    searchLimit = 9
    searchOffSet = 0
    subjectLimit = "50"
    subjectOffSet = "0"
    fetchSubjectArr: any = {}
    subjectKeys: any = []
    ageRangeArr: any = [
        {age: "Beginner"},
        {age: "Intermediate"},
        {age: "Advanced"},
        {age: "7-11"},
        {age: "11-14"},
        {age: "14-16"},
        {age: "16-18"},
        {age: "Adult"},
    ];
    subjectList: any = []
    agerangeList: any = []
    getFeaturedCoursesArr: any = []
    getRecentAddedCoursesArr: any = []
    featuredLimit: any = "10"
    featuredOffset: any = "0"
    categorytype: any = ''
    recentLimit: any = "10"
    recentOffset: any = '0'
    catLimit = "10"
    catOffset = "0";
    isShowMore = true;
    sortingType: any = ''
    searchSpinner: boolean = false
    searchCourseArr: any = []
    sublist: any = []
    agelist: any = []
    limiteducator = 20
    offseteducator = 0
    educatoroftheMonthArr: any = [];
    limitResLive: any = 10
    offsetResLive: any = 0
    totCourse: any = 0
    getRecentAddedLiveCoursesArr: any = [];
    getCategoryTypeArr: any = [];
    getPropularCoursesArr: any = []
    getFeaturedCoursesOfWellBeingArr: any = []
    getPopularLiveCoursesOfAcademicDevelopmentArr: any = []
    slideconfigPopular:any={}
    slideconfigFeatured:any={}
    slideconfigrestAdded:any={}
    slideconfigacademicpopular:any={}
    slideConfig5:any={}
    
    constructor(private router: Router, private rest: RestApiService, public common: CommonService) {
        this.FILE_URL = this.rest.FILE_URL;
    }
    ngOnInit(): void {
        this.getCategoriesFun();
        this.getCategoryTypeFun();
        this.getPopularCoursesFun();
    }

    fetcheducatorOftheMonth(): any {
        const data = {
            "limit": this.limiteducator,
            "offset": this.offseteducator
        }
        this.rest.fetchEducatorOfTheMonth(data).subscribe((res: any) => {
            if (res.success) {
                this.educatoroftheMonthArr = res.response
            }
        })
    }


    getFeaturedCoursesFun(): any {
        const data = {
            "limit": this.featuredLimit,
            "offset": this.featuredOffset,
            "categorytype": this.categorytype
        }
        this.rest.getFeaturedCourses(data).subscribe((result: any) => {
            if (result.success) {
                this.getFeaturedCoursesArr = result.response;
                this.slideconfigFeatured=this.common.getSlickCaroOption(this.getFeaturedCoursesArr);
            } else {
                this.getFeaturedCoursesArr = []
            }
            this.getRecentAddedCourses();
           
        });
    }

    getPopularLiveCourses(): any {
        const data = {
            "limit": this.recentLimit,
            "offset": this.recentOffset,
            "categorytype": this.categorytype
        }
        this.common.loaderStart()
        this.rest.getPopularLiveCourses(data).subscribe((result: any) => {
            this.common.loaderEnd()
            if (result.success) {
                this.getPropularCoursesArr = result.response
            } else {
                this.getPropularCoursesArr = []
            }
        })
    }


    getFeaturedCoursesOfWellBeing(): any {
        const data = {
            "limit": this.recentLimit,
            "offset": this.recentOffset,
        }
        this.rest.getFeaturedCoursesOfWellBeing(data).subscribe((result: any) => {
            if (result.success) {
                this.getFeaturedCoursesOfWellBeingArr = result.response
                this.slideConfig5=this.common.getSlickCaroOption(this.getFeaturedCoursesOfWellBeingArr);
            } else {
                this.getFeaturedCoursesOfWellBeingArr = []
            }
        })
    }


    getPopularLiveCoursesOfAcademicDevelopment(): any {
        const data = {
            "limit": this.recentLimit,
            "offset": this.recentOffset,
        }
        this.rest.getPopularLiveCoursesOfAcademicDevelopment(data).subscribe((result: any) => {
            this.common.loaderEnd()
            if (result.success) {
                this.getPopularLiveCoursesOfAcademicDevelopmentArr = result.response
                this.slideconfigacademicpopular=this.common.getSlickCaroOption(this.getPopularLiveCoursesOfAcademicDevelopmentArr);
            } else {
                this.getPopularLiveCoursesOfAcademicDevelopmentArr = []
            }
        })
    }

    getRecentAddedCourses(): any {
        const data = {
            "limit": this.limitResLive,
            "offset": this.offsetResLive
        }
        this.rest.getRecentAddedCourses(data).subscribe((result: any) => {
            this.common.pageLoadEnd('p-loaded');
            if (result.success) {
                this.getRecentAddedLiveCoursesArr = result.response
                this.slideconfigrestAdded=this.common.getSlickCaroOption(this.getRecentAddedLiveCoursesArr);
            } else {
                this.getRecentAddedLiveCoursesArr = []
            }
            this.getPopularLiveCoursesOfAcademicDevelopment()
           
        })
    }


    fetchSubjectFun(): any {
        const data = {
            "limit": this.subjectLimit,
            "offset": this.subjectOffSet
        }
        this.rest.fetchSubject(data).subscribe((result: any) => {
            if (result.success) {
                let temp: any = result.response;
                const groupedSubject: any = this.groupBy(temp, 'parentName');
                this.fetchSubjectArr = groupedSubject;
                let tempArr = Object.keys(groupedSubject);
                tempArr[tempArr.indexOf('null')] = 'Other';
                tempArr.sort();
                let resultArr = [];
                for (let key of tempArr) {
                    resultArr.push({"objKey": key, "isView": false})
                }
                this.subjectKeys = resultArr

            } else {
                this.fetchSubjectArr = []
            }
        })
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
            this.filterCourse(1);
            this.fetchSubjectFun();
        })
    }

    getPopularCoursesFun(): any {
        const data = {
            "limit": this.limit,
            "offset": this.offSet
        }
        this.common.loaderStart()
        this.rest.getPopularCourses(data).subscribe((result: any) => {
            if (result.success) {
                this.getPopularCoursesArr = result.response;
                this.slideconfigPopular=this.common.getSlickCaroOption(this.getPopularCoursesArr)
            } else {
                this.getPopularCoursesArr = []
            }
            this.getFeaturedCoursesFun();
           
        })
    }
    subjectCheckFun(e: any, i: any): any {
        this.getSearchCoursesArr=[]
        if (e.target.checked) {
            this.sublist.push(e.target.value)
        } else {
            for (const [index, data] of this.subjectList.entries()) {
                if (data === e.target.value) {
                    this.sublist.splice(index, 1)
                }
            }
        }
        this.subjectList = this.sublist
        this.filterCourse(1)
    }


    ageCheckFun(e: any, i: any): any {
        this.getSearchCoursesArr=[]
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

    onShowMore() {
        this.searchOffSet += this.searchLimit;
        this.filterCourse();
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


    onSearchFun(): any {
        if(this.searchText.length < 3) {
            this.searchCourseArr = []
            this.searchSpinner = false;
            return false;
        }
        const data = {
            "categoryType": this.categoryType,
            "category": this.category,
            "searchText": this.searchText,
            "limit": this.searchLimit,
            "offset": this.searchOffSet+'',
            "subjectList": this.subjectList,
            "agerangeList": this.agerangeList,
            "sortingType": this.sortingType,
            "isLive": '0'
        };
        this.searchSpinner = true;
        this.rest.searchCourse(data).subscribe((res: any) => {
            if (res.success) {
                this.searchCourseArr = res.response.courseList;
                this.searchSpinner = false
            } else {
                this.searchCourseArr = []
                this.searchSpinner = false
            }
        }, (err: any) => {
            this.searchSpinner = false
        });
    }

    filterCourse(flag = 0): any {
        const data = {
            "categoryType": this.categoryType,
            "category": this.category,
            "searchText": this.searchText,
            "limit": this.searchLimit,
            "offset": this.searchOffSet+'',
            "subjectList": this.subjectList,
            "agerangeList": this.agerangeList,
            "sortingType": this.sortingType,
            "isLive": '0'
        };
        this.rest.searchCourse(data).subscribe((result: any) => {
            if (result.success) {
                if (flag === 1) {
                    if(this.searchOffSet === 0) {
                        this.totCourse = result.response.totalCount;
                    }
                    this.getSearchCoursesArr = result.response.courseList;
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

    runFilterSortBy(type: string): any {
        this.sortingType = type;
        this.filterCourse(1)
    }


    goto(path: any): any {
        this.common.navigate([path]);
        window.scrollTo(0,0)

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

    onColapsSubject(id: any, i:any): any {
        for (let [index,data] of this.subjectKeys.entries()) {
            if (index === i) {
                if (data.isView) {
                    data.isView = false
                } else {
                    data.isView = true
                }
            }
        }
    }

    gotoOnline(): any {
        this.common.navigate(['/using-ueg'])
        localStorage.setItem('tab', '1');
    }

    joinaclass(): any {
        this.common.navigate(['/using-ueg'])
        localStorage.setItem('tab', '2');
    }


    bookeducator(): any {
        this.common.navigate(['/using-ueg'])
        localStorage.setItem('tab', '3');

    }

    gotoSchool(): any {
        this.common.navigate(['/using-ueg'])
        localStorage.setItem('tab', '4');

    }


    gototAbout(): any {
        this.common.navigate(['/about-ueg'])
    }


}
