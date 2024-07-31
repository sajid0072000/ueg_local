import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NotifierService } from "angular-notifier";
import { saveAs } from 'file-saver';
import { convertToCSV } from 'src/app/utility/saveToCsv';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  clientId: any = '';
  searchText: string = '';
  studentsList: any = [];
  selectedVal: any = '10'; // Default value for pagination limit
  offset: number = 0;
  limit: number = 20;
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
      this.getStudents();
    });
  }

  getStudents(): void {
    const data: any = {
      clientId: this.clientId,
      searchText: this.searchText,
      limit: this.limit,
      offset: this.offset
    };
    this.common.loaderStart();
    this.restapi.getAllStudents(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.studentsList = res.response || [];
        this.updatePaginationButtons();
      } else {
        this.notifierService.notify('error', res.message);
      }
    }, (err: any) => {
      this.common.loaderEnd();
      this.notifierService.notify('error', err.error.message);
    });
  }

  search(): void {
    this.offset = 0; // Reset offset on search
    this.getStudents();
  }

  editStudent(studentId: number): void {
    this.router.navigate(['admin/app/student-details', studentId]);
  }

  downloadStudentsList(): void {
    const csvData = convertToCSV(this.studentsList);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'students_list.csv');
  }

  changePagelimit(event: any): void {
    this.limit = event.target.value;
    this.offset = 0; // Reset offset on limit change
    this.getStudents();
  }

  previousPage(): void {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.getStudents();
    }
  }

  nextPage(): void {
    if (this.studentsList.length === this.limit) {
      this.offset += this.limit;
      this.getStudents();
    }
  }

  updatePaginationButtons(): void {
    this.previousBtnDesable = this.offset <= 0;
    this.nextBtnDesable = this.studentsList.length < this.limit;
  }

  goBack(): void {
    this.router.navigate(['admin/app/clients-list']);
  }
}
