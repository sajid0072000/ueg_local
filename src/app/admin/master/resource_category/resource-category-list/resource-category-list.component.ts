import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from "angular-notifier";

@Component({
    selector: 'app-resource-category-list',
    templateUrl: './resource-category-list.component.html',
    styleUrls: ['./resource-category-list.component.css']
})
export class ResourceCategoryListComponent {

    @ViewChild('deleteModal') deleteModal: any;
    offset = 0;
    limit = 20;
    resourceCategoriesList:any= [];
    resourceCategoriesid = '' as any;
    selectedVal: any = 20;
    previousBtnDesable: boolean = true;
    nextBtnDesable: boolean = false;
    public pageList: Array<any> = [
        { name: '10', value: '10' },
        { name: '15', value: '15' },
        { name: '20', value: '20' },
        { name: '30', value: '30' },
        { name: '50', value: '50' }
    ];
    searchText = '' as any;
    FILE_ROOT = '';
    Video_URL = '';

    constructor(
        private router: Router,
        private restapi: RestApiService,
        public common: CommonService,
        private modalService: NgbModal,
        private notifierService: NotifierService
    ) {
        this.FILE_ROOT = this.restapi.FILE_URL;
        this.Video_URL = this.restapi.Video_URL;
    }

    ngOnInit(): void {
        this.fetchResourceCategoryv1();
    }

    add(): any {
        this.router.navigate(['admin/app/add-resource-catrgories/0'])
    }

    edit(id: any): any {
        this.router.navigate(['admin/app/add-resource-catrgories/' + id])
    }

    closeAddModal() {
        this.modalService.dismissAll();
    }

    fetchResourceCategoryv1(): any {
        let obj = {
            'offset': this.offset + '',
            'limit': this.limit,
            'searchText': this.searchText
        }
        this.common.loaderStart();
        this.restapi.fetchResourceCategoryv1(obj).subscribe((res: any) => {
            this.common.loaderEnd();
            if (res.success) {
                if (res.response) {
                    if (res.response.length > 0) {
                        this.resourceCategoriesList = res.response;
                        this.nextBtnDesable = res.response.length < this.limit;
                    } else {
                        this.resourceCategoriesList=[]
                        this.nextBtnDesable = true;
                        this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
                    }
                } else {
                    this.nextBtnDesable = true;
                }
            } else {
                this.resourceCategoriesList = [];
            }
        })
    }

    

    changePagelimit(event: any): any {
        this.offset = 0;
        this.limit = Number(event.target.value);
        this.fetchResourceCategoryv1();
      }
    
      nextPage(): any {
        this.previousBtnDesable = false;
        this.offset = this.offset + this.limit;
        this.fetchResourceCategoryv1();
      }
      previousPage(): any {
        this.offset = this.offset > 0 ? this.offset - this.limit : 0;
        this.offset = this.offset < 0 ? 0 : this.offset;
        this.fetchResourceCategoryv1();
        if (this.offset <= 0) {
          this.previousBtnDesable = true;
        }
      }

    approve(e: any): any {
        const checked = e.target.checked === false ? '0' : '1';
        const checkedValue = e.target.value;
        var data = {
            "Id": checkedValue,
            "IsActive": checked
        }
        this.common.loaderStart();
        this.restapi.switchStatusEducationLevel(data).subscribe((res: any) => {
            this.common.loaderEnd();
            console.log(res.response);
            if (res.success) {
                this.fetchResourceCategoryv1()
                this.notifierService.notify('success', res.message);
            } else {
                this.notifierService.notify('error', res.message);
            }
        })

    }

    onClickDelete(id:any): any {
        this.resourceCategoriesid=id
        this.modalService.open(this.deleteModal, { centered: true, size: 'md' });
    }

    closeModal(): any {
        this.modalService.dismissAll();
    }

    delete(): any {
        const data = { "ResourceCategoryId": this.resourceCategoriesid }
        this.common.loaderStart();
        console.log("data", data)
        this.restapi.deleteResourceCategory(data).subscribe((res: any) => {
            this.common.loaderEnd();
            if (res.success) {
                this.notifierService.notify('success', res.message);
                this.closeModal()
                this.fetchResourceCategoryv1()
            } else {
                this.notifierService.notify('error', res.message);
            }
        })

    }

    search(): any {
        if (this.searchText.length >=3) {
            this.fetchResourceCategoryv1();
        }
        if (this.searchText.length == 0) {
            this.fetchResourceCategoryv1();
        }
      }

}
