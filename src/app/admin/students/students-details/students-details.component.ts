import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-student-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  studentId: any = '';
  student: any = {
    childName: '',
    dateOfBirth: '',
    gender: '',
    school: '',
    level: ''
  };

  childNameErr: boolean = false;
  dateOfBirthErr: boolean = false;
  genderErr: boolean = false;
  schoolErr: boolean = false;
  levelErr: boolean = false;

  constructor(
    private router: Router,
    private restapi: RestApiService,
    public common: CommonService,
    private notifierService: NotifierService,
    private actroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentId = this.actroute.snapshot.params['id'];
    if (this.studentId) {
      this.getStudentById();
    }
  }

  getStudentById(): void {
    const data = { "id": this.studentId };
    this.common.loaderStart();
    this.restapi.getStudentById(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.student = res.response;
        this.student.dateOfBirth = this.formatDateForInput(this.student.dateOfBirth);
      }
    });
  }

  formatDateForInput(date: string): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  validateChildName() { this.childNameErr = !this.student.childName; }
  validateDateOfBirth() { this.dateOfBirthErr = !this.student.dateOfBirth; }
  validateGender() { this.genderErr = !this.student.gender; }
  validateSchool() { this.schoolErr = !this.student.school; }
  validateLevel() { this.levelErr = !this.student.level; }

  edit(): void {
    if (this.isValid()) {
      const studentData = {
        id: this.studentId,
        childName: this.student.childName,
        dateOfBirth: this.student.dateOfBirth,
        gender: this.student.gender,
        school: this.student.school,
        level: this.student.level
      };
      this.common.loaderStart();
      this.restapi.updateStudent(studentData).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', 'Student updated successfully');
          this.goBack();
        }
      });
    }
  }

  isValid(): boolean {
    this.validateChildName();
    this.validateDateOfBirth();
    this.validateGender();
    this.validateSchool();
    this.validateLevel();
    return !(this.childNameErr || this.dateOfBirthErr || this.genderErr || this.schoolErr || this.levelErr);
  }

  goBack(): void {
    this.router.navigate(['admin/app/students-list']);
  }
}
