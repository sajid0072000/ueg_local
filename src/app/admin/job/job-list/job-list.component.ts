import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NotifierService } from "angular-notifier";
import { saveAs } from 'file-saver';
import { convertToCSV } from 'src/app/utility/saveToCsv';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  clientId: any = '';
  searchText: string = '';
  jobsList: any = [];
  selectedVal: any = '10'; 
  offset: number = 0;
  limit: number = 10;
  previousBtnDesable: boolean = false;
  nextBtnDesable: boolean = false;
  pageList: any[] = [
    { value: 10, name: '10' },
    { value: 20, name: '20' },
    { value: 30, name: '30' },
    { value: 50, name: '50' }
  ];

  constructor(
    private router: Router,
    private restapi: RestApiService,
    public common: CommonService,
    private notifierService: NotifierService,
    private actroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actroute.params.subscribe(params => {
      this.clientId = params['clientId'] || '';
      this.getJobs();
    });
  }

  getJobs(): void {
    const data = {
      clientId: this.clientId,
      searchText: this.searchText,
      limit: this.limit,
      offset: this.offset
    };
    this.common.loaderStart();
    this.restapi.getJobs(data).subscribe((res: any) => {
      console.log(res);
      this.common.loaderEnd();
      if (res.success) {
        this.jobsList = res.response || [];
        this.updatePaginationButtons();
      }
    });
  }

  search(): void {
    this.offset = 0; 
    this.getJobs();
  }

  editJob(jobId: number): void {
    if (jobId) {
      this.router.navigate(['admin/app/job-details', jobId]);
    } else {
      console.error('Job ID is undefined');
    }
  }

  viewLessons(jobId: number): void {
    this.router.navigate(['admin/app/view-lessons', jobId]);
  }

  addJob(): void {
    this.router.navigate(['admin/app/add-job']); 
  }

  downloadJobsList(): void {
    const csvData = convertToCSV(this.jobsList);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'jobs_list.csv');
  }

  changePagelimit(event: any): void {
    this.limit = event.target.value;
    this.offset = 0; 
    this.getJobs();
  }

  previousPage(): void {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.getJobs();
    }
  }

  nextPage(): void {
    if (this.jobsList.length === this.limit) {
      this.offset += this.limit;
      this.getJobs();
    }
  }

  updatePaginationButtons(): void {
    this.previousBtnDesable = this.offset <= 0;
    this.nextBtnDesable = this.jobsList.length < this.limit;
  }

  goBack(): void {
    this.router.navigate(['admin/app/clients', this.clientId]);
  }

  getStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'Open';
      case 2:
        return 'In-Progress';
      case 3:
        return 'Finished';
      default:
        return '';
    }
  }

  gotoCalendar(): void {
    this.router.navigate(['admin/app/calendar']); 
  }
}
