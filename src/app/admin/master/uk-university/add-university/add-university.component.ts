import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent implements OnInit {
  public Editor = ClassicEditor;

  universityId: any = '';
  name: any = '';
  universitylocation: any = '';
  mainInformation: any = '';
  universityInformation: any = '';
  additionalInformation: any = '';
  admissionsPolicy: any = '';
  imageUrl1: any = '';
  imageUrl2: any = '';
  imageUrl3: any = '';
  mobImageUrl3: any = '';
  mobImageUrl2: any = '';
  mobImageUrl1: any = '';
  logoUrl: any = '';

  FILE_URL: any = '';
  Video_URL: any = '';

  nameErr: boolean = false;
  locationErr: boolean = false;
  mainInfoErr: boolean = false;
  universityInfoErr: boolean = false;
  additionalInfoErr: boolean = false;
  policyErr: boolean = false;
  img1Err: boolean = false;
  img2Err: boolean = false;
  img3Err: boolean = false;
  mobimg1Err: boolean = false;
  mobimg2Err: boolean = false;
  mobimg3Err: boolean = false;
  logoErr: boolean = false;
  updateBtnFlag: boolean = false;

  private modalRef!: NgbModalRef;

  constructor(
    private router: Router,
    private restapi: RestApiService,
    private actroute: ActivatedRoute,
    private notifierService: NotifierService,
    public common: CommonService,
    private modalService: NgbModal,
  ) {
    this.FILE_URL = restapi.FILE_URL;
  }

  ngOnInit(): void {
    this.universityId = this.actroute.snapshot.params['id'];
    if (this.universityId && this.universityId != '0') {
      this.updateBtnFlag = true;
      this.getUniversityDetails();
    }
  }

  getUniversityDetails() {
    const data = {
      Id: Number(this.universityId)
    };
    this.common.loaderStart();
    this.restapi.getUkUniversitybyId(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        let temp = res.response;
        this.name = temp.Name;
        this.universitylocation = temp.Location;
        this.mainInformation = temp.MainInformation;
        this.additionalInformation = temp.AdditionalInformation;
        this.admissionsPolicy = temp.AdmissionsPolicy;
        this.imageUrl1 = temp.ImageUri1;
        this.imageUrl2 = temp.ImageUri2;
        this.imageUrl3 = temp.ImageUri3;
        this.mobImageUrl1 = temp.MobImageUri1;
        this.mobImageUrl2 = temp.MobImageUri2;
        this.mobImageUrl3 = temp.MobImageUri3;
        this.logoUrl = temp.LogoUri;
        this.universityInformation = temp.UniversityInformation;
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message);
    })
  }

  uploadBtnImageUri1(): any {
    let elem = document.getElementById('file1')
    if (elem) {
      elem.click()
    }
  }

  uploadBtnImageUri2(): any {
    let elem = document.getElementById('file2')
    if (elem) {
      elem.click()
    }
  }

  uploadBtnImageUri3(): any {
    let elem = document.getElementById('file3')
    if (elem) {
      elem.click()
    }
  }

  uploadBtnLogoUri(): any {
    let elem = document.getElementById('file4')
    if (elem) {
      elem.click()
    }
  }

  uploadBtnMobImageUri(elemId: string): any {
    let elem = document.getElementById(elemId)
    if (elem) {
      elem.click()
    }
  }

  onFileChangedImage1(event: any, flag: any) {
    if (event.target.files && event.target.files.length > 0) {
      if (flag == 1) {
        this.img1Err = false;
      }
      if (flag == 2) {
        this.img2Err = false;
      } if (flag == 3) {
        this.img3Err = false;
      } if (flag == 4) {
        this.logoErr = false;
      } if (flag == 5) {
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
          if (flag == 1) {
            this.imageUrl1 = res.response.fileName;
          } else if (flag == 2) {
            this.imageUrl2 = res.response.fileName;
          } else if (flag == 3) {
            this.imageUrl3 = res.response.fileName;
          } else if (flag == 4) {
            this.logoUrl = res.response.fileName
          } else if (flag == 5) {
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

  add() {
    this.nameErr = false;
    this.locationErr = false;
    this.mainInfoErr = false;
    this.universityInfoErr = false;
    this.additionalInfoErr = false;
    this.policyErr = false;
    this.img1Err = false;
    this.img2Err = false;
    this.img3Err = false;
    this.logoErr = false;

    let err = 0;
    if (this.name === '' || this.name === undefined || this.name === null) {
      this.nameErr = true;
      err++;
    }
    if (this.universitylocation === '' || this.universitylocation === undefined || this.universitylocation === null) {
      this.locationErr = true;
      err++;
    }
    if (this.mainInformation === '' || this.mainInformation === undefined || this.mainInformation === null) {
      this.mainInfoErr = true;
      err++;
    }
    if (this.additionalInformation === '' || this.additionalInformation === undefined || this.additionalInformation === null) {
      this.additionalInfoErr = true;
      err++;
    }
    if (this.admissionsPolicy === '' || this.admissionsPolicy === undefined || this.admissionsPolicy === null) {
      this.policyErr = true;
      err++;
    }
    if (this.universityInformation === '' || this.universityInformation === undefined || this.universityInformation === null) {
      this.universityInfoErr = true;
      err++;
    }
    if (this.universityInformation === '' || this.universityInformation === undefined || this.universityInformation === null) {
      this.universityInfoErr = true;
      err++;
    }
    if (this.imageUrl1 === '' || this.imageUrl1 === undefined || this.imageUrl1 === null) {
      this.img1Err = true;
      err++;
    }

    if (this.imageUrl2 === '' || this.imageUrl2 === undefined || this.imageUrl2 === null) {
      this.img2Err = true;
      err++;
    }

    if (this.imageUrl3 === '' || this.imageUrl3 === undefined || this.imageUrl3 === null) {
      this.img3Err = true;
      err++;
    }

    if (this.logoUrl === '' || this.logoUrl === undefined || this.logoUrl === null) {
      this.logoErr = true;
      err++;
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
      const data = {
        Name: this.name,
        Location: this.universitylocation,
        MainInformation: this.mainInformation,
        AdditionalInformation: this.additionalInformation,
        AdmissionsPolicy: this.admissionsPolicy,
        ImageUri1: this.imageUrl1,
        ImageUri2: this.imageUrl2,
        ImageUri3: this.imageUrl3,
        MobImageUri1: this.mobImageUrl1,
        MobImageUri2: this.mobImageUrl2,
        MobImageUri3: this.mobImageUrl3,
        LogoUri: this.logoUrl,
        UniversityInformation: this.universityInformation
      };
      this.common.loaderStart();
      this.restapi.addUkUniversity(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetform();
          this.goBack();
        } else {
          this.notifierService.notify('error', res.message);
        }
      }, (err: any) => {
        this.notifierService.notify('error', err.error.message);
      });
    }
  }

  update() {
    const data = {
      Id: this.universityId,
      Name: this.name,
      Location: this.universitylocation,
      MainInformation: this.mainInformation,
      AdditionalInformation: this.additionalInformation,
      AdmissionsPolicy: this.admissionsPolicy,
      ImageUri1: this.imageUrl1,
      ImageUri2: this.imageUrl2,
      ImageUri3: this.imageUrl3,
      MobImageUri1: this.mobImageUrl1,
      MobImageUri2: this.mobImageUrl2,
      MobImageUri3: this.mobImageUrl3,
      LogoUri: this.logoUrl,
      UniversityInformation: this.universityInformation
    };
    this.common.loaderStart();
    this.restapi.updateUkUniversity(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.resetform();
        this.goBack();
      } else {
        this.notifierService.notify('error', res.message);
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message);
    });
  }

  resetform() {
    let file1: any = document.getElementById('file1');
    let file2: any = document.getElementById('file2');
    let file3: any = document.getElementById('file3');
    let file4: any = document.getElementById('file4');

    if (file1) {
      file1.value = '';
    }
    if (file2) {
      file2.value = '';
    }
    if (file3) {
      file3.value = '';
    }
    if (file4) {
      file4.value = '';
    }

    this.name = '';
    this.universitylocation = '';
    this.mainInformation = '';
    this.universityInformation = '';
    this.additionalInformation = '';
    this.admissionsPolicy = '';
    this.imageUrl1 = '';
    this.imageUrl2 = '';
    this.imageUrl3 = '';
    this.logoUrl = '';
    this.mobImageUrl1 = '';
    this.mobImageUrl2 = '';
    this.mobImageUrl3 = '';
    this.nameErr = false;
    this.locationErr = false;
    this.mainInfoErr = false;
    this.universityInfoErr = false;
    this.additionalInfoErr = false;
    this.policyErr = false;
    this.img1Err = false;
    this.img2Err = false;
    this.img3Err = false;
    this.logoErr = false;
    this.updateBtnFlag = true;
  }

  goBack() {
    this.router.navigate(['admin/app/university-list'])
  }

  cancelForm() {
    this.resetform()
    this.router.navigate(['admin/app/university-list'])
  }

  clearNameErr() {
    this.nameErr = false;
  }

  clearLocErr() {
    this.locationErr = false;
  }

  changeMainInformation() {
    this.mainInfoErr = false;
  }

  changeUniversityInformation() {
    this.universityInfoErr = false;
  }

  changeAdditionalInformation() {
    this.additionalInfoErr = false;
  }

  changeAdmissionsPolicy() {
    this.policyErr = false;
  }

  previewUniversityDetails(): any {
    let universityFormData = {
      name: this.name,
      universitylocation: this.universitylocation,
      mainInformation: this.mainInformation,
      universityInformation: this.universityInformation,
      additionalInformation: this.additionalInformation,
      admissionsPolicy: this.admissionsPolicy,
      logoUrl: this.logoUrl,
      imageUrl1: this.imageUrl1,
      imageUrl2: this.imageUrl2,
      imageUrl3: this.imageUrl3,
      MobImageUri1: this.mobImageUrl1,
      MobImageUri2: this.mobImageUrl2,
      MobImageUri3: this.mobImageUrl3,
    };


    localStorage.setItem('universityFormData', JSON.stringify(universityFormData));
    const previewUrl = "/universitypreview";
    window.open(previewUrl, '_blank');
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

  onClickDelete(id: any, modal: any) {
    this.universityId = id;
    this.modalRef = this.modalService.open(modal, { centered: true, backdrop: false });
  }

  delete() {
    const data = {
      Id: this.universityId
    };
    this.common.loaderStart();
    this.restapi.deleteUkUniversity(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.modalRef.close();
        this.resetform();
        this.goBack();
      } else {
        this.notifierService.notify('error', res.message);
      }
    }, (err: any) => {
      this.notifierService.notify('error', err.error.message);
    });
  }

  closeModal() {
    this.modalRef.close();
  }
}
