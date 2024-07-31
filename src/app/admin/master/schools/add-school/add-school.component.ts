import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreviewComponent } from '../../preview/preview.component';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent {
  @ViewChild('deleteModal') deleteModal: any;


  public Editor = ClassicEditor;


  schoolid = '' as any;
  Name = '' as any
  NameErr: boolean = false
  Location: any = ''
  LocationErr: boolean = false

  MainInformation: any = ''
  MainInformationErr: boolean = false

  SchoolInformation: any = ''
  SchoolInformationErr: boolean = false

  AdditionalInformation: any = ''
  AdditionalInformationErr: boolean = false

  AdmissionsPolicy: any = ''
  AdmissionsPolicyErr: boolean = false

  logoURI: any = ''
  logoURIErr: boolean = false
  ImageUri1Err: boolean = false
  ImageUri1: any = ''
  ImageUri2: any = ''
  ImageUri2Err: boolean = false
  ImageUri3: any = ''
  ImageUri3Err: boolean = false;

  mobimg1Err: boolean = false;
  mobimg2Err: boolean = false;
  mobimg3Err: boolean = false;

  mobImageUrl3: any = '';
  mobImageUrl2: any = '';
  mobImageUrl1: any = '';



  FILE_URL: any = ''
  Video_URL: any = ''

  constructor(
    private router: Router,
    private restapi: RestApiService,
    private actroute: ActivatedRoute,
    private notifierService: NotifierService,
    public common: CommonService,
    private modalService: NgbModal,

  ) {
    this.FILE_URL = this.restapi.FILE_URL;
    this.Video_URL = this.restapi.Video_URL;
  }

  ngOnInit(): void {
    this.schoolid = this.actroute.snapshot.params['id'];
    if (this.schoolid == 0) {
      this.schoolid = null
    }
    if (this.schoolid) {
      this.fetchSchoolsDetails();
    }

  }

  fetchSchoolsDetails(): any {
    const data = {
      "Id": this.schoolid
    };
    this.common.loaderStart();
    this.restapi.fetchSchoolsDetails(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        let temp = res.response[0]
        this.Name = temp.Name
        this.Location = temp.Location
        this.MainInformation = temp.MainInformation
        this.SchoolInformation = temp.SchoolInformation
        this.AdditionalInformation = temp.AdditionalInformation
        this.AdmissionsPolicy = temp.AdmissionsPolicy
        this.logoURI = temp.LogoUri
        this.ImageUri1 = temp.ImageUri1;
        this.ImageUri2 = temp.ImageUri2;
        this.ImageUri3 = temp.ImageUri3;
        this.mobImageUrl1 = temp.MobImageUri1;
        this.mobImageUrl2 = temp.MobImageUri2;
        this.mobImageUrl3 = temp.MobImageUri3;
      }
    });
  }


  resetForm(): any {
    this.schoolid = ''
    this.Name = ''
    this.NameErr = false
    this.Location = ''
    this.LocationErr = false
    this.MainInformation = ''
    this.MainInformationErr = false
    this.SchoolInformation = ''
    this.SchoolInformationErr = false
    this.AdditionalInformation = ''
    this.AdditionalInformationErr = false
    this.AdmissionsPolicy = ''
    this.AdmissionsPolicyErr = false
    this.logoURI = ''
    this.logoURIErr = false
    this.ImageUri1Err = false
    this.ImageUri1 = ''
    this.ImageUri2 = ''
    this.ImageUri2Err = false
    this.ImageUri3 = ''
    this.ImageUri3Err = false
    this.router.navigate(['admin/app/school-list'])
  }

  changeSchoolName(): any {
    this.NameErr = false
  }

  changeLocation(): any {
    this.LocationErr = false
  }

  changeMainInformation(): any {
    this.MainInformationErr = false
  }
  changeSchoolInformation(): any {
    this.SchoolInformationErr = false
  }
  changeAdditionalInformation(): any {
    this.AdditionalInformationErr = false
  }
  changeAdmissionsPolicy(): any {
    this.AdmissionsPolicyErr = false
  }


  uploadBtnlogoURI(): any {
    let elem = document.getElementById('file-input-logoURI')
    if (elem) {
      elem.click()
    }
  }

  onFileChangedlogoURI(event: any): any {
    if (event.target.files && event.target.files.length > 0) {
      this.logoURIErr = false
      let file = event.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      this.common.loaderStart();
      this.restapi.uploadFile(fd).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.logoURI = res.response.fileName;
        }
      })
    }
  }


  uploadBtnImage1(): any {
    let elem = document.getElementById('file-input-Image1')
    if (elem) {
      elem.click()
    }
  }

  onFileChangedImage1(event: any): any {
    if (event.target.files && event.target.files.length > 0) {
      this.ImageUri1Err = false
      let file = event.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      this.common.loaderStart();
      this.restapi.uploadFile(fd).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.ImageUri1 = res.response.fileName;
        }
      })
    }
  }



  uploadBtnImage2(): any {
    let elem = document.getElementById('file-input-Image2')
    if (elem) {
      elem.click()
    }
  }

  onFileChangedImage2(event: any): any {
    if (event.target.files && event.target.files.length > 0) {
      this.ImageUri2Err = false
      let file = event.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      this.common.loaderStart();
      this.restapi.uploadFile(fd).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.ImageUri2 = res.response.fileName;
        }
      })
    }
  }


  uploadBtnImage3(): any {
    let elem = document.getElementById('file-input-Image3')
    if (elem) {
      elem.click()
    }
  }

  onFileChangedImage3(event: any): any {
    if (event.target.files && event.target.files.length > 0) {
      this.ImageUri3Err = false
      let file = event.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      this.common.loaderStart();
      this.restapi.uploadFile(fd).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.ImageUri3 = res.response.fileName;
        }
      })
    }
  }

  uploadBtnMobImageUri(elemId: string): any {
    let elem = document.getElementById(elemId)
    if (elem) {
      elem.click()
    }
  }

  onFileChangedMobImage1(event: any, flag: any) {
    if (event.target.files && event.target.files.length > 0) {
      if (flag == 5) {
        this.mobimg1Err = false;
      } if (flag == 6) {
        this.mobimg2Err = false;
      } if (flag == 7) {
        this.mobimg3Err = false;
      }
      let file = event.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      this.common.loaderStart();
      this.restapi.uploadFile(fd).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          if (flag == 5) {
            this.mobImageUrl1 = res.response.fileName;
          } else if (flag == 6) {
            this.mobImageUrl2 = res.response.fileName;
          } else if (flag == 7) {
            this.mobImageUrl3 = res.response.fileName;
          }
        }
      });
    }
  }


  add(): any {
    this.NameErr = false
    this.LocationErr = false
    this.MainInformationErr = false
    this.SchoolInformationErr = false
    this.AdditionalInformationErr = false
    this.AdmissionsPolicyErr = false
    this.logoURIErr = false
    this.ImageUri1Err = false
    this.ImageUri2Err = false
    this.ImageUri3Err = false

    let err = 0

    if (this.Name === '' || this.Name === null || this.Name === undefined) {
      this.NameErr = true
      err++
    }
    if (this.Location === '' || this.Location === null || this.Location === undefined) {
      this.LocationErr = true
      err++
    }
    if (this.MainInformation === '' || this.MainInformation === null || this.MainInformation === undefined) {
      this.MainInformationErr = true
      err++
    }
    if (this.SchoolInformation === '' || this.SchoolInformation === null || this.SchoolInformation === undefined) {
      this.SchoolInformationErr = true
      err++
    }
    if (this.AdditionalInformation === '' || this.AdditionalInformation === null || this.AdditionalInformation === undefined) {
      this.AdditionalInformationErr = true
      err++
    }
    if (this.AdmissionsPolicy === '' || this.AdmissionsPolicy === null || this.AdmissionsPolicy === undefined) {
      this.AdmissionsPolicyErr = true
      err++
    }
    if (this.logoURI === '' || this.logoURI === null || this.logoURI === undefined) {
      this.logoURIErr = true
      err++
    }
    if (this.ImageUri1 === '' || this.ImageUri1 === null || this.ImageUri1 === undefined) {
      this.ImageUri1Err = true
      err++
    }

    if (this.ImageUri2 === '' || this.ImageUri2 === null || this.ImageUri2 === undefined) {
      this.ImageUri2Err = true
      err++
    }

    if (this.ImageUri3 === '' || this.ImageUri3 === null || this.ImageUri3 === undefined) {
      this.ImageUri3Err = true
      err++
    }

    if (this.mobImageUrl1 === '' || this.mobImageUrl1 === undefined || this.mobImageUrl1 === null) {
      this.mobimg1Err = true;
      err++;
    }
    if (this.mobImageUrl2 === '' || this.mobImageUrl2 === undefined || this.mobImageUrl2 === null) {
      this.mobimg2Err = true;
      err++;
    }
    if (this.mobImageUrl3 === '' || this.mobImageUrl3 === undefined || this.mobImageUrl3 === null) {
      this.mobimg3Err = true;
      err++;
    }

    if (err == 0) {

      let data = {
        "Name": this.Name,
        "Location": this.Location,
        "MainInformation": this.MainInformation,
        "SchoolInformation": this.SchoolInformation,
        "AdditionalInformation": this.AdditionalInformation,
        "AdmissionsPolicy": this.AdmissionsPolicy,
        "ImageUri1": this.ImageUri1,
        "ImageUri2": this.ImageUri2,
        "ImageUri3": this.ImageUri3,
        MobImageUri1: this.mobImageUrl1,
        MobImageUri2: this.mobImageUrl2,
        MobImageUri3: this.mobImageUrl3,
        "LogoUri": this.logoURI
      }

      this.common.loaderStart();
      this.restapi.insertSchools(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/school-list'])
        } else {
          this.notifierService.notify('error', res.message);
        }
      });



    }



  }

  edit(): any {
    this.NameErr = false
    this.LocationErr = false
    this.MainInformationErr = false
    this.SchoolInformationErr = false
    this.AdditionalInformationErr = false
    this.AdmissionsPolicyErr = false
    this.logoURIErr = false
    this.ImageUri1Err = false
    this.ImageUri2Err = false
    this.ImageUri3Err = false

    let err = 0

    if (this.Name === '' || this.Name === null || this.Name === undefined) {
      this.NameErr = true
      err++
    }
    if (this.Location === '' || this.Location === null || this.Location === undefined) {
      this.LocationErr = true
      err++
    }
    if (this.MainInformation === '' || this.MainInformation === null || this.MainInformation === undefined) {
      this.MainInformationErr = true
      err++
    }
    if (this.SchoolInformation === '' || this.SchoolInformation === null || this.SchoolInformation === undefined) {
      this.SchoolInformationErr = true
      err++
    }
    if (this.AdditionalInformation === '' || this.AdditionalInformation === null || this.AdditionalInformation === undefined) {
      this.AdditionalInformationErr = true
      err++
    }
    if (this.AdmissionsPolicy === '' || this.AdmissionsPolicy === null || this.AdmissionsPolicy === undefined) {
      this.AdmissionsPolicyErr = true
      err++
    }
    if (this.logoURI === '' || this.logoURI === null || this.logoURI === undefined) {
      this.logoURIErr = true
      err++
    }
    if (this.ImageUri1 === '' || this.ImageUri1 === null || this.ImageUri1 === undefined) {
      this.ImageUri1Err = true
      err++
    }

    if (this.ImageUri2 === '' || this.ImageUri2 === null || this.ImageUri2 === undefined) {
      this.ImageUri2Err = true
      err++
    }

    if (this.ImageUri3 === '' || this.ImageUri3 === null || this.ImageUri3 === undefined) {
      this.ImageUri3Err = true
      err++
    }

    if (err == 0) {

      let data = {
        "Id": this.schoolid,
        "Name": this.Name,
        "Location": this.Location,
        "MainInformation": this.MainInformation,
        "SchoolInformation": this.SchoolInformation,
        "AdditionalInformation": this.AdditionalInformation,
        "AdmissionsPolicy": this.AdmissionsPolicy,
        "ImageUri1": this.ImageUri1,
        "ImageUri2": this.ImageUri2,
        "ImageUri3": this.ImageUri3,
        MobImageUri1: this.mobImageUrl1,
        MobImageUri2: this.mobImageUrl2,
        MobImageUri3: this.mobImageUrl3,
        "LogoUri": this.logoURI
      }

      this.common.loaderStart();
      this.restapi.updateSchools(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/school-list'])
        } else {
          this.notifierService.notify('error', res.message);
        }
      });
    }



  }
  onClickDelete(): any {
    this.modalService.open(this.deleteModal, { centered: true, size: 'md' });
  }

  closeModal(): any {
    this.modalService.dismissAll();
  }

  delete(): any {
    const data = { "Id": this.schoolid }
    this.common.loaderStart();
    this.restapi.deleteSchools(data).subscribe((res: any) => {
      this.common.loaderEnd();
      console.log(res.response);
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.closeModal()
        this.router.navigate(["admin/app/school-list"]);

      } else {
        this.notifierService.notify('error', res.message);
      }
    })

  }

  goBack() {
    this.router.navigate(["admin/app/school-list"]);
  }

  previewSchoolDetails():any {
    let schoolformData = {
      Name: this.Name,
      Location: this.Location,
      MainInformation: this.MainInformation,
      SchoolInformation: this.SchoolInformation,
      AdditionalInformation: this.AdditionalInformation,
      AdmissionsPolicy: this.AdmissionsPolicy,
      logoURI: this.logoURI,
      ImageUri1: this.ImageUri1,
      ImageUri2: this.ImageUri2,
      ImageUri3: this.ImageUri3,
      MobImageUri1: this.mobImageUrl1,
        MobImageUri2: this.mobImageUrl2,
        MobImageUri3: this.mobImageUrl3,
    };

    localStorage.setItem('schoolFormData', JSON.stringify(schoolformData));

    const previewUrl = "/schoolpreview"
    window.open(previewUrl, '_blank');
  }

  goToPreview(): any {
    let url = this.restapi.SERVER_BASE + '/ukschooldetails/' + this.schoolid;
    window.open(url, '_blank');
  }



  downloadImage(url: any, flag: any) {
    let finalUrl = '';
    if (flag === 0) {
      finalUrl = this.common.imgCheck(url);
    } else if (flag === 1) {
      finalUrl = this.common.imgCheck(url)
    } else if (flag === 2) {
      finalUrl = this.common.imgCheck(url)
    } else if (flag == 3) {
      finalUrl = this.common.imgCheck(url)
    }
    window.open(finalUrl, '_blank');
  }


}
