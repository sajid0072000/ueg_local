import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.css']
})
export class CoursePreviewComponent implements OnInit, OnDestroy {
  @ViewChild('startModuleModal') startModuleModal: any;
  isNav: boolean = false
  isActiveDiv: any = '0'
  menuFlag = 1;
  isLive: string | null = '0';
  courseDetails: any = {};
  categorytype: any = '';
  categoryName: string = '';
  categoriesId: any = ''
  categorytypeid: any = ''
  agerange: any = ''
  educatorid: any = '';
  lessionArr: any = []
  isVideoShow = false;
  lessionCount: any = ''
  totalDuration: any = ''
  courseid: any = ''
  createdByAuthor: any = '';
  createdByAuthorImg: any = '';
  shortname: any = ''
  educatorArr: any = []
  courseicon: any = [];
  activeSection: string = '';
  constructor(
    public common: CommonService,
    private modalService: NgbModal,
    private restapi: RestApiService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    let courseDetails: any = localStorage.getItem('previewcourseData');
    this.courseDetails = JSON.parse(courseDetails);
    this.categorytype = this.courseDetails.coursetypeid;
    this.courseid = this.courseDetails.courseid
    this.courseDetailsOnboarding()
    this.categoryName = this.courseDetails.categoryname;
    this.categoriesId = this.courseDetails.categoriesId;
    this.categorytypeid = this.courseDetails.categorytypeid;
    this.isLive = this.courseDetails.isLive + '';
    this.menuFlag = this.isLive == '0' ? 2 : 1;
    this.agerange = this.courseDetails.agerange ? this.courseDetails.agerange : '';
    this.educatorid = this.courseDetails.educatorList[0].educatorid
    this.lessionCount = this.courseDetails.courseContent.length;
    console.log(this.courseDetails.courseContent)
    if (this.courseDetails.courseContent && this.courseDetails.courseContent.length > 0) {
      this.totalDuration = this.courseDetails.courseContent.map(this.duration).reduce(this.sum);
    }
    if(this.educatorid) {
      this.getEducatorById()
    }
  }

  getEducatorById() {
    const data = {
      educatorid: this.educatorid
    };
    this.restapi.getEducatorById(data).subscribe((res: any) => {
      if(res.success && res.response){
        this.educatorArr = [{
          educatorphotouri: res.response.userphotourl,
          shortname: res.response.shortname,
          educatorsubheading: res.response.educatorsubheading,
          educatorexcerpt: res.response.educatorexcerpt
        }];
        this.createdByAuthorImg = res.response.userphotourl;
        this.createdByAuthor = res.response.shortname;
      }
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const paginationFixed = document.getElementById('paginationFixed');
    if (paginationFixed) {
      const paginationOffset = paginationFixed.offsetTop;
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const adjustedScrollPosition = scrollPosition - paginationOffset;
      this.highlightSection(adjustedScrollPosition);
    }
  }


  // scroll changes
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection = sectionId;
    }
  }
  scrollAndHighlight(sectionId: string) {
    const sectionElement = document.getElementById(sectionId);
    const paginationFixed = document.getElementById('paginationFixed');
    if (sectionElement && paginationFixed) {
      const paginationOffset = paginationFixed.offsetTop;
      const sectionOffset = sectionElement.offsetTop - paginationOffset;
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.highlightSection(sectionOffset);
    }
  }


  highlightSection(scrollPosition: number) {
    const sections = ['course-overview1', 'course-content1', 'key-skills1', 'Educator1', 'further-courses1'];
    const offset = 400;

    this.isNav = scrollPosition > 0;
    if (scrollPosition === 0) {
      return;
    }
    for (let section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const elementTop = element.offsetTop;
        if (scrollPosition >= elementTop - offset) {
          this.activeSection = section;
        }
      }
    }
  }


  isActive(section: string): boolean {
    return this.activeSection === section;
  }


  goto(path: any): any {
    this.common.navigate([path])
  }

  duration(item: any) {
    return item.duration;
  }

  sum(prev: any, next: any) {
    return prev + next;
  }




  courseDetailsOnboarding(): any {
    this.lessionArr = [];
    if (this.courseid) {
      const data = {
        courseid: this.courseid
      };
      this.restapi.courseDetailsOnboarding(data).subscribe((res: any) => {
        if (res.success && res.response) {
          this.educatorArr = res.response.educatorList;
          this.courseicon = res.response.courseicon
          for (const item of this.educatorArr) {
            this.createdByAuthorImg = item.educatorphotouri;
            this.createdByAuthor = item.shortname;
          }
        } else {
          // this.courseDetails = {};
        }
      });
    }
  }




  ngOnDestroy(): void {
    localStorage.removeItem('previewcourseData')
  }
}
