import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-resource-category',
  templateUrl: './add-resource-category.component.html',
  styleUrls: ['./add-resource-category.component.css']
})
export class AddResourceCategoryComponent {
  public Editor = ClassicEditor;

  @ViewChild('deleteModal') deleteModal: any;

  resourcecategoriesid: any = ''
  fetchResourceCategoryTypesArr: any = []

  ResourceCategoryName: any = ''
  ResourceCategoryTypeId: any = ''
  Description: any = ''

  ResourceCategoryNameErr: boolean = false
  ResourceCategoryTypeIdErr: boolean = false
  DescriptionErr: boolean = false

  IsActive:boolean=false

  constructor(
    private router: Router,
    private rest: RestApiService,
    private actroute: ActivatedRoute,
    private notifierService: NotifierService,
    private common: CommonService,
    private modalService: NgbModal,

  ) {
  }

  ngOnInit(): void {
    this.fetchResourceCategoryTypes()
    this.resourcecategoriesid = this.actroute.snapshot.params['id'];
    if (this.resourcecategoriesid == 0) {
      this.resourcecategoriesid = null
    }
    if (this.resourcecategoriesid) {
      this.fetchResourceCategoryDetails();
    }
  }

  fetchResourceCategoryDetails(): any {
    const data = {
      "ResourceCategoryId": this.resourcecategoriesid
    };
    this.common.loaderStart();
    this.rest.fetchResourceCategoryDetails(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        console.log("res", res)
        let temp = res.response[0]
        // this.Name = temp.Name
        this.ResourceCategoryName = temp.ResourceCategoryName
        this.Description = temp.Description
        this.ResourceCategoryTypeId = temp.ResourceCategoryTypeId
        this.IsActive = temp.IsActive==0?false:true
      }
    });
  }










  fetchResourceCategoryTypes(): any {
    let data = {
      "userId": this.common.getUserId(),
    }
    this.rest.fetchResourceCategoryTypes(data).subscribe((result: any) => {
      if (result.success) {
        this.fetchResourceCategoryTypesArr = result.response
      } else {
        this.fetchResourceCategoryTypesArr = []
      }
    })
  }

  changeResourceCategoryName(): any {
    this.ResourceCategoryNameErr = false
  }
  changeDescription(): any {
    this.DescriptionErr = false

  }
  goBack() {
    this.router.navigate(["admin/app/resource-catrgories-list"]);
}

  resetForm() {

    this.ResourceCategoryNameErr = false
    this.ResourceCategoryTypeIdErr = false
    this.DescriptionErr = false

    this.resourcecategoriesid = ''
    this.fetchResourceCategoryTypesArr = []

    this.ResourceCategoryName = ''
    this.ResourceCategoryTypeId = ''
    this.Description = ''
    this.router.navigate(['admin/app/resource-catrgories-list'])


  }

  add(): any {

    this.ResourceCategoryNameErr = false
    this.ResourceCategoryTypeIdErr = false
    this.DescriptionErr = false

    let err = 0

    if (this.ResourceCategoryName === '' || this.ResourceCategoryName === undefined || this.ResourceCategoryName === null) {
      this.ResourceCategoryNameErr = true
      err++
    }

    if (this.ResourceCategoryTypeId === '' || this.ResourceCategoryTypeId === undefined || this.ResourceCategoryTypeId === null) {
      this.ResourceCategoryTypeIdErr = true
      err++
    }

    // if (this.Description === '' || this.Description === undefined || this.Description === null) {
    //   this.DescriptionErr = true
    //   err++
    // }

    if (err == 0) {

      let data = {
        "ResourceCategoryName": this.ResourceCategoryName,
        "Description": this.Description,
        "ResourceCategoryTypeId": this.ResourceCategoryTypeId,
        IsActive: this.IsActive==false?0:1
      }

      this.common.loaderStart()
      this.rest.insertResourceCategory(data).subscribe((res: any) => {
        this.common.loaderEnd()
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/resource-catrgories-list'])
        } else {
          this.notifierService.notify('error', res.message);
        }
      })
    }
  }

  edit() {
    this.ResourceCategoryNameErr = false
    this.ResourceCategoryTypeIdErr = false
    this.DescriptionErr = false

    let err = 0

    if (this.ResourceCategoryName === '' || this.ResourceCategoryName === undefined || this.ResourceCategoryName === null) {
      this.ResourceCategoryNameErr = true
      err++
    }

    if (this.ResourceCategoryTypeId === '' || this.ResourceCategoryTypeId === undefined || this.ResourceCategoryTypeId === null) {
      this.ResourceCategoryTypeIdErr = true
      err++
    }

    // if (this.Description === '' || this.Description === undefined || this.Description === null) {
    //   this.DescriptionErr = true
    //   err++
    // }

    if (err == 0) {

      let data = {
        "ResourceCategoryId" : this.resourcecategoriesid,
        "ResourceCategoryName": this.ResourceCategoryName,
        "Description": this.Description,
        "ResourceCategoryTypeId": this.ResourceCategoryTypeId,
        IsActive: this.IsActive==false?0:1
      }

      this.common.loaderStart()
      this.rest.updateResourceCategory(data).subscribe((res: any) => {
        this.common.loaderEnd()
        if (res.success) {
          this.notifierService.notify('success', res.message);
          this.resetForm()
          this.router.navigate(['admin/app/resource-catrgories-list'])
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
    const data = { "ResourceCategoryId": this.resourcecategoriesid }
    this.common.loaderStart();
    this.rest.deleteResourceCategory(data).subscribe((res: any) => {
      this.common.loaderEnd();
      console.log(res.response);
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.closeModal()
        this.router.navigate(["admin/app/resource-catrgories-list"]);
      } else {
        this.notifierService.notify('error', res.message);
      }
    })

  }

}
