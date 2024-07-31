import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { RestApiService } from "../../../rest-api.service";
import { CommonService } from "../../../common.service";

declare var Hls: any;

@Component({
  selector: "app-add-unit",
  templateUrl: "./add-unit.component.html",
  styleUrls: ["./add-unit.component.css"],
})
export class AddUnitComponent implements OnInit {
  @ViewChild("deleteModal") deleteModal: any;

  userid = "" as any;
  courseid = "" as any;
  lessionid = "" as any;
  unittitle = "" as any;
  description = "" as any;
  videourl = "" as any;
  FILE_URL = "" as any;
  Video_URL = "" as any;
  videoduraion = "" as any;
  coursename: any = [];
  lessionArr: any;
  courseArr: any;
  unitDetails: any;
  unitId = "" as any;
  upDatebtnFlag: boolean = false;
  courseErr: any = "";
  lessionErr: any = "";
  unittitileErr: any = "";
  descriptionErr: any = "";
  videourlErr: any = "";
  videodurationErr: any = "";
  trncstatus: any = 0;
  title: any = '';

  spinner: boolean = false
  spinnerLession: boolean = false

  constructor(
    private router: Router,
    private actroute: ActivatedRoute,
    private restapi: RestApiService,
    private commonservice: CommonService,
    private notifierService: NotifierService,
    private modalService: NgbModal
  ) {
    this.FILE_URL = this.restapi.FILE_URL;
    this.Video_URL = this.restapi.Video_URL;
  }

  ngOnInit(): void {
    this.unitId = this.actroute.snapshot.params["id"];
    if (this.unitId != 0) {
      this.upDatebtnFlag = true;
      this.getUnitById();
    }
  }

  goToPreview(): any {

  }

  uploadEditBtn(): any {
    let elem = document.getElementById('file-input-video')
    if (elem) {
      elem.click()
    }
  }

