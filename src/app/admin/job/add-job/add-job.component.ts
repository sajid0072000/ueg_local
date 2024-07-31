import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';

interface Job {
  JobName: string;
  Topic: string;
  Colour: string;
  Description: string;
  ChargeRate: number;
  TutorRate: number;
  ClientId: string;
  ChildId: string; // New field for Child ID
  EducatorId: string;
  ReportRequired: number;
  Status: number; // 1: Open, 2: In-Progress, 3: Finished
  Created?: Date;
  LastUpdated?: Date;
}

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit, OnDestroy {
  job: Job = {
    JobName: '',
    Topic: '',
    Colour: '',
    Description: '',
    ChargeRate: 0,
    TutorRate: 0,
    ClientId: '',
    ChildId: '', // Initialize ChildId
    EducatorId: '',
    ReportRequired: 0,
    Status: 1
  };

  clients: any[] = [];
  children: any[] = []; // New array for children
  educators: any[] = [];
  categories: any[] = [];
  jobId: string | null = null;
  jobNameErr: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private restapi: RestApiService,
    public common: CommonService,
    private notifierService: NotifierService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.loadClients();
    this.loadEducators();
    this.loadCategories();

    if (this.jobId) {
      this.loadJob();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadClients(): void {
    const params = {
      offset: 0,
      limit: 100000,
      searchText: '',
      isapproved: true,
      ishidden: false
    };

    const sub = this.restapi.getAllClients(params).subscribe((res: any) => {
      if (res.success) {
        this.clients = res.response.response;
      } else {
        this.notifierService.notify('error', 'Failed to load clients');
      }
    });
    this.subscriptions.push(sub);
  }

  loadChildren(clientId: string): void {
    const sub = this.restapi.getChildrenByClientId({ clientId }).subscribe((res: any) => {
      if (res.success) {
        this.children = res.response;
      } else {
        this.notifierService.notify('error', 'Failed to load children');
      }
    });
    this.subscriptions.push(sub);
  }

  loadEducators(): void {
    const params = {
      offset: 0,
      limit: 100000,
      searchText: '',
      isapproved: true,
      ishidden: false
    };

    const sub = this.restapi.getAllEducators(params).subscribe((res: any) => {
      if (res.success) {
        this.educators = res.response;
      } else {
        this.notifierService.notify('error', 'Failed to load educators');
      }
    }, (error) => {
      console.error('Error loading educators:', error);
      this.notifierService.notify('error', 'Failed to load educators');
    });
    this.subscriptions.push(sub);
  }

  loadCategories(): void {
    const params = {
      offSet: 0,
      limit: 100000,
      parentCategoryId: 0,
      categoryTypeId: 0
    };
    const sub = this.restapi.getAllCategory(params).subscribe((res: any) => {
      if (res.success) {
        this.categories = res.response;
      } else {
        this.notifierService.notify('error', 'Failed to load categories');
      }
    });
    this.subscriptions.push(sub);
  }

  loadJob(): void {
    const sub = this.restapi.getJobById({ id: this.jobId }).subscribe((res: any) => {
      if (res.success) {
        this.job = res.response;
        this.onClientChange(); // Load children based on ClientId
        this.onTopicChange(); // Load educators based on Topic
      } else {
        this.notifierService.notify('error', 'Failed to load job');
      }
    });
    this.subscriptions.push(sub);
  }

  validateTitle() {
    this.jobNameErr = !this.job.JobName;
  }

  addJob(): void {
    if (this.validateJob()) {
      this.job.Created = new Date();
      this.job.LastUpdated = new Date();
      const sub = this.restapi.addJob(this.job).subscribe((res: any) => {
        if (res.success) {
          this.notifierService.notify('success', 'Job added successfully');
          this.router.navigate(['admin/app/job-list']);
        } else {
          this.notifierService.notify('error', 'Failed to add job');
        }
      });
      this.subscriptions.push(sub);
    }
  }

  updateJob(): void {
    if (this.validateJob()) {
      this.job.LastUpdated = new Date();
      const sub = this.restapi.updateJob(this.job).subscribe((res: any) => {
        if (res.success) {
          this.notifierService.notify('success', 'Job updated successfully');
          this.router.navigate(['admin/app/job-list']);
        } else {
          this.notifierService.notify('error', 'Failed to update job');
        }
      });
      this.subscriptions.push(sub);
    }
  }

  goBack(): void {
    this.router.navigate(['admin/app/job-list']);
  }

  validateJob(): boolean {
    this.validateTitle();
    return !this.jobNameErr;
  }

  onClientChange(): void {
    if (this.job.ClientId) {
      this.loadChildren(this.job.ClientId);
    } else {
      this.children = []; // Clear the children array if no ClientId is selected
    }
  }

  onTopicChange(): void {
    if (this.job.Topic) {
      const params = {
        categoryId: this.job.Topic
      };
      const sub = this.restapi.getEducatorsByCategory(params).subscribe((res: any) => {
        if (res.success) {
          this.educators = res.response;
        } else {
          this.notifierService.notify('error', 'Failed to load educators for the selected topic');
        }
      });
      this.subscriptions.push(sub);
    } else {
      this.educators = []; // Clear the educators array if no Topic is selected
    }
  }
}
