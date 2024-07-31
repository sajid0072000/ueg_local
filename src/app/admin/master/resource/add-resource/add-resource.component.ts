import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent {
  @ViewChild('deleteModal') deleteModal: any;

  public Editor = ClassicEditor;
  Name = '' as any
  Price = '' as any
  PriceErr = false as any
  NameErr = false as any
  Level = '' as any
  LevelErr = false as any
  backgroundColour = '' as any
  backgroundColourErr = false as any
  resourceid = '' as any;
  Description = '' as any
  DescriptionErr = false as any
  Description2 = '' as any
  Description2Err = false as any

  CategoryId: any = ''
  CategoryIdErr: boolean = false
  AgeRangeIdErr: boolean = false

  schoolName: any = ''
  FILE_URL: any = ''

  ImageURI: any = ''
  ImageURIErr: boolean = false

  logoURI: any = ''
  logoURIErr: any = false

  resourceErr: boolean = false;
  resourceCategoryTypeId: any = '1';
  fetchResourceCategoryArr: any = [];
  schoolSpinner: boolean = false
  schoolArr: any = []
  schoolNameErr: boolean = false
  schoolList: any = [];
  fetchAgeRangesArr: any = []
  AgeRangeId: any = '';
  resources: any = []
  selectedPDFId: number = 0;
  selectedPDFIndex: number = 0;
  resourcecategoryname:any=''
  agerangename:any=''

  constructor(
    private router: Router,
    private rest: RestApiService,
    private actroute: ActivatedRoute,
    private notifierService: NotifierService,
    public common: CommonService,
    private modalService: NgbModal,

  ) {
    this.FILE_URL = this.rest.FILE_URL;
  }

  ngOnInit(): void {
    this.fetchResourceCategory()
    this.fetchAgeRanges()
    this.resourceid = this.actroute.snapshot.params['id'];
    if (this.resourceid == 0) {
      this.resourceid = null
    }
    if (this.resourceid) {
      this.fetchResourcesDetails();
    }
  }

  goToPreview(): any {
    let url = this.rest.SERVER_BASE + '/resources-details/' + this.resourceid;
    window.open(url, '_blank');
  }

  viewPdf(obj: any) {
    // let url = this.rest.FILE_URL + obj.KeyName;
    // window.open(url, '_blank');
    this.rest.downloadResourcePDF({ "fileName": obj.KeyName }).subscribe((res: any) => {
      if(res.success) {
        let url = this.rest.Local_URL + res.response;
        window.open(url, '_blank');
      }
    });
  }

  downloadpdf(obj: any) {
    /* let url = this.rest.FILE_URL + obj.KeyName;
    saveAs(url, 'resource.pdf'); */
    this.rest.downloadResourcePDF({ "fileName": obj.KeyName }).subscribe((res: any) => {
      if(res.success) {
        let url = this.rest.Local_URL + res.response;
        saveAs(url, res.response);
      }
    });
  }
  

  fetchResourcesDetails(): any {
    const data = {
      "Id": this.resourceid
    };
    this.common.loaderStart();
    this.rest.fetchResourcesDetails(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        console.log("res", res)
        let temp = res.response[0]
        this.Name = temp.Name
        this.Price = temp.Price
        this.Level = temp.Level
        this.backgroundColour = temp.backgroundColour
        this.Description = temp.Description
        this.Description2 = temp.Description2
        this.CategoryId = temp.CategoryId
        this.ImageURI = temp.ImageURI
        this.logoURI = temp.logoURI
        this.AgeRangeId = temp.AgeRangeId
        // let temp1 = []
        // for (let data of temp.resources) {
        //   temp1.push({ "Name": data.Name, "Id": data.Id, "KeyName": data.KeyName })
        // }
        this.resources = temp.resources;
        let temp2 = []
        for (let data of temp.schools) {
          temp2.push({ Id: data.Id, name: data.Name })
        }
        this.schoolList = temp2

      }
    });
  }

  fetchResourceCategory(): any {
    let data = {
      "userId": this.common.getUserId(),
      "resourceCategoryTypeId": this.resourceCategoryTypeId
    }
    this.rest.fetchResourceCategory(data).subscribe((result: any) => {
      if (result.success) {
        this.fetchResourceCategoryArr = result.response
      } else {
        this.fetchResourceCategoryArr = []
      }
    })
  }

  fetchAgeRanges(): any {
    let data = {
      "userId": this.common.getUserId(),
      "searchText": ""
    }
    this.rest.fetchAgeRanges(data).subscribe((result: any) => {
      if (result.success) {
        this.fetchAgeRangesArr = result.response
      } else {
        this.fetchAgeRangesArr = []
      }
    })
  }

  searchSchoolByName(): any {
    let obj = {
      "schoolname": this.schoolName
    };
    this.schoolSpinner = true;
    this.rest.fetchSchoolsByName(obj).subscribe((res: any) => {
      if (res.success) {
        this.schoolArr = res.response;
        this.schoolSpinner = false
      } else {
        this.schoolArr = []
        this.schoolSpinner = false
      }
    });
  }

  getSchoolIdByName(): any {
    this.schoolNameErr = false
    for (let data of this.schoolArr) {
      if (data.Name === this.schoolName) {
        if (!this.schoolList.some((item: { name: any; }) => item.name === this.schoolList)) {
          this.schoolList.push({ Id: data.Id, name: data.Name })
          this.schoolName = ''
          this.schoolArr = []
        }
      }
    }
  }

  schoolRemove(i: any): any {

    this.schoolList.splice(i, 1)

  }

  changeDescription(): any {
    this.DescriptionErr = false
  }

  changeDescription2(): any {
    this.Description2Err = false
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
      this.rest.uploadFile(fd).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.logoURI = res.response.fileName;
        }
      })
    }
  }

  uploadBtnImageURI(): any {
    let elem = document.getElementById('file-input-ImageURI')
    if (elem) {
      elem.click()
    }
  }

  onFileChangedImageURI(event: any): any {
    if (event.target.files && event.target.files.length > 0) {
      this.ImageURIErr = false
      let file = event.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      this.common.loaderStart();
      this.rest.uploadFile(fd).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.ImageURI = res.response.fileName;
        }
      })
    }
  }

  uploadBtnPDF(): any {
    let elem = document.getElementById('file-input-pdf')
    if (elem) {
      elem.click()
    }
  }


  onFileChangedPDF(event: any): any {
    if (event.target.files && event.target.files.length > 0) {
      for (let data of event.target.files) {
        this.resources.push({ "Name": data.name, "status": 0 })
      }
    }

    setTimeout(() => {
      if (event.target.files && event.target.files.length > 0) {
        for (let data of event.target.files) {
          let file = data;
          const fd = new FormData();
          fd.append('file', file);
          fd.append('uploadType', 'resource');
          this.common.loaderStart();
          this.rest.uploadFile(fd).subscribe((res: any) => {
            this.common.loaderEnd();
            if (res.success) {
              for (let obj of this.resources) {
                if (obj.Name == res.response.orgfilename) {
                  obj.Name = res.response.fileName;
                  obj.status = 1;
                  obj.KeyName = res.response.fileName;
                  break;
                }
              }
            }
          })
        }
      }
    }, 700);
  }

  deletePdf(i: any): any {
    this.resources.splice(i, 1)
  }


  changeName(): any {
    this.NameErr = false
  }

  changeLevel(): any {
    this.LevelErr = false
  }


  changebackgroundColour(): any {
    this.backgroundColourErr = false
  }

  resetForm() {

    this.PriceErr = false
    this.NameErr = false
    this.LevelErr = false
    this.backgroundColourErr = false
    this.CategoryIdErr = false
    this.AgeRangeIdErr = false
    this.DescriptionErr = false
    this.Description2Err = false
    this.ImageURIErr = false
    this.logoURIErr = false
    this.resourceErr = false

    this.Name = ''
    this.Price = ''
    this.Level = ''
    this.backgroundColour = ''
    this.resourceid = ''
    this.Description = ''
    this.Description2 = ''
    this.CategoryId = ''
    this.ImageURI = ''
    this.logoURI = ''
    this.resources = []
    this.schoolArr = []
    this.schoolList = []
    this.schoolName = ''
    this.AgeRangeId = ''
    this.router.navigate(["admin/app/resource-list"]);


  }

  add(): any {

    this.PriceErr = false
    this.NameErr = false
    this.LevelErr = false
    this.backgroundColourErr = false
    this.CategoryIdErr = false
    this.AgeRangeIdErr = false
    this.DescriptionErr = false
    this.Description2Err = false
    this.ImageURIErr = false
    this.logoURIErr = false
    this.resourceErr = false

    let err = 0

    if (this.Name === '' || this.Name === undefined || this.Name === null) {
      this.NameErr = true
      err++
    }

    if (this.Level === '' || this.Level === undefined || this.Level === null) {
      this.LevelErr = true
      err++
    }

    if (this.backgroundColour === '' || this.backgroundColour === undefined || this.backgroundColour === null) {
      this.backgroundColourErr = true
      err++
    }

    if (this.Price === '' || this.Price === undefined || this.Price === null) {
      this.PriceErr = true
      err++
    }


    if (this.CategoryId === '' || this.CategoryId === undefined || this.CategoryId === null) {
      this.CategoryIdErr = true
      err++
    }

    if (this.AgeRangeId === '' || this.AgeRangeId === undefined || this.AgeRangeId === null) {
      this.AgeRangeIdErr = true
      err++
    }

    if (this.schoolList.length === 0) {
      this.NameErr = true
      err++
    }

    if (this.Description === '' || this.Description === undefined || this.Description === null) {
      this.DescriptionErr = true
      err++
    }

    if (this.Description2 === '' || this.Description2 === undefined || this.Description2 === null) {
      this.Description2Err = true
      err++
    }

    if (this.logoURI === '' || this.logoURI === undefined || this.logoURI === null) {
      this.logoURIErr = true
      err++
    }

    if (this.ImageURI === '' || this.ImageURI === undefined || this.ImageURI === null) {
      this.ImageURIErr = true
      err++
    }

    if (this.resources.length === 0) {
      this.resourceErr = true
      err++
    }


    if (err == 0) {



      let data = {
        "Name": this.Name,
        "Level": this.Level,
        "backgroundColour": this.backgroundColour,
        "Price": this.Price,
        "CategoryId": this.CategoryId,
        "AgeRangeId": this.AgeRangeId,
        "schoolsId": this.schoolList,
        "Description": this.Description,
        "Description2": this.Description2,
        "logoURI": this.logoURI,
        "ImageURI": this.ImageURI,
        "resources": this.resources
      }

      this.common.loaderStart()
      this.rest.insertResources(data).subscribe((res: any) => {
        this.common.loaderEnd()
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/resource-list'])
        } else {
          this.notifierService.notify('error', res.message);
        }
      })
    }
  }

  edit() {
    this.PriceErr = false
    this.NameErr = false
    this.LevelErr = false
    this.backgroundColourErr = false
    this.CategoryIdErr = false
    this.AgeRangeIdErr = false
    this.DescriptionErr = false
    this.Description2Err = false
    this.ImageURIErr = false
    this.logoURIErr = false
    this.resourceErr = false

    let err = 0

    if (this.Name === '' || this.Name === undefined || this.Name === null) {
      this.NameErr = true
      err++
    }

    if (this.Level === '' || this.Level === undefined || this.Level === null) {
      this.LevelErr = true
      err++
    }

    if (this.backgroundColour === '' || this.backgroundColour === undefined || this.backgroundColour === null) {
      this.backgroundColourErr = true
      err++
    }

    if (this.Price === '' || this.Price === undefined || this.Price === null) {
      this.PriceErr = true
      err++
    }


    if (this.CategoryId === '' || this.CategoryId === undefined || this.CategoryId === null) {
      this.CategoryIdErr = true
      err++
    }

    if (this.AgeRangeId === '' || this.AgeRangeId === undefined || this.AgeRangeId === null) {
      this.AgeRangeIdErr = true
      err++
    }

    if (this.schoolList.length === 0) {
      this.NameErr = true
      err++
    }

    if (this.Description === '' || this.Description === undefined || this.Description === null) {
      this.DescriptionErr = true
      err++
    }

    if (this.Description2 === '' || this.Description2 === undefined || this.Description2 === null) {
      this.Description2Err = true
      err++
    }

    if (this.logoURI === '' || this.logoURI === undefined || this.logoURI === null) {
      this.logoURIErr = true
      err++
    }

    if (this.ImageURI === '' || this.ImageURI === undefined || this.ImageURI === null) {
      this.ImageURIErr = true
      err++
    }

    if (this.resources.length === 0) {
      this.resourceErr = true
      err++
    }


    if (err == 0) {
      let data = {
        "Id": this.resourceid,
        "Name": this.Name,
        "Level": this.Level,
        "backgroundColour": this.backgroundColour,
        "Price": this.Price,
        "CategoryId": this.CategoryId,
        "AgeRangeId": this.AgeRangeId,
        "schoolsId": this.schoolList,
        "Description": this.Description,
        "Description2": this.Description2,
        "logoURI": this.logoURI,
        "ImageURI": this.ImageURI,
        "resources": this.resources
      }

      console.log("data", this.resources)

      this.common.loaderStart()
      this.rest.updateResources(data).subscribe((res: any) => {
        this.common.loaderEnd()
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/resource-list'])
        } else {
          this.notifierService.notify('error', res.message);
        }
      })
    }

  }

  onClickDelete(): any {
    this.modalService.open(this.deleteModal, { centered: true, size: 'md' });
  }

  closeModal(): any {
    this.modalService.dismissAll();
  }

  delete(): any {
    const data = { "Id": this.resourceid }
    this.common.loaderStart();
    this.rest.deleteResources(data).subscribe((res: any) => {
      this.common.loaderEnd();
      console.log(res.response);
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.closeModal()
        this.router.navigate(["admin/app/resource-list"]);
      } else {
        this.notifierService.notify('error', res.message);
      }
    })

  }
  goBack() {
    this.router.navigate(["admin/app/resource-list"]);
  }

  confirmDeleteResourcePDF(deletePDFModal: any, i: number, id: number) {
    if (id) {
      this.selectedPDFId = id;
      this.selectedPDFIndex = i;
      this.modalService.open(deletePDFModal, { centered: true, size: 'md' });
    } else {
      this.resources.splice(i, 1);
    }
  }


  deleteResourcePDF() {
    if (this.selectedPDFId > 0) {
      this.common.loaderStart();
      this.modalService.dismissAll();
      this.rest.deleteResourcePDF({ "id": this.selectedPDFId }).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.resources.splice(this.selectedPDFIndex, 1);
          this.notifierService.notify('success', res.message);
        } else {
          this.notifierService.notify('error', res.message);
        }
      }, (err: any) => {
        this.common.loaderEnd();
        this.notifierService.notify('error', err.error.message);
      });
    }
  }

  viewImg(imageurl: string) {
    let url = this.common.imgCheck(imageurl);
    window.open(url, '_blank');
  }

  previewResourcesDetails():any{
    for(let data of this.fetchResourceCategoryArr){
      if(data.ResourceCategoryId == this.CategoryId){
        this.resourcecategoryname = data.ResourceCategoryName;
      }
    }
    for(let data of this.fetchAgeRangesArr){
      if(data.Id == this.AgeRangeId)
      this.agerangename = data.Name;
    }
    let resourcesformData = {
      resourcecategoryname:this.resourcecategoryname,
      resourcename:this.Name,
      resourcelevel: this.Level,
      backgroundColour: this.backgroundColour,
      resourceprice:this.Price,
      CategoryId:this.CategoryId,
      AgeRangeId:this.AgeRangeId,
      schoolListArr:this.schoolList,
      resourcedesc1:this.Description,
      resourcedesc2:this.Description2,
      logoURI:this.logoURI,
      resourceimg:this.ImageURI,
      agerangename:this.agerangename,
  }
  localStorage.setItem('resourcesformData', JSON.stringify(resourcesformData));
  const previewUrl = "/resourcespreview"
  window.open(previewUrl, '_blank');
}





}
