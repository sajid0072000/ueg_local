import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from "angular-notifier";


@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

    @ViewChild('deleteModal') deleteModal: any;
    offset = 0;
    limit = 20;
    coursesList: any = [];
    courseid = '' as any;
    selectedVal: any = 20;
    public pageList: Array<any> = [
        { name: '10', value: '10' },
        { name: '15', value: '15' },
        { name: '20', value: '20' },
        { name: '30', value: '30' },
        { name: '50', value: '50' }
    ];
    searchText = '' as any;
    FILE_ROOT = '';
    Video_URL = '';

    propularArr: any = [
        { value: null, name: "Not Set" },
        { value: "0", name: "Not Set" },
        { value: "1", name: "True" }
    ]
    featuredArr: any = [
        { value: null, name: "Not Set" },
        { value: '0', name: "Not Set" },
        { value: "1", name: "True" }
    ]

    roleid: any = '';
    userId: any = '';
    activeBtn: boolean = true;

    headerArr: any = [
        { name: 'Course Name', sortFlag: 0, colname:'name'},
        { name: 'Popular', sortFlag: 0, colname:'popular'},
        { name: 'Featured', sortFlag: 0, colname:'featured'},
        { name: 'Hidden', sortFlag: 0, colname:'hidden'},
        { name: 'Course Type', sortFlag: 0, colname:'islive'},
    ];
    
    previousBtnDesable: boolean = true;
    nextBtnDesable: boolean = false;

    constructor(
        private router: Router,
        private restapi: RestApiService,
        public common: CommonService,
        private modalService: NgbModal,
        private notifierService: NotifierService
    ) {
        this.FILE_ROOT = this.restapi.FILE_URL;
        this.Video_URL = this.restapi.Video_URL;
    }


    ngOnInit(): void {
        window.scrollTo(0, 0);
        this.getCourses();
        this.roleid = this.common.getRoleId();
        this.userId = this.common.getUserId();
    }


    getCourses(item: any = null): any {
        let sortObj: any = {}
        if (item != null) {
            if (item.sortFlag == 0) {
                item.sortFlag = 1;
            } else {
                item.sortFlag = item.sortFlag == 1 ? 2 : 1;
            }
            sortObj['column'] = item.colname;
            sortObj['type'] = item.sortFlag == 1 ? 'asc' : 'desc';
        }

        let obj = {
            'offset': this.offset + '',
            'limit': this.limit,
            'searchText': this.searchText,
            'sort': item ? sortObj : null
        }
        this.common.loaderStart();
        this.restapi.getCourses(obj).subscribe((res: any) => {
            this.common.loaderEnd();
            if (res.success) {
                console.log(res);
                if (res.response) {
                    if (res.response.length > 0) {
                        this.coursesList = res.response;
                        this.nextBtnDesable = res.response.length < this.limit;                        
                    } else {
                        this.coursesList=[]
                        this.nextBtnDesable = true;
                        this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
                    }
                } else {
                    this.nextBtnDesable = true;
                }
            } else {
                this.coursesList = [];
            }
        });
    }


    changePagelimit(event: any): any {
        this.offset = 0;
        this.limit = Number(event.target.value);
        const currentSortItem = this.headerArr.find((item: any) => item.sortFlag !== 0);
        if(currentSortItem) {
          currentSortItem.sortFlag = currentSortItem.sortFlag === 1 ? 2 : 1;
        }
        this.getCourses(currentSortItem);
    }

    previousPage(): any { 
        this.offset = this.offset > 0 ? this.offset - this.limit : 0;
        this.offset = this.offset < 0 ? 0 : this.offset;
        const currentSortItem = this.headerArr.find((item: any) => item.sortFlag !== 0);
        if(currentSortItem) {
          currentSortItem.sortFlag = currentSortItem.sortFlag === 1 ? 2 : 1;
        }
        this.getCourses(currentSortItem);
        if (this.offset <= 0) {
          this.previousBtnDesable = true;
        }
      }

      nextPage(): any {
        this.previousBtnDesable = false;
        this.offset = this.offset + this.limit;
        const currentSortItem = this.headerArr.find((item: any) => item.sortFlag !== 0);
        if (currentSortItem) {
            currentSortItem.sortFlag = currentSortItem.sortFlag === 1 ? 2 : 1;
        }
        this.getCourses(currentSortItem);
      }

    add(): any {
        this.router.navigate(['admin/app/add-course/0'])
    }

    edit(item: any): any {
        this.router.navigate(['admin/app/add-course/' + item.courseid]);
    }


    delete(): any {
        const data = {
            "userid": this.common.getUserId(),
            "courseid": this.courseid
        }
        this.common.loaderStart();
        this.restapi.deleteCourse(data).subscribe((res: any) => {
            this.common.loaderEnd();
            console.log(res.response);
            if (res.success) {
                this.notifierService.notify('success', res.message);
                this.getCourses()
                this.closeModal()
            } else {
                this.notifierService.notify('error', res.message);
            }
        })

    }

    onClickDelete(id: any): any {
        this.courseid = id
        this.modalService.open(this.deleteModal, { centered: true, size: 'md' });
    }

    closeModal(): any {
        this.courseid = '';
        this.modalService.dismissAll();
    }

    approve(e: any): any {
        const checked = e.target.checked == 0 ? 0 : 1;
        const checkedValue = e.target.value;
        var data = {
            "userid": this.common.getUserId(),
            "courseid": checkedValue,
            "approvedby": this.common.getUserId(),
            "approved": checked
        }
        this.common.loaderStart();
        this.restapi.enableApproveCourse(data).subscribe((res: any) => {
            this.common.loaderEnd();
            if (res.success) {
                this.getCourses()
                this.notifierService.notify('success', res.message);
            } else {
                this.notifierService.notify('error', res.message);
            }
        });
    }
    enableActive(e: any): any {
        const checked = e.target.checked == 0 ? 0 : 1;
        const checkedValue = e.target.value;
        var data = {
            "userid": this.common.getUserId(),
            "courseid": checkedValue,
            "active": checked
        }
        this.common.loaderStart();
        this.restapi.enableActiveCourse(data).subscribe((res: any) => {
            this.common.loaderEnd();
            if (res.success) {
                this.notifierService.notify('success', res.message);
                this.getCourses()
            } else {
                this.notifierService.notify('error', res.message);
            }
        });
    }

    enableHidden(e: any): any {
        const checked = e.target.checked ? 1 : 0;
        const courseid = e.target.value;
        const data = {
          userid: this.common.getUserId(),
          courseid: courseid,
          hidden: checked
        };
      
        this.common.loaderStart();
        this.restapi.enableHiddenCourse(data).subscribe((res: any) => {
          this.common.loaderEnd();
          if (res.success) {
            this.notifierService.notify('success', res.message);
            this.getCourses(); // Optionally refresh the course list
          } else {
            this.notifierService.notify('error', res.message);
          }
        });
    }

    updatePopular(item: any): any {
        if(this.common.getRoleId() == 2) {
            return false;
        }
        const data = {
            userid: this.common.getUserId(),
            courseid: item.courseid,
            popular: item.popular
        };

        this.common.loaderStart();
        this.restapi.updateCoursePopular(data).subscribe((res: any) => {
            this.common.loaderEnd();
            if (res.success) {
                this.notifierService.notify('success', res.message);
            } else {
                this.notifierService.notify('error', res.message);
            }
        });
    }

    updateFeatured(item: any): any {
        if(this.common.getRoleId() == 2) {
            return false;
        }
        const data = {
            userid: this.common.getUserId(),
            courseid: item.courseid,
            featured: item.featured
        };

        this.common.loaderStart();
        this.restapi.updateCourseFeatured(data).subscribe((res: any) => {
            this.common.loaderEnd();
            if (res.success) {
                this.notifierService.notify('success', res.message);
            } else {
                this.notifierService.notify('error', res.message);
            }
        });
    }

    search(): any {
        if (this.searchText.length >= 3) {
            this.getCourses();
        }
        if (this.searchText.length == 0) {
            this.getCourses();
        }
    }
}
