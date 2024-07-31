import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css','../../../../assets/css/preview.css']
})
export class PreviewComponent implements  OnInit, OnDestroy {
  Name:any=''
  ImageUri1:any=''
  LogoUri:any=''
  MainInformation:any=''
  ImageUri2:any=''
  SchoolInformation:any=''
  ImageUri3:any=''
  AdditionalInformation:any=''
  AdmissionsPolicy:any=''
  UniversityInformation:any=''
  previewFlag:any = "";
  formData: any;
  flag:any=''
  constructor(public common:CommonService,private modalService:NgbModal){

  }
  ngOnDestroy(): void {
    this.previewFlag = '';
  }
  ngOnInit(): void {
    this.previewFlag= "";
    this.previewFlag=this.common.schoolformData.flag || this.common.universityFormData.flag;
    if(this.previewFlag==1){
    this.Name = this.common.schoolformData.Name;
    this.LogoUri=this.common.schoolformData.logoURI
    this.ImageUri1=this.common.schoolformData.ImageUri1
    this.ImageUri2=this.common.schoolformData.ImageUri2
    this.SchoolInformation=this.common.schoolformData.SchoolInformation
    this.MainInformation=this.common.schoolformData.MainInformation
    this.ImageUri3=this.common.schoolformData.ImageUri3
    this.AdditionalInformation=this.common.schoolformData.AdditionalInformation
    this.AdmissionsPolicy=this.common.schoolformData.AdmissionsPolicy
    } 
    if(this.previewFlag==0) {
      this.Name= this.common.universityFormData.name
        this.LogoUri= this.common.universityFormData.logoUrl
        this.ImageUri1= this.common.universityFormData.imageUrl1
        this.ImageUri2= this.common.universityFormData.imageUrl2
        this.ImageUri3= this.common.universityFormData.imageUrl3
        this.MainInformation= this.common.universityFormData.mainInformation
        this.UniversityInformation= this.common.universityFormData.universityInformation
        this.AdditionalInformation= this.common.universityFormData.additionalInformation
        this.AdmissionsPolicy= this.common.universityFormData.admissionsPolicy
    }  
  }


}
