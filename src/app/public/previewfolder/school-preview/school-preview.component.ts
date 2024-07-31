import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-school-preview',
  templateUrl: './school-preview.component.html',
  styleUrls: ['./school-preview.component.css',]
})
export class SchoolPreviewComponent implements OnInit, OnDestroy {
  Name: any = ''
  ImageUri1: any = ''
  LogoUri: any = ''
  MainInformation: any = ''
  ImageUri2: any = ''
  SchoolInformation: any = ''
  ImageUri3: any = ''
  AdditionalInformation: any = ''
  AdmissionsPolicy: any = ''
  UniversityInformation: any = ''
  schoolprev: any = {};
  mobImageUrl3: any = '';
  mobImageUrl2: any = '';
  mobImageUrl1: any = '';
  showImageUri1: any = '';
  showImageUri2: any = '';
  showImageUri3: any = '';
  isLondonLoc = false;
  constructor(public common: CommonService) { }
  ngOnInit(): void {
    let schoolprev: any = localStorage.getItem('schoolFormData');
    this.schoolprev = JSON.parse(schoolprev);
    this.Name = this.schoolprev.Name;
    console.log(this.schoolprev.Location);
    if (this.schoolprev.Location && this.schoolprev.Location.toLowerCase().indexOf("london") > -1) {
      this.isLondonLoc = true;
    }
    this.LogoUri = this.schoolprev.logoURI
    this.ImageUri1 = this.schoolprev.ImageUri1
    this.ImageUri2 = this.schoolprev.ImageUri2
    this.SchoolInformation = this.schoolprev.SchoolInformation
    this.MainInformation = this.schoolprev.MainInformation
    this.ImageUri3 = this.schoolprev.ImageUri3
    this.AdditionalInformation = this.schoolprev.AdditionalInformation
    this.AdmissionsPolicy = this.schoolprev.AdmissionsPolicy;
    this.mobImageUrl1 = this.schoolprev.MobImageUri1;
    this.mobImageUrl2 = this.schoolprev.MobImageUri2;
    this.mobImageUrl3 = this.schoolprev.MobImageUri3;
    if (window.innerWidth <= 1026) {
      this.showImageUri1 = this.mobImageUrl1;
      this.showImageUri3 = this.mobImageUrl3;
    } else {
      this.showImageUri1 = this.ImageUri1;
      this.showImageUri3 = this.ImageUri3;
    }

    if(window.innerWidth <= 807){
      this.showImageUri2 = this.mobImageUrl2;
    } else {
      this.showImageUri2 = this.ImageUri2;
    }
    window.addEventListener('resize', (event: any) => {
      console.log(event.target.innerWidth);
      if(event.target.innerWidth <= 1026){
        this.showImageUri1 = this.mobImageUrl1;
        this.showImageUri3 = this.mobImageUrl3;
      } else {
        this.showImageUri1 = this.ImageUri1;
        this.showImageUri3 = this.ImageUri3;
      }
     if(event.target.innerWidth <= 807){
        this.showImageUri2 = this.mobImageUrl2;
      } else {
        this.showImageUri2 = this.ImageUri2;
      }
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('schoolFormData')
  }


}
