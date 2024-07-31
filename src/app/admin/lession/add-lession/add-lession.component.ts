import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-lession',
  templateUrl: './add-lession.component.html',
  styleUrls: ['./add-lession.component.css']
})
export class AddLessionComponent {
  @ViewChild('deleteModal') deleteModal: any;

  lessionid: string | null = '';
  coursename: string = '';
  title: string = '';
  description: string = '';
  agerange: string = '';
  seq: string = '';
  price: string = '';
  courseid: string = '';
  courseArr: any[] = [];
  spinner: boolean = false;
  coursenameErr: boolean = false;
  lessonnameErr: boolean = false;
  seqErr: boolean = false;
  descriptionErr: boolean = false;
  lessionduration: string = '';
  lessiondurationErr: boolean = false;

  constructor(
    private router: Router,
    private restApi: RestApiService,
    private activatedRoute: ActivatedRoute,
    private notifierService: NotifierService,
    private common: CommonService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.lessionid = this.activatedRoute.snapshot.params['id'];
    if (this.lessionid === '0') {
      this.lessionid = null;
    }
    if (this.lessionid) {
      this.getLessionById();
    }
  }

  changelessiondurationFun(): void {
    if (this.lessionduration !== null && parseFloat(this.lessionduration) < 0) {
      this.lessionduration = '0';
      this.lessiondurationErr = true;
    } else {
      this.lessiondurationErr = false;
    }
  }

  delete(): void {
    const data = {
      userId: this.common.getUserId(),
      id: this.lessionid
    };
    this.common.loaderStart();
    this.restApi.deleteLession(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.closeModal();
        this.router.navigate(['admin/app/lession-list']);
      } else {
        this.notifierService.notify('error', res.message);
      }
    });
  }

  goBack(): void {
    this.router.navigate(["admin/app/lession-list"]);
  }

  searchCourseByName(): void {
    this.coursenameErr = false;
    const data = {
      userId: this.common.getUserId(),
      coursename: this.coursename,
    };
    this.spinner = true;
    this.restApi.searchCourseByName(data).subscribe((res: any) => {
      this.spinner = false;
      if (res.success) {
        this.courseArr = res.response;
        if (this.lessionid) {
          const course = this.courseArr.find(item => item.coursename === this.coursename);
          if (course) {
            this.courseid = course.courseid;
          }
        }
      } else {
        this.courseArr = [];
      }
    });
  }

  getLessionById(): void {
    const data = {
      userId: this.common.getUserId(),
      id: this.lessionid
    };
    this.common.loaderStart();
    this.restApi.getLessionById(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        const response = res.response;
        this.coursename = response.coursename;
        this.courseid = response.courseid;
        this.title = response.lessionTitle;
        this.description = response.description;
        this.agerange = response.agerange;
        this.seq = response.seq;
        this.price = response.price;
        this.lessionduration = response.lessionduration;
        this.searchCourseByName();
      }
    });
  }

  changeLessonFun(): void {
    this.lessonnameErr = false;
  }

  changeSeqFun(): void {
    this.seqErr = false;
  }

  changeDescriptionFun(): void {
    this.descriptionErr = false;
  }

  add(): void {
    this.resetErrors();

    if (this.validateForm()) {
      const data = {
        userId: this.common.getUserId(),
        courseid: this.courseid,
        title: this.title,
        description: this.description,
        seq: this.seq,
        lessionduration: this.lessionduration
      };
      this.common.loaderStart();
      this.restApi.addLession(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm();
          this.router.navigate(['admin/app/lession-list']);
        } else {
          this.notifierService.notify('error', res.message);
        }
      });
    }
  }

  edit(): void {
    this.resetErrors();

    if (this.validateForm()) {
      const data = {
        userId: this.common.getUserId(),
        id: this.lessionid,
        courseid: this.courseid,
        title: this.title,
        description: this.description,
        seq: this.seq,
        lessionduration: this.lessionduration
      };
      this.common.loaderStart();
      this.restApi.updateLession(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm();
          this.router.navigate(['admin/app/lession-list']);
        } else {
          this.notifierService.notify('error', res.message);
        }
      });
    }
  }

  resetForm(): void {
    this.courseid = '';
    this.courseArr = [];
    this.coursename = '';
    this.title = '';
    this.description = '';
    this.seq = '';
    this.lessionduration = '';
    this.resetErrors();
    this.router.navigate(['admin/app/lession-list']);
  }

  resetErrors(): void {
    this.coursenameErr = false;
    this.lessonnameErr = false;
    this.seqErr = false;
    this.descriptionErr = false;
    this.lessiondurationErr = false;
  }

  validateForm(): boolean {
    let isValid = true;

    if (!this.courseid) {
      this.coursenameErr = true;
      isValid = false;
    }
    if (!this.title) {
      this.lessonnameErr = true;
      isValid = false;
    }
    if (!this.description) {
      this.descriptionErr = true;
      isValid = false;
    }
    if (!this.seq) {
      this.seqErr = true;
      isValid = false;
    }
    if (this.lessionduration === null || parseFloat(this.lessionduration) < 0) {
      this.lessiondurationErr = true;
      isValid = false;
    }
    return isValid;
  }

  getCourseIdByName(): void {
    const course = this.courseArr.find(item => item.coursename === this.coursename);
    if (course) {
      this.courseid = course.courseid;
    }
  }

  onClickDelete(): void {
    this.modalService.open(this.deleteModal, { centered: true, size: 'md' });
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}
