import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
name:any=''
address:any=''
bio:any=''
education:any=''
teachingExperiance:any=''
subject:any=''

nameErr:boolean=false
addressErr:boolean=false
bioErr:boolean=false
educationErr:boolean=false
teachingExperianceErr:boolean=false
subjectErr:boolean=false



  constructor(private router: Router, private restApi:RestApiService,public common:CommonService,private route:ActivatedRoute, private notifierService:NotifierService) {
  }


  ngOnInit(): void {
  }

  goto(path: string) {
    this.common.navigate([path])
  }


  isShow: boolean = false

  uploadImage(): any {

    if (this.isShow == false) {
      this.isShow = true
    } else {
      this.isShow = false
    }
  }


  addProfiledetails():any{
   this.nameErr=false
   this.addressErr=false
   this.bioErr=false
   this.educationErr=false
   this.teachingExperianceErr=false
   this.subjectErr=false

   let err = 0
   
   if (this.name == "" || this.name == null || this.name == undefined) {
     this.nameErr = true
     err++
   }
   if(this.address == ''|| this.address == null || this.name == undefined){
    this.addressErr = true
   }
   if(this.bio == ''|| this.bio == null || this.bio == undefined){
    this.bioErr = true
   }
   if(this.education == ''|| this.education == null || this.education == undefined){
    this.educationErr = true
   }
   if(this.teachingExperiance == ''|| this.teachingExperiance == null || this.teachingExperiance == undefined){
    this.teachingExperianceErr = true
   }
   if(this.subject == ''|| this.subject == null || this.subject == undefined){
    this.subjectErr = true
   }

   if (err == 0) {
     const data = {
       "name": this.name,
       "address": this.address,
       "bio":this.bio,
       "education": this.education,
       "teachingExperiance": this.teachingExperiance,
       "subject": this.subject,
     }
    //  this.common.loaderStart()
    //  this.restApi.addCourseEnrollFree(data).subscribe((res: any) => {
    //    this.common.loaderEnd()
    //    if (res.success) {
    //      this.notifierService.notify('success', res.message);
    //    } else {
    //      this.notifierService.notify('error', res.message);
    //    }
    //  }, (err: any) => {
    //    this.notifierService.notify('error', err.error.message)
    //  })
   }
  }


  deleteProfile():any{

  }

}
