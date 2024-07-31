import { Component, ViewChild, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;


declare var Hls: any;

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
    @ViewChild('startModuleModal') startModuleModal: any;
    activeSection: string = '';
    courseid: any = '';
    courseDetails: any = {};
    FILE_URL = '';
    Video_URL = '';
    createdByAuthor: any = '';
    createdByAuthorImg: any = '';
    featuredLimit = 10;
    featuredOffset = 0;
    categorytype: any = '';
    getFeaturedCoursesArr: any = [];
    educatorArr: any = []
    selectedLession = 0;
    selectedLessionDetails: any = {};
    selectedLessionDetailsIndex: any = '';
    lessionVideo: any = []
    lessionAttachment: any = []
    lessionQuizzes: any = []
    lessionVideoUrl: any = ''
    educatorid: any = '';
    isLive: string | null = '0';
    categoryName: string = '';
    isSticky: boolean = false;
    menuFlag = 1;
    shortname: any = ''

    categoriesId: any = ''
    getCoursesByCategoryIdArr: any = []

    agerange: any = ''
    categorytypeid: any = ''
    lessionArr: any = []

    isNav: boolean = false
    isActiveDiv: any = '0'

    listFlag:boolean=false
    exerciseid:any=''
    idx:number=0;
    answerArr:any = [];
    score:any = '';
    unitid:any = '';
    notFound = false;
    slideconfigFurtheredcourse:any={}
    slideconfigMorecourses:any={}
    isVideoShow = false;
    
    constructor(
        private router: Router,
        private restapi: RestApiService,
        private actroute: ActivatedRoute,
        private notifierService: NotifierService,
        public common: CommonService,
        private modalService: NgbModal,
    ) {
        this.FILE_URL = this.restapi.FILE_URL;
        this.Video_URL = this.restapi.Video_URL;
    }

    ngOnInit(): void {
        this.courseid = this.actroute.snapshot.params['id'];
        this.courseDetailsOnboarding();
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


    courseDetailsOnboarding(): any {
        this.lessionArr = [];
        const data = {
            courseid: this.courseid
        };
        this.restapi.courseDetailsOnboarding(data).subscribe((res: any) => {
            if (res.success && res.response) {
                let objRes = res.response;
                this.courseDetails = objRes;
                this.categorytype = res.response.coursetypeid;
                this.categoryName = res.response.categoryname;
                this.categoriesId = res.response.categoriesId;
                this.categorytypeid = res.response.categorytypeid;
                this.isLive = res.response.isLive + '';
                this.menuFlag = this.isLive == '0' ? 2 : 1;
                // this.agerange = res.response.agerange ? res.response.agerange.replace(/,\s*$/, "") : '';
                if(res.response.agerange) {
                    this.agerange = res.response.agerange;
                    this.agerange = this.agerange.split(',').join(', ');
                }
                this.educatorid = res.response.educatorList[0].educatorId
                this.getCoursesByCategoryId()
                this.getFeaturedCoursesFun();
                for (const [index, data] of objRes.lessionList.entries()) {
                    if (index === 0) {
                        data.isActive = true
                    } else {
                        data.isActive = false
                    }
                    this.lessionArr.push(data);
                }
                for (const [index, data] of objRes.educatorList.entries()) {
                    if (index === 0) {
                        this.createdByAuthor = data.shortname;
                        this.shortname = data.shortname;
                        this.createdByAuthorImg = data.educatorphotouri;
                        this.educatorArr.push(data)
                    }
                }
                 
                

                setTimeout(() => {
                    let elem: any = document.getElementById("acc-btn0")
                    elem?.click()
                }, 500);




            } else {
                this.courseDetails = {};
                this.notFound = true;
            }
        });
    }

    playVideo(): void {
        this.isVideoShow = true;
        setTimeout(() => {
            if (this.courseDetails.coursevideourl) {
                const video: any = document.createElement('video');
                const vContainer: any = document.getElementById('video-container');
                video.id = 'video';
                video.className = 'urlvideoplayer';
                video.controls = true;
                // video.width = '400';
                video.style.width = '100%';
                // video.height = '350';
                video.style.cursor = 'pointer';
                if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(this.Video_URL + this.courseDetails.coursevideourl);
                    hls.attachMedia(video);
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        video.play();
                    });
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = this.Video_URL + this.courseDetails.coursevideourl;
                    video.addEventListener('loadedmetadata', () => {
                        video.play();
                    });
                }
                if(vContainer) {
                    vContainer.appendChild(video);
                }
            }
        }, 100)
    }

    getFeaturedCoursesFun(): void {
        const data = {
            limit: this.featuredLimit,
            offset: this.featuredOffset,
            categoryType: this.categorytypeid,
            currentcourseid: this.courseid,
            educatorid: this.educatorid,
            isLive: this.isLive,
        };
        this.restapi.getFurtherLiveCourses(data).subscribe((result: any) => {
            if (result.success) {
                this.getFeaturedCoursesArr = result.response;
                this.slideconfigFurtheredcourse=this.common.getSlickCaroOption(this.getFeaturedCoursesArr);

            } else {
                this.getFeaturedCoursesArr = [];
            }
        })
    }


    getCoursesByCategoryId(): void {
        const data = {
            categoriesId: this.categoriesId,
            isLive: this.isLive,
            limit: 10,
            offset: '0'
        };
        this.restapi.getCoursesByCategoryId(data).subscribe((result: any) => {
            this.common.pageLoadEnd('p-loaded');
            if (result.success) {
                this.getCoursesByCategoryIdArr = [];
                for(const obj of result.response){
                    if(obj.courseid != this.courseid){
                        this.getCoursesByCategoryIdArr.push(obj);
                    }
                }
                this.slideconfigMorecourses=this.common.getSlickCaroOption(this.getCoursesByCategoryIdArr);
            } else {
                this.getCoursesByCategoryIdArr = []
            }
        });
    }

    

    getExpFun(data: any, i: any): void {
        this.selectedLession = data.lessionid;
        this.selectedLessionDetails = data
        this.selectedLessionDetailsIndex = i;
    }


    openLession(data: any, i: any , flag : any): void {
        this.selectedLession = data.lessionid;
        this.selectedLessionDetails = data
        this.selectedLessionDetailsIndex = i;
        this.openModule(flag)
    }



    openModule(flag :any = 0): any {
        this.lessionVideo = []
        this.lessionAttachment = []
        this.lessionQuizzes = []
        this.lessionVideoUrl = ''

        const data = {
            "courseid": this.courseid,
            "lessionid": this.selectedLession
        }
        this.common.loaderStart()
        this.restapi.startModule(data).subscribe((result: any) => {
            this.common.loaderEnd()
            if (result.success) {

                let res = result.response;   
                this.unitid = res[0].unitid;
                for (let data1 of res) {
                    if (data1.type === "unit") {
                        this.lessionVideo.push(data1);
                        for (let obj of data1.attachmentDetails) {
                            obj['title'] = data1.unittitle 
                            this.lessionAttachment.push(obj)
                        }
                    }
                    if (data1.type === "exercise") {
                        this.exerciseid = data1.exerciseid
                        for (let x of data1.questionList) {
                            this.lessionQuizzes.push(x);
                        }
                    }
                }
                if (this.lessionVideo.length > 0) {
                    this.lessionVideoUrl = this.lessionVideo[0].videourl;
                }
                if(flag == 0){
                    this.modalService.open(this.startModuleModal, { centered: true, size: 'lg' , backdrop:false });
                }
                this.playLessonVideo();
                this.getStatistic();
            }
        })
    }


    playLessonVideo(): any {
        const video: any = document.createElement('video');
        const vContainer: any = document.getElementById('lesson-video-container');
        vContainer.innerHTML = '';
        video.id = 'video';
        video.className = 'urlvideoplayer';
        video.controls = true;
        // video.width   = '300';
        video.style.width = '80%';
        // video.height   = '350';
        video.style.cursor = 'pointer';
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(this.Video_URL + this.lessionVideoUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                // video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = this.Video_URL + this.lessionVideoUrl;
            video.addEventListener('loadedmetadata', () => {
                video.play();
            });
        }
        vContainer.appendChild(video);
    }

    onVideoChangeFun(data: any): any {
        this.unitid = data.unitid;
        this.lessionVideoUrl = data.videourl;
        this.playLessonVideo();
        this.getStatistic();
    }

    onAttachmentChangeFun(url: any) {
        let orgUrl = this.FILE_URL + url
        window.open(orgUrl, '_blank');
    }

    closeModal(): any {
        this.courseDetailsOnboarding();
        this.modalService.dismissAll();
    }

    goto(path: any): any {
            this.common.navigate([path]);
    }

    gotoEnrol(data: any): any {
        if (!this.common.getUserId()) {
            
            this.common.sheardData = JSON.stringify(data);
            setTimeout(() => {
                this.common.enroloncourse();
            });
        } else {
            const data = {
                "userid": this.common.getUserId(),
                "sessionid": '',
                "firstname": '',
                "lastname": '',
                "email": '',
                "mobile": '',
                "courseid": this.courseid
            }
            this.common.loaderStart();
            this.restapi.addEnrollOnCourseByCourseId(data).subscribe(
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
        this.common.sheardData = window.location.href
        this.common.shareData()
    }

    showlist(): any {
        this.listFlag = !this.listFlag
    }

    

    nextModule(){
        let s = this.selectedLessionDetailsIndex
        let cindex = s += 1;
        for(let [index,d] of this.lessionArr.entries()){
            if (index <= this.lessionArr.length - 1) {
                if(index==cindex){
                    this.selectedLession = d.lessionid;
                    this.selectedLessionDetails = d
                    this.selectedLessionDetailsIndex=index
                    setTimeout(() => {
                        this.openModule(1)
                        }, 500);
                    break;
                }
            }
        }
    }

    previousModule(){
        let s = this.selectedLessionDetailsIndex
        let cindex = s -= 1;
        for(let [index,d] of this.lessionArr.entries()){
            if (index <= this.lessionArr.length - 1) {
                if(index==cindex){
                    this.selectedLession = d.lessionid;
                    this.selectedLessionDetails = d
                    this.selectedLessionDetailsIndex=index
                    setTimeout(() => {
                    this.openModule(1)
                    }, 500);
                    break;
                }
            }
        }
    }

    answer(questionid:any,e:any){
        this.answerArr.push({questionid : questionid , answerid: e.target.value});   
    }

    checkAnswer():any{
        const data = {
        "batchid":"",
        "userid":this.common.getUserId(),
        "courseid":this.courseid,
        "lessionid":this.selectedLession,
        "exerciseid":this.exerciseid,
         "answerList":this.answerArr
        };
        this.common.loaderStart();
        this.restapi.checkAnswer(data).subscribe((res:any)=>{
            this.common.loaderEnd();
            if(res.success){
                this.score = res.response.score;
                this.closeModal();
                this.common.notify('success',res.message);
            } else{
                this.common.notify('error',res.message);
            }
        });
    }


    getStatistic(){
        const data = {
            userid:this.common.getUserId(),
            courseid:this.courseid,
            lessionid:this.selectedLession,
            unitid:this.unitid
        };
        this.restapi.addStatistic(data).subscribe((res:any)=>{
            if(res.success){
               
            }
        })
    }
}
