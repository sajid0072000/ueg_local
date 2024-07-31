import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service'
import { CommonService } from '../../common.service'
import { Router } from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    limit: any = 5
    offSet: any = 0
    getPopularCoursesArr: any = []
    FILE_URL: any = ''
    categoryType: any = ''
    category: any = ''
    searchText: any = ''
    getCategoriesArr = [] as any
    getSearchCoursesArr: any = []
    searchLimit = "9"
    searchOffSet = "0"
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
    educatoroftheMonthArr: any = []

    limitResLive: any = 10
    offsetResLive: any = 0
    getRecentAddedLiveCoursesArr: any = []
    scrollPosition: any = '';
    slideConfig1: any = {}
    slideConfig2: any = {}
    slideConfig3: any = {}
    slideConfig4: any = {}
    slideConfig5: any = {}
    bannerImg = '';
    constructor(private router: Router, private rest: RestApiService, public common: CommonService) {
        this.FILE_URL = this.rest.FILE_URL;

    }


    ngOnInit(): void {
        // this.getCategoriesFun()
        this.getPopularLiveCourses()
        this.fetcheducatorOftheMonth();
        // home-banner-mob.png
        if (window.innerWidth <= 1024) {
            this.bannerImg = 'assets/img/home-banner-mob.png';
        } else {
            this.bannerImg = 'assets/img/home-banner.jpg';
        }
        window.addEventListener('resize', (event: any) => {
            if (event.target.innerWidth <= 1024) {
                this.bannerImg = 'assets/img/home-banner-mob.png';
            } else {
                this.bannerImg = 'assets/img/home-banner.jpg';
            }
        });
    }


    fetcheducatorOftheMonth(): any {
        const data = {
            "limit": this.limiteducator,
            "offset": this.offseteducator
        }
        // this.common.loaderStart()
        this.rest.fetchEducatorOfTheMonth(data).subscribe((res: any) => {
            if (res.success) {
                this.educatoroftheMonthArr = res.response
            }
        })
    }


    getPropularCoursesArr: any = []

    getFeaturedCoursesFun(): any {
        const data = {
            "limit": this.featuredLimit,
            "offset": this.featuredOffset,
            "categorytype": this.categorytype
        }
        // this.common.loaderStart()
        this.rest.getFeaturedLiveCourses(data).subscribe((result: any) => {
            // this.common.loaderEnd()
            if (result.success) {
                this.getFeaturedCoursesArr = result.response
                this.slideConfig2 = this.common.getSlickCaroOption(this.getFeaturedCoursesArr)
            } else {
                this.getFeaturedCoursesArr = []
            }
            this.getRecentAddedLiveCourses()

        })
    }

    getPopularLiveCourses(): any {
        const data = {
            "limit": this.recentLimit,
            "offset": this.recentOffset,
            "categorytype": this.categorytype
        }
        this.common.loaderStart()
        this.rest.getPopularLiveCourses(data).subscribe((result: any) => {
            if (result.success) {
                this.getPropularCoursesArr = result.response;
                this.slideConfig1 = this.common.getSlickCaroOption(this.getPropularCoursesArr)

            } else {
                this.getPropularCoursesArr = []
            }
            this.getFeaturedCoursesFun();

        })
    }

    getFeaturedCoursesOfWellBeingArr: any = []

    getFeaturedCoursesOfWellBeing(): any {
        const data = {
            "limit": this.recentLimit,
            "offset": this.recentOffset,
        }
        this.common.loaderStart()
        this.rest.getFeaturedCoursesOfWellBeing(data).subscribe((result: any) => {
            // this.common.loaderEnd()
            if (result.success) {
                this.getFeaturedCoursesOfWellBeingArr = result.response;
                this.slideConfig3 = this.common.getSlickCaroOption(this.getFeaturedCoursesOfWellBeingArr)

                // this.design4()
            } else {
                this.getFeaturedCoursesOfWellBeingArr = []
            }
        })
    }
    getPopularLiveCoursesOfAcademicDevelopmentArr: any = []

    getPopularLiveCoursesOfAcademicDevelopment(): any {
        const data = {
            "limit": this.recentLimit,
            "offset": this.recentOffset,
        }
        // this.common.loaderStart()
        this.rest.getPopularLiveCoursesOfAcademicDevelopment(data).subscribe((result: any) => {
            this.common.pageLoadEnd('p-loaded');
            if (result.success) {
                this.getPopularLiveCoursesOfAcademicDevelopmentArr = result.response;
                this.slideConfig4 = this.common.getSlickCaroOption(this.getPopularLiveCoursesOfAcademicDevelopmentArr)

            } else {
                this.getPopularLiveCoursesOfAcademicDevelopmentArr = []
            }

        })
    }


    getRecentAddedLiveCourses(): any {
        const data = {
            "limit": this.limitResLive,
            "offset": this.offsetResLive
        }
        // this.common.loaderStart()
        this.rest.getRecentAddedLiveCourses(data).subscribe((result: any) => {
            // this.common.loaderEnd()
            if (result.success) {
                this.getRecentAddedLiveCoursesArr = result.response;
                this.slideConfig5 = this.common.getSlickCaroOption(this.getRecentAddedLiveCoursesArr)

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
        this.common.loaderStart()
        this.rest.fetchSubject(data).subscribe((result: any) => {
            this.common.loaderEnd()
            if (result.success) {
                let temp: any = result.response;
                const groupedSubject: any = this.groupBy(temp, 'parentName');
                this.fetchSubjectArr = groupedSubject;
                let tempArr = Object.keys(groupedSubject);
                tempArr[tempArr.indexOf('null')] = 'Other';
                tempArr.sort();
                let resultArr = [];
                for (let key of tempArr) {
                    resultArr.push({ "objKey": key, "isView": false })
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
        this.common.loaderStart()
        this.rest.getTopCategories(data).subscribe((result: any) => {
            this.common.loaderEnd()
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

    getPopularCoursesFun(): any {
        const data = {
            "limit": this.limit,
            "offset": this.offSet
        }
        this.common.loaderStart()
        this.rest.getPopularCourses(data).subscribe((result: any) => {
            this.common.loaderEnd()
            if (result.success) {
                this.getPopularCoursesArr = result.response
                // this.prerecoredDesignCarosoal()
            } else {
                this.getPopularCoursesArr = []
            }
        })
    }


    subjectCheckFun(e: any, i: any): any {
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
    onSearchFun(): any {
        if (this.searchText.length < 3) {
            this.searchCourseArr = [];
            this.searchSpinner = false
            return false;
        }

        const data = {
            "categoryType": this.categoryType,
            "category": this.category,
            "searchText": this.searchText,
            "limit": this.searchLimit,
            "offset": this.searchOffSet,
            "subjectList": this.subjectList,
            "agerangeList": this.agerangeList,
            "sortingType": this.sortingType
        };
        this.searchSpinner = true
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

    filterCourse(flag = 0): any {
        const data = {
            "categoryType": this.categoryType,
            "category": this.category,
            "searchText": this.searchText,
            "limit": this.searchLimit,
            "offset": this.searchOffSet,
            "subjectList": this.subjectList,
            "agerangeList": this.agerangeList,
            "sortingType": this.sortingType
        };
        this.common.loaderStart();
        this.rest.searchCourse(data).subscribe((result: any) => {
            this.common.loaderEnd();
            if (result.success) {
                if (flag === 1) {
                    this.getSearchCoursesArr = result.response.courseList;
                } else {
                    for (const obj of result.response.courseList) {
                        this.getSearchCoursesArr.push(obj);
                    }
                }

                this.isShowMore = result.response.length >= this.searchLimit;
            }
        })

    }

    runFilterSortBy(): any {
        this.sortingType = "A-Z"
        this.filterCourse(1)
    }


    goto(path: any): any {
        this.common.navigate([path]);
        // this.router.navigate([path]);
        // window.scrollTo(0,0)
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

    onColapsSubject(id: any): any {

        for (let data of this.subjectKeys) {
            if (data.objKey == id) {
                if (data.isView) {
                    data.isView = false
                } else {
                    data.isView = true
                }
            } else {
                data.isView = false
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
