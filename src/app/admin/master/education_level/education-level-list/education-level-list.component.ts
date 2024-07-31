import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from "angular-notifier";

@Component({
    selector: 'app-education-level-list',
    templateUrl: './education-level-list.component.html',
    styleUrls: ['./education-level-list.component.css']
})
export class EducationLevelListComponent {

    @ViewChild('deleteModal') deleteModal: any;
    offset = 0;
    limit = 20;
    educationLevelList: any = [];
    educationLevelid = '' as any;
    selectedVal: any = 20;
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

    educationlevelid: any = ''

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
        this.getEducationLevel();
    }


    add(): any {
        this.router.navigate(['admin/app/add-education-level/0'])
    }

    edit(id: any): any {
        this.router.navigate(['admin/app/add-education-level/' + id])
    }

    previousBtnDesable: boolean = true;
    nextBtnDesable: boolean = false;

    getEducationLevel(): any {
        let obj = {
            'offset': this.offset + '',
            'limit': this.limit,
        }
        this.common.loaderStart();
        this.restapi.fetchEducationLevels(obj).subscribe((res: any) => {
            this.common.loaderEnd();
            if (res.success) {
                if (res.response) {
                    if (res.response.length > 0) {
                        this.educationLevelList = res.response;
                        this.nextBtnDesable = res.response.length < this.limit;
                    } else {
                        this.nextBtnDesable = true;
                        this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
                    }
                } else {
                    this.nextBtnDesable = true;
                }
            } else {
                this.educationLevelList = [];
            }
        })
    }
    changePagelimit(event: any): any {
        this.offset = 0;
        this.limit = Number(event.target.value);
        this.getEducationLevel();
    }

    previousPage(): any {
        this.offset = this.offset > 0 ? this.offset - this.limit : 0;
        this.offset = this.offset < 0 ? 0 : this.offset;
        this.getEducationLevel();
        if (this.offset <= 0) {
            this.previousBtnDesable = true;
        }
    }

    nextPage(): any {
        this.previousBtnDesable = false;
        this.offset = this.offset + this.limit;
        this.getEducationLevel();
    }

    onClickDelete(id:any): any {
        this.educationlevelid = id 
        this.modalService.open(this.deleteModal, { centered: true, size: 'md' });
    }

    closeModal(): any {
        this.modalService.dismissAll();
    }

    delete(): any {
        const data = { "Id": this.educationlevelid }
        this.common.loaderStart();
        this.restapi.deleteEducationLevel(data).subscribe((res: any) => {
            this.common.loaderEnd();
            console.log(res.response);
            if (res.success) {
                this.notifierService.notify('success', res.message);
                this.closeModal()
                this.getEducationLevel()
            } else {
                this.notifierService.notify('error', res.message);
            }
        })

    }

    approve(e: any): any {
        const checked = e.target.checked == false ? "0" : "1";
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
                this.getEducationLevel()
                this.notifierService.notify('success', res.message);
            } else {
                this.notifierService.notify('error', res.message);
            }
        })

    }

}
