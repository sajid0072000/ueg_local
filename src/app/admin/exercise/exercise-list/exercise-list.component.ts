import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent {

  @ViewChild('deleteModal') deleteModal: any;

  exerciseList = [] as any
  selectedVal: any = 20;
  public pageList: Array<any> = [
    { name: '10', value: '10' },
    { name: '15', value: '15' },
    { name: '20', value: '20' },
    { name: '30', value: '30' },
    { name: '50', value: '50' }
  ];
  isPrevious: boolean = true;
  offset = 0;
  limit = 20;
  searchText='' as any
  courseid='' as any
  lessionid='' as any
  id='' as any

  coursename = '' as any
  spinner: boolean = false
  spinnerLession: boolean = false
  courseArr = [] as any

  title = '' as any
  lessionArr = [] as any
  roleid:any=''

  previousBtnDesable: boolean = true;
  nextBtnDesable: boolean = false;


  constructor(
    private router: Router,
    private restapi: RestApiService,
    private common: CommonService,
    private modalService: NgbModal,
    private notifierService: NotifierService
  ) { }

  ngOnInit():void {
    const role = this.common.getRoleArr();
    this.roleid = sessionStorage.getItem('roleid');
      if(this.roleid == 1 || this.roleid == 3){
        this.getExercise();
      } 
    
  }


  getExercise(): any {
    let obj = {
      "userId": this.common.getUserId(),
      "limit": this.limit,
      "offset": this.offset,
      "searchText": this.searchText,
      "courseid": this.courseid,
      "lessionid": this.lessionid
    }
    this.common.loaderStart();
    this.restapi.getExercise(obj).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        if(res.response) {
          if (res.response.length > 0) {
            this.exerciseList = res.response;
            this.nextBtnDesable = res.response.length < this.limit;
          } else {
            this.exerciseList = []
            this.nextBtnDesable = true;
            this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          }
        } else {
          this.nextBtnDesable = true;
        }
      } else {
        this.exerciseList = [];
      }
    })
  }

  changePagelimit(event: any): any {
    this.offset = 0;
    this.limit = Number(event.target.value);
    this.getExercise();
  }

  previousPage(): any {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getExercise();
    if (this.offset <= 0) {
      this.previousBtnDesable = true;
    }
  }

  nextPage(): any {
    this.previousBtnDesable = false;
    this.offset = this.offset + this.limit;
    this.getExercise();
  }


  add(): any {
    this.router.navigate(['admin/app/add-exercise/0'])
  }

  edit(id: any): any {
    this.router.navigate(['admin/app/add-exercise/' + id])
  }

  delete(): any {
    const data = {
      "userId": this.common.getUserId(),
      "id":this.id
    }
    this.common.loaderStart();
    this.restapi.deleteExercise(data).subscribe((res: any) => {
      this.common.loaderEnd();
      console.log(res.response);
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.getExercise()
        this.closeModal()
      } else {
        this.notifierService.notify('error', res.message); 
      }
    })

  }

  onClickDelete(id: any): any {
    this.id = id
    this.modalService.open(this.deleteModal, { centered: true, size: 'md' });
  }

  closeModal(): any {
    this.id = '';
    this.modalService.dismissAll();
  }

  searchCourseByName(): any {
    if(this.coursename.length !==0){
      const data = {
        "userId": this.common.getUserId(),
        "coursename": this.coursename
      }
      this.spinner = true
      this.restapi.searchCourseByName(data).subscribe((res: any) => {
        if (res.success) {
          this.courseArr = res.response
          this.spinner = false
        }
        else {
          this.exerciseList=[]
          this.courseArr = []
          this.spinner = false
        }
      });
    }else{
    this.courseid = ''
    this.getExercise()
    this.courseArr = []
    }
  }

  getCourseIdByName(): any {
    for (let data of this.courseArr) {
      if (data.coursename === this.coursename) {
        this.courseid = data.courseid
        break;
      }
    }
    this.getExercise()
  }

  searchLessionByName(): any {
    if(this.title.length !==0){
    const data = {
      "userId": this.common.getUserId(),
      "title": this.title,
      "courseid":this.courseid
    }
    this.spinnerLession = true
    this.restapi.searchLessionByName(data).subscribe((res: any) => {
      if (res.success) {
        this.lessionArr = res.response
        this.spinnerLession = false
      }
      else {
        this.exerciseList=[]
        this.lessionArr = []
        this.spinnerLession = false
      }
    });
  }
    else{
      this.lessionid = ''
      this.getExercise()
      this.lessionArr = []
      }
  }

  getLessionIdByName(): any {
    for (let data of this.lessionArr) {
      if (data.title === this.title) {
        this.lessionid = data.id
        break;
      }
    }
    this.getExercise()
  }

  onSearch():any{
    this.getExercise()
  }

  onReset():any{
    this.coursename=''
    this.courseid=''
    this.lessionid=''
    this.title=''
    this.getExercise()
  }

  search(): any {
    if (this.searchText.length >= 3) {
      this.getExercise();
    }
    if(this.searchText.length == 0){
      this.getExercise();
    }
  }
}
