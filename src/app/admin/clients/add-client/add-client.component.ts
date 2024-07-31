import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from "angular-notifier";
import { DatePipe } from '@angular/common';

interface Child {
  id: number | null;
  childName: string;
  dateOfBirth: string;
  gender: string;
  school: string;
  level: string;
}

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  providers: [DatePipe]
})
export class AddClientComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal: any;

  clientId: any = '';
  title: any = '';
  firstName: any = '';
  lastName: any = '';
  streetName: any = '';
  city: any = '';
  country: any = '';
  postcode: any = '';
  telephone: any = '';
  email: any = '';
  timeZone: any = '';
  children: Child[] = [];
  
  titleErr: boolean = false;
  firstNameErr: boolean = false;
  lastNameErr: boolean = false;
  streetNameErr: boolean = false;
  cityErr: boolean = false;
  countryErr: boolean = false;
  postcodeErr: boolean = false;
  telephoneErr: boolean = false;
  emailErr: boolean = false;
  validEmailErr: boolean = false;
  timeZoneErr: boolean = false;

  constructor(
    private router: Router,
    private restapi: RestApiService,
    public common: CommonService,
    private modalService: NgbModal,
    private notifierService: NotifierService,
    private actroute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.clientId = this.actroute.snapshot.params['id'];
    console.log('Client ID:', this.clientId); // Log client ID
    if (this.clientId == 0) {
      this.clientId = null;
    }
    if (this.clientId) {
      this.getClientById();
    }
  }

  getClientById(): any {
    const data = {
      id: this.clientId
    };
    this.common.loaderStart();
    this.restapi.getClientById(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success && res.response) {
        const temp = res.response.response; // Adjusted to access nested response
        this.title = temp.title;
        this.firstName = temp.firstName;
        this.lastName = temp.lastName;
        this.streetName = temp.streetName;
        this.city = temp.city;
        this.country = temp.country;
        this.postcode = temp.postcode;
        this.telephone = temp.telephone;
        this.email = temp.email;
        this.timeZone = temp.timeZone;
        this.children = temp.children.map((child: Child) => ({
          ...child,
          dateOfBirth: this.datePipe.transform(child.dateOfBirth, 'yyyy-MM-dd') || ''
        }));
        console.log('Children Data:', this.children);  // Verify data in console
      }
    });
  }

  validateTitle() { this.titleErr = !this.title; }
  validateFirstName() { this.firstNameErr = !this.firstName; }
  validateLastName() { this.lastNameErr = !this.lastName; }
  validateStreetName() { this.streetNameErr = !this.streetName; }
  validateCity() { this.cityErr = !this.city; }
  validateCountry() { this.countryErr = !this.country; }
  validatePostcode() { this.postcodeErr = !this.postcode; }
  validateTelephone() { this.telephoneErr = !this.telephone; }
  validateEmail() {
    this.emailErr = !this.email;
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    this.validEmailErr = !emailPattern.test(this.email);
  }
  validateTimeZone() { this.timeZoneErr = !this.timeZone; }

  addChild() {
    this.children.push({ id: null, childName: '', dateOfBirth: '', gender: '', school: '', level: '' });
  }

  removeChild(index: number) {
    this.children.splice(index, 1);
  }

  add() {
    if (this.isValid()) {
      const clientData = this.getClientData();
      this.common.loaderStart();
      this.restapi.addClient(clientData).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', 'Client added successfully');
          this.resetForm();
          this.router.navigate(['admin/app/clients-list']);
        }
      });
    }
  }

  edit() {
    if (this.isValid()) {
      const clientData = this.getClientData();
      this.common.loaderStart();
      this.restapi.updateClient(clientData).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', 'Client updated successfully');
          this.resetForm();
          this.router.navigate(['admin/app/clients-list']);
        }
      });
    }
  }

  delete() {
    this.common.loaderStart();
    this.restapi.deleteClient({ id: this.clientId }).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.notifierService.notify('success', 'Client deleted successfully');
        this.closeModal();
        this.router.navigate(['admin/app/clients-list']);
      }
    });
  }

  isValid(): boolean {
    this.validateTitle();
    this.validateFirstName();
    this.validateLastName();
    this.validateStreetName();
    this.validateCity();
    this.validateCountry();
    this.validatePostcode();
    this.validateTelephone();
    this.validateEmail();
    this.validateTimeZone();
    return !(this.titleErr || this.firstNameErr || this.lastNameErr || this.streetNameErr || this.cityErr || this.countryErr || this.postcodeErr || this.telephoneErr || this.emailErr || this.validEmailErr || this.timeZoneErr);
  }

  getClientData() {
    return {
      id: this.clientId,
      title: this.title,
      firstName: this.firstName,
      lastName: this.lastName,
      streetName: this.streetName,
      city: this.city,
      country: this.country,
      postcode: this.postcode,
      telephone: this.telephone,
      email: this.email,
      timeZone: this.timeZone,
      children: this.children
    };
  }

  onClickDelete() {
    this.modalService.open(this.deleteModal, { centered: true, size: 'md' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  resetForm() {
    this.clientId = '';
    this.title = '';
    this.firstName = '';
    this.lastName = '';
    this.streetName = '';
    this.city = '';
    this.country = '';
    this.postcode = '';
    this.telephone = '';
    this.email = '';
    this.timeZone = '';
    this.children = [];
    this.router.navigate(['admin/app/clients-list']);
  }

  goBack() {
    this.router.navigate(['admin/app/clients-list']);
  }
}
