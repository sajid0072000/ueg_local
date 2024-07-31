import { Component, ViewChild, OnInit, AfterViewInit, HostListener, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;


@Component({
  selector: 'app-educator-details',
  templateUrl: './educator-details.component.html',
  styleUrls: ['./educator-details.component.css']
})
export class EducatorDetailsComponent implements OnInit, AfterViewInit {
  activeSection: string = '';



  educatorid: any = '';
  educatorDetailsObj: any = {};
  shortName: string = ''
  getFurtherLiveCoursesArr: any = []
  limit: any = 10
  offset: any = 0
  courseid: any = ''
  categoryType: any = ''
  isNav: boolean = false;
  isActiveDiv: any = '0'
  address: any = "";
  categoryTypeList: any = [];
  teachingsubject: any = [];
  courseList: any = [];
  notFound = false;
  slideConficoursesBy: any = {}
  slideconfigFurther: any = {};
  subjectHeight: number = 0;
  educationHeight: number = 0;
  experianceHeight: number = 0;
  aboutHeight: number = 0;
  furtherCoursesHeight: number = 0;

  constructor(
    private router: Router,
    private restapi: RestApiService,
    private actroute: ActivatedRoute,
    private notifierService: NotifierService,
    public common: CommonService,
    private modalService: NgbModal,
  ) {
  }



  ngOnInit(): void {
    this.educatorid = this.actroute.snapshot.params['id'];
    this.educatorDetails();
  }

  ngAfterViewInit(): void {
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
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection = sectionId;
    }
  }
  scrollAndHighlight(sectionId: string) {
    const sectionElement = document.getElementById(sectionId);
    console.log(sectionId + '1')
    const sectionElement1: any = document.getElementById(sectionId + '1');
    console.log(sectionElement1)
    const paginationFixed = document.getElementById('paginationFixed');
    if (sectionElement && paginationFixed) {
      const paginationOffset = paginationFixed.offsetTop;
      const sectionOffset = sectionElement1.offsetTop - paginationOffset;
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.highlightSection(sectionOffset);
    }
  }


  highlightSection(scrollPosition: number) {
    const sections = ['subjects1', 'education1', 'experience1', 'about1', 'further-courses1'];
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





  educatorDetails(): any {
    const data = {
      educatorid: this.educatorid
    };
    // this.common.loaderStart();
    this.restapi.educatorDetails(data).subscribe((res: any) => {
      this.getFurtherLiveCourses()
      // this.common.loaderEnd();
      if (res.success && res.response) {
        let objRes = res.response;
        this.educatorDetailsObj = objRes;
        this.categoryTypeList = objRes.categoryTypeList;
        this.courseList = objRes.courseList;
        this.slideConficoursesBy = this.common.getSlickCaroOption(this.courseList);

        if (objRes.teachingsubject) {
          this.teachingsubject = JSON.parse(objRes.teachingsubject);
          // for (let item of this.teachingsubject) {
          //   item.subjectsub = item.subjectsub.split(',').join(' , ');
          // }
          for (let i = 0; i < this.teachingsubject.length; i++) {
            let item = this.teachingsubject[i];
            for (let j = 0; j < this.educatorDetailsObj.subjectList.length; j++) {
              let sub = this.educatorDetailsObj.subjectList[j];
              if (item.subjectmain.trim() === sub.name.trim()) {
                // console.log(item.subjectmain)
                let subjectsubArray = item.subjectsub.split(',');
                for (let k = 0; k < sub.levelList.length; k++) {
                  let level = sub.levelList[k].name;
                  let found = false;
                  for (let l = 0; l < subjectsubArray.length; l++) {
                    if (subjectsubArray[l] === level) {
                      found = true;
                      break;
                    }
                  }
                  if (!found) {
                    subjectsubArray.push(level);
                  }
                }
                item.subjectsub = subjectsubArray.join(', ');
                this.educatorDetailsObj.subjectList.splice(j, 1);
                j--;
                break;
              }
            }
            item.subjectsub = item.subjectsub.split(',').join(', ');
          }
        }
        this.address = objRes.address;
        let temp = this.educatorDetailsObj.educatorname.split(' ');
        this.shortName = temp[0]
        if (this.educatorDetailsObj.qualificationList) {
          const qData = this.common.groupBy(this.educatorDetailsObj.qualificationList, 'institutename');
          const keys = Object.keys(qData);
          const newArr: any = [];
          for (const key of keys) {
            newArr.push({
              keyName: key,
              id: qData[key][0].id,
              data: qData[key]
            })
          }
          /* newArr.sort((a: any, b: any) => {
            return a.id - b.id;
          }); */

          for (const d of newArr) {
            if (d.data.length > 1) {
              d.data.sort((a: any, b: any) => {
                return b.time < a.time;
              });
              d.data1 = [];
              const tempobj = d.data[0];
              let qstr = tempobj.levelname + ': ' + tempobj.subjectname;
              if (tempobj.gradeName) {
                qstr += ' (' + tempobj.gradeName + ')';
              }
              tempobj.qList = qstr;
              d.data1.push(tempobj);
              for (let i = 1; i < d.data.length; i++) {
                let e = d.data1.length - 1;
                if (d.data1[e].levelname == d.data[i].levelname && (d.data1[e].time === d.data[i].time || ((Number(d.data1[e].time.split(' - ')[0]) < Number(d.data[i].time.split(' - ')[0]))
                  && Number(d.data1[e].time.split(' - ')[1]) > Number(d.data[i].time.split(' - ')[0])))) {
                  let qstr = d.data[i].subjectname;
                  if (d.data[i].gradeName) {
                    qstr += ' (' + d.data[i].gradeName + ')';
                  }
                  d.data1[e].qList += ', ' + qstr;
                } else {
                  let qList = d.data[i].levelname + ': ' + d.data[i].subjectname;
                  if (d.data[i].gradeName) {
                    qList += ' (' + d.data[i].gradeName + ')';
                  }
                  d.data[i].qList = qList;
                  d.data1.push(d.data[i]);
                }
                if (d.data1[e].time.split(' - ')[1] === d.data[i].time.split(' - ')[0]) {
                  d.data[i].time = d.data1[e].time.split(' - ')[0] + ' - ' + d.data[i].time.split(' - ')[1];
                  d.data1[e].time = '';
                } else if (d.data1[e].time === d.data[i].time && d.data1[e].levelname != d.data[i].levelname) {
                  d.data[i].time = d.data1[e].time.split(' - ')[0] + ' - ' + d.data[i].time.split(' - ')[1];
                  d.data1[e].time = '';
                }
              }
              d.data = d.data1;
            } else if (d.data.length > 0) {

              d.data[0].subjectname = d.data[0].subjectname.split(',').join(', ')
              let qList = d.data[0].levelname + ': ' + d.data[0].subjectname;

              if (d.data[0].gradeName) {
                qList += ' (' + d.data[0].gradeName + ')';
              }
              d.data[0].qList = qList;
            }
          }

          // ================================================================
          let tempTimeArr = [];
          for (let index = 0; index < newArr.length; index++) {
            const element = newArr[index];
            for (let index = 0; index < element.data.length; index++) {
              const el = element.data[index];
              if (el.time != '') {
                tempTimeArr.push(el.time.substr(el.time.length - 4))
              }

            }
          }

          let sortedtempTimeArr = tempTimeArr.sort().reverse();

          let tempFinalArr = [];

          if (sortedtempTimeArr.length > 0) {
            for (let i = 0; i < sortedtempTimeArr.length; i++) {
              const ele = sortedtempTimeArr[i];

              for (let index = 0; index < newArr.length; index++) {
                const element = newArr[index];
                for (let ind = 0; ind < element.data.length; ind++) {
                  const el = element.data[ind];
                  if (el.time.length >= 4) {
                    if (ele == el.time.substr(el.time.length - 4))
                      tempFinalArr.push(element)
                    break;
                  }

                }
              }
            }
          } else {
            tempFinalArr = newArr;
          }

          // ================================================================

          tempFinalArr = [...new Set(tempFinalArr)];

          this.educatorDetailsObj.qualificationList = tempFinalArr;
        }

      } else {
        this.educatorDetailsObj = {};
        this.notFound = true;
      }
    });
  }

  getCommaValue(arr: any): any {
    let temp = []
    for (let [i, d] of arr.entries()) {
      temp.push(d.name)
      if (i == arr.length - 1) {
        return temp.join(', ');
      }
    }
  }


  getFurtherLiveCourses(): any {
    const data = {
      "limit": this.limit,
      "offset": this.offset,
      "categoryType": this.categoryType,
      "currentcourseid": this.courseid,
      "educatorid": this.educatorid
    };
    this.restapi.getFurtherLiveCourses(data).subscribe((res: any) => {
      this.common.pageLoadEnd('p-loaded');
      if (res.success) {
        this.getFurtherLiveCoursesArr = res.response;
        this.slideconfigFurther = this.common.getSlickCaroOption(this.getFurtherLiveCoursesArr);

      } else {
        this.getFurtherLiveCoursesArr = []
      }
    });
  }

  goto(path: any): any {
    this.common.navigate([path]);
    window.scrollTo(0, 0)

  }

  contactEducator(data: any): any {
    if (!this.common.getUserId()) {
      this.common.sheardData = JSON.stringify(data);
      this.common.contactEducator()
    } else {
      const data = {
        "userid": this.common.getUserId(),
        "sessionid": '',
        "name": '',
        "email": '',
        "mobile": '',
        "educatorid": this.educatorid
      }
      this.common.loaderStart();
      this.restapi.addContactEducatorDetails(data).subscribe(
        (res: any) => {
          this.common.loaderEnd();
          if (res.success) {
            if (res.status === 1004) {
              this.common.notify("warning", res.message);
            }
            if (res.status === 200) {
              this.common.notify("success", res.message);
            }
          } else {
            this.common.notify("error", res.message);
          }
        },
        (err: any) => {
          this.common.notify("error", err.error.message);
        }
      );
    }

  }

  shareData(): any {
    this.common.sheardData = window.location.href;
    this.common.shareData()
  }
  scrollUp() {
    // window.scrollBy(0, -40);  
    // el.scrollIntoView({behavior: 'smooth', block: 'start' , inline :'start' });

  }

}
