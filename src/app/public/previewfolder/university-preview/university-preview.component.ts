import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-university-preview',
  templateUrl: './university-preview.component.html',
  styleUrls: ['./university-preview.component.css']
})
export class UniversityPreviewComponent implements OnInit, OnDestroy {
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
  universityPrev: any = {};
  mobImageUrl3: any = '';
  mobImageUrl2: any = '';
  mobImageUrl1: any = '';
  showImageUri1: any = '';
  showImageUri2: any = '';
  showImageUri3: any = '';
  isLondonLoc = false;
  constructor(public common: CommonService) { }
  ngOnInit(): void {

    let universityPrev: any = localStorage.getItem('universityFormData');
    this.universityPrev = JSON.parse(universityPrev);
    this.Name = this.universityPrev.name;
    if (this.universityPrev.universitylocation && this.universityPrev.universitylocation.toLowerCase().indexOf("london") > -1) {
      this.isLondonLoc = true;
    }
    this.LogoUri = this.universityPrev.logoUrl;
    this.ImageUri1 = this.universityPrev.imageUrl1;
    this.ImageUri2 = this.universityPrev.imageUrl2;
    this.ImageUri3 = this.universityPrev.imageUrl3;
    this.MainInformation = this.universityPrev.mainInformation;
    this.UniversityInformation = this.universityPrev.universityInformation;
    this.AdditionalInformation = this.universityPrev.additionalInformation;
    this.AdmissionsPolicy = this.universityPrev.admissionsPolicy;
    this.mobImageUrl1 = this.universityPrev.MobImageUri1;
    this.mobImageUrl2 = this.universityPrev.MobImageUri2;
    this.mobImageUrl3 = this.universityPrev.MobImageUri3;
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
    localStorage.removeItem('universityFormData')
  }

}