  delete(): any {
    const obj = {
      userId: this.commonservice.getUserId(),
      id: this.unitId,
    };
    this.commonservice.loaderStart();
    this.restapi.deleteUnit(obj).subscribe(
      (res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.notifierService.notify("success", res.message);
          this.closeModal()
          this.router.navigate(["admin/app/unit-list"]);
        } else {
          this.notifierService.notify("error", res.message);
        }
      },
      (err: any) => {
        this.notifierService.notify("error", err.error.message);
      }
    );
  }


  changeUnitFun():any{
    this.unittitileErr = "";
  }


  changeDecriptionFun():any{
    this.descriptionErr = "";
  }

  changeVideoDurationFun():any{
    this.videodurationErr = "";
  }


  addUnits(): any {
    
    this.courseErr = "";
    this.lessionErr = "";
    this.unittitileErr = "";
    this.descriptionErr = "";
    this.videourlErr = "";
    this.videodurationErr = "";

    let err = 0

    if (this.courseid == "" || this.courseid == null || this.courseid==undefined) {
      this.courseErr = "Course Name Required";
      err++;
    }
    if (this.title == "" || this.title == null|| this.title == undefined) {
      this.lessionErr = "Lesson Name Required";
      err++;
    }
    if (this.unittitle == "" || this.unittitle == null) {
      this.unittitileErr = "Unit Name Required";
      err++;
    }
    if (this.description == "" || this.description == null) {
      this.descriptionErr = "Description Required";
      err++;
    }
    if (this.videourl == "" || this.videourl == null) {
      this.videourlErr = "Video File Required";
      err++;
    }
    if (this.videoduraion == "" || this.videoduraion == null) {
      this.videodurationErr = "Video Duration Required";
      err++;
    }


    if(err==0){
      const obj = {
        userId: Number(this.commonservice.getUserId()),
        courseid: this.courseid,
        lessionid: this.lessionid,
        unittitle: this.unittitle,
        description: this.description,
        videourl: this.videourl,
        minute: this.videoduraion,
      };
      this.commonservice.loaderStart();
      this.restapi.addUnit(obj).subscribe(
        (res: any) => {
          this.commonservice.loaderEnd();
          if (res.success) {
            this.notifierService.notify("success", res.message);
            this.resetForm();
            this.router.navigate(["admin/app/unit-list"]);
          } else {
            this.notifierService.notify("error", res.message);
          }
        },
        (err) => {
          this.notifierService.notify("error", err.error.message);
        }
      )}
  }

  getUnitById() {
    const obj = {
      userId: this.commonservice.getUserId(),
      id: this.unitId,
    };
    this.commonservice.loaderStart();
    this.restapi.getUnitById(obj).subscribe(
      (res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          console.log(res.response);
          this.coursename = res.response.coursename;
          this.courseid = res.response.courseid;
          this.title = res.response.lessiontitle;
          this.lessionid = res.response.lessionid;
          this.description = res.response.description;
          this.unittitle = res.response.unittitle;
          this.videourl = res.response.videourl;
          this.videoduraion = res.response.minute;
          this.trncstatus = res.response.trncstatus;
          if(this.trncstatus == 1) {
            const video         = document.createElement('video');
            const vContainer: any = document.getElementById('video-container');
            video.id            = 'video';
            video.className     = 'urlvideoplayer';
            video.controls      = true;
            video.style.width   = '200px';
            video.style.height   = '140px';
            video.style.cursor  = 'pointer';
            if (Hls.isSupported()) {
              const hls = new Hls();
              hls.loadSource(this.Video_URL + this.videourl);
              hls.attachMedia(video);
              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                // video.play();
              });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
              video.src = this.Video_URL + this.videourl;
              video.addEventListener('loadedmetadata', () => {
                // video.play();
              });
            }
            vContainer.appendChild(video);
          }

          this.getCourse(res.response.coursename);
          this.getlession(res.response.lessiontitle);
        } else {
          this.notifierService.notify("error", res.message);
        }
      },
      (err: any) => {
        this.notifierService.notify("error", err.error.message);
      }
    );
  }

  updateUnit(): any {
    this.courseErr = "";
    this.lessionErr = "";
    this.unittitileErr = "";
    this.descriptionErr = "";
    this.videourlErr = "";
    this.videodurationErr = "";

    let err = 0

    if (this.courseid == "" || this.courseid == null || this.courseid==undefined) {
      this.courseErr = "Course Name Required";
      err++;
    }
    if (this.title == "" || this.title == null|| this.title == undefined) {
      this.lessionErr = "Lession Name Required";
      err++;
    }
    if (this.unittitle == "" || this.unittitle == null) {
      this.unittitileErr = "Unit Name Required";
      err++;
    }
    if (this.description == "" || this.description == null) {
      this.descriptionErr = "Descrption Required";
      err++;
    }
    if (this.videourl == "" || this.videourl == null) {
      this.videourlErr = "Video File Required";
      err++;
    }
    if (this.videoduraion == "" || this.videoduraion == null) {
      this.videodurationErr = "Video Duration Required";
      err++;
    }
    if(err==0){
    const obj = {
      userId: this.commonservice.getUserId(),
      id: this.unitId,
      courseid: this.courseid,
      lessionid: this.lessionid,
      unittitle: this.unittitle,
      description: this.description,
      videourl: this.videourl,
      minute: this.videoduraion,
      trncstatus: this.trncstatus
    };
    console.log(obj);

    this.commonservice.loaderStart();
    this.restapi.updateUnit(obj).subscribe(
      (res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.notifierService.notify("success", res.message);
          this.router.navigate(["admin/app/unit-list"]);
          this.resetForm();
        } else {
          this.notifierService.notify("error", res.message);
        }
      },
      (err: any) => {
        this.notifierService.notify("error", err.error.message);
      }
    );
    }
  }

  getCourse(searchText: any) {
    if (searchText != "") {
      const params = {
        userId: Number(this.commonservice.getUserId()),
        coursename: searchText,
      };
      this.restapi.searchCourseByName(params).subscribe(
        (res: any) => {
          if (res.success) {
            this.courseArr = res.response;
          }
        },
        (err) => { }
      );
    }
  }

  getlession(searchText: any) {
    if (searchText != "") {
      const params = {
        userId: Number(this.commonservice.getUserId()),
        title: searchText,
      };

      this.restapi.searchLessionByName(params).subscribe(
        (res: any) => {
          if (res.success) {
            this.lessionArr = res.response;
          }
        },
        (err: any) => {
          // this.notifierService.notify("error", err.error.message);
        }
      );
    }
  }




  searchCourseByName(): any {
    this.courseErr = "";
    var data = {
      "userId": this.commonservice.getUserId(),
      "coursename": this.coursename,
      "isFlag":1
    }
    this.spinner = true
    this.restapi.searchCourseByName(data).subscribe((res: any) => {
      if (res.success) {
        this.courseArr = res.response
        this.spinner = false
      }
      else {
        this.courseArr = []
        this.spinner = false
      }
    });
  }

  getCourseIdByName(): void {
    for (let data of this.courseArr) {
      if (data.coursename === this.coursename) {
        this.courseid = data.courseid
        break;
      }
    }
  }

  searchLessionByName(): any {
    this.lessionErr = "";
    var data = {
      "userId": this.commonservice.getUserId(),
      "title": this.title,
      "courseid": this.courseid
    }
    this.spinnerLession = true
    this.restapi.searchLessionByName(data).subscribe((res: any) => {
      if (res.success) {
        this.lessionArr = res.response
        this.spinnerLession = false
      }
      else {
        this.lessionArr = []
        this.spinnerLession = false
      }
    });
  }

  getLessionIdByName(): void {
    for (let data of this.lessionArr) {
      if (data.title === this.title) {
        this.lessionid = data.id
        break;
      }
    }
  }


  resetForm() {
    this.courseid = "";
    this.lessionid = "";
    this.unittitle = "";
    this.description = "";
    this.videourl = "";
    this.videoduraion = ""
    this.courseErr = "";
    this.lessionErr = "";
    this.unittitileErr = "";
    this.descriptionErr = "";
    this.videourlErr = "";
    this.videodurationErr = "";

    this.router.navigate(["admin/app/unit-list"]);

  }

  validationCheck(): any {
    this.courseErr = "";
    this.lessionErr = "";
    this.unittitileErr = "";
    this.descriptionErr = "";
    this.videourlErr = "";
    this.videodurationErr = "";

    if (this.courseid == "" || this.courseid == null) {
      this.courseErr = "*Course Name Required";
      return false;
    }
    if (this.title == "" || this.title == null) {
      this.lessionErr = "*Lession Name Required";
      return false;
    }
    if (this.unittitle == "" || this.unittitle == null) {
      this.unittitileErr = "*Unit Name Required";
      return false;
    }
    if (this.description == "" || this.description == null) {
      this.descriptionErr = "*Descrption Required";
      return false;
    }
    if (this.videourl == "" || this.videourl == null) {
      this.videourlErr = "*Video File Required";
      return false;
    }
    if (this.videoduraion == "" || this.videoduraion == null) {
      this.videodurationErr = "*Video Duration Required";
      return false;
    }
    return true;
  }

  onFileChangedVideo(event: any): any {
    this.videourlErr = "";
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const fd = new FormData();
      fd.append("file", file);
      this.commonservice.loaderStart();
      this.restapi.uploadFile(fd).subscribe((res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.videourl = res.response.fileName;   
        }
      });
    }
  }

  onFileChange(event: any): void {
    this.videourl = event.file;
    this.trncstatus = 0;
  }

  goBack() {
    this.router.navigate(["admin/app/unit-list"]);
  }

  onClickDelete(): any {
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

  closeModal(): any {
    this.modalService.dismissAll();
  }
}
