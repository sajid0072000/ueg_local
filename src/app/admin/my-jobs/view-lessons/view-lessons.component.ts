import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-view-lessons',
  templateUrl: './view-lessons.component.html',
  styleUrls: ['./view-lessons.component.css']
})
export class ViewLessonsComponent implements OnInit {
  jobId!: number;
  lessons: any[] = [];
  childName: string = '';
  clientName: string = '';
  educatorName: string = '';
  selectedLesson: any = {}; // Holds the lesson to be edited
  modalOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: RestApiService,
    private commonService: CommonService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const jobId = params.get('jobId');
      if (jobId) {
        this.jobId = +jobId; // The + operator converts the string to a number
        this.loadLessons();
      }
    });
  }

  loadLessons(): void {
    const educatorId = this.commonService.getUserId();
    const params = {
      jobId: this.jobId,
      educatorId: educatorId
    };
    this.apiService.getLessonsByJobIdAndEducatorId(params).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.lessons = response.response.sort((a: any, b: any) => new Date(b.StartTime).getTime() - new Date(a.StartTime).getTime());
        if (this.lessons.length > 0) {
          const firstLesson = this.lessons[0];
          this.childName = firstLesson.childName;
          this.clientName = `${firstLesson.clientFirstName} ${firstLesson.clientLastName}`;
          this.educatorName = firstLesson.educatorName;
        }
      } else {
        // Handle error
        console.error('Error loading lessons:', response.message);
      }
    }, error => {
      // Handle API error
      console.error('API error:', error);
    });
  }

  goBack(): void {
    if (this.commonService.getRoleId() == '1') {
      this.router.navigate(['/admin/app/job-list']);
    } else {
      this.router.navigate(['/admin/app/my-jobs']);
    }
  }

  editLesson(lesson: any): void {
    this.selectedLesson = { ...lesson }; // Clone the lesson to avoid direct mutation
    this.selectedLesson.StartTime = this.formatDatetimeForInput(this.selectedLesson.StartTime);
    this.selectedLesson.EndTime = this.formatDatetimeForInput(this.selectedLesson.EndTime);
    this.showModal('lessonModal');
  }

  updateLesson(): void {
    if (!this.selectedLesson.Id) {
      console.error('Id is missing');
      return;
    }

    // Format the StartTime and EndTime before sending
    this.selectedLesson.StartTime = this.formatDatetime(this.selectedLesson.StartTime);
    this.selectedLesson.EndTime = this.formatDatetime(this.selectedLesson.EndTime);

    this.apiService.updateMyJob(this.selectedLesson).subscribe((response: any) => {
      if (response.success) {
        this.hideModal('lessonModal');
        this.loadLessons(); // Reload lessons to reflect the changes
      } else {
        // Handle error
        console.error('Error updating lesson:', response.message);
      }
    }, error => {
      // Handle API error
      console.error('API error:', error);
    });
  }

  formatDatetime(datetime: string): string {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  formatDatetimeForInput(datetime: string): string {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
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
}
