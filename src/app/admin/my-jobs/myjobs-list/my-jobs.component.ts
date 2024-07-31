import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobComponent implements OnInit {
  myJobs: any[] = [];
  selectedMyJob: any = null;
  newLesson: any = {};
  searchText: string = '';
  selectedVal: number = 10; // Default items per page
  pageList = [
    { name: '10', value: 10 },
    { name: '20', value: 20 },
    { name: '50', value: 50 }
  ];
  offset: number = 0;
  limit: number = 10;
  previousBtnDesable: boolean = true;
  nextBtnDesable: boolean = false;
  modalOpen: boolean = false;

  constructor(
    private apiService: RestApiService,
    private commonService: CommonService,
    private renderer: Renderer2,
    private router: Router,
    private notifierService: NotifierService // Inject NotifierService
  ) {}

  ngOnInit(): void {
    this.loadMyJobs();
  }

  loadMyJobs(): void {
    const educatorId = this.commonService.getUserId();
    const params = {
      educatorId,
      searchText: this.searchText,
      limit: this.limit,
      offset: this.offset
    };
    this.apiService.getMyJobs(params).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.myJobs = response.response.map((job: any) => {
          job.StatusText = this.getStatusText(job.Status); // Convert status code to text
          return job;
        });
        this.updatePaginationButtons();
      }
    });
  }

  getStatusText(statusCode: number): string {
    switch (statusCode) {
      case 1: return 'Pending';
      case 2: return 'In Progress';
      case 3: return 'Completed';
      default: return 'Unknown';
    }
  }

  add(): void {
    // Logic to add a new job
  }

  search(): void {
    this.offset = 0;
    this.loadMyJobs(); // Reload jobs with search text
  }

  changePagelimit(event: any): void {
    this.limit = event.target.value;
    this.offset = 0; // Reset offset on limit change
    this.loadMyJobs();
  }

  previousPage(): void {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.loadMyJobs();
    }
  }

  nextPage(): void {
    this.offset += this.limit;
    this.loadMyJobs();
  }

  openLessonModal(myJob: any): void {
    this.selectedMyJob = myJob;
    this.newLesson = {
      JobId: myJob.Id,
      ClientId: myJob.ClientId,
      EducatorId: myJob.EducatorId,
      ChildId: myJob.ChildId, 
      StartTime: '',
      EndTime: '',
      Topic: '',
      Location: '',
      Status: 'Planned',
      Notes: ''
    };
    this.showModal('lessonModal');
  }

  viewLessons(jobId: number): void {
    this.router.navigate(['admin/app/view-lessons', jobId]);
  }

  saveLesson(): void {
    console.log(this.newLesson);
    this.apiService.addMyJob(this.newLesson).subscribe((response: any) => {
      this.hideModal('lessonModal');
      if (response.success) {
        this.notifierService.notify('success', 'Job added successfully'); // Show success message
        this.loadMyJobs();
      } else {
        // Handle error
        this.notifierService.notify('error', 'Error adding job'); // Show error message if needed
      }
    });
  }

  showModal(modalId: string): void {
    this.modalOpen = true;
    this.renderer.addClass(document.body, 'modal-open');
    const backdrop = this.renderer.createElement('div');
    this.renderer.addClass(backdrop, 'modal-backdrop');
    this.renderer.setAttribute(backdrop, 'id', 'customBackdrop');
    this.renderer.listen(backdrop, 'click', () => this.hideModal(modalId));
    this.renderer.appendChild(document.body, backdrop);
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  }

  hideModal(modalId: string): void {
    this.modalOpen = false;
    this.renderer.removeClass(document.body, 'modal-open');
    const backdrop = document.getElementById('customBackdrop');
    if (backdrop) {
      this.renderer.removeChild(document.body, backdrop);
    }
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  updatePaginationButtons(): void {
    this.previousBtnDesable = this.offset <= 0;
    this.nextBtnDesable = this.myJobs.length < this.limit;
  }
}
