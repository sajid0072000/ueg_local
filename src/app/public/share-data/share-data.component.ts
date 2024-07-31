import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-share-data',
  templateUrl: './share-data.component.html',
  styleUrls: ['./share-data.component.css']
})
export class ShareDataComponent {
  url:any=''
  constructor(
    private router: Router,
    private rest: RestApiService,
    private actroute: ActivatedRoute,
    private notifierService: NotifierService,
    public common: CommonService,
    private modalService: NgbModal,
  ) {

  }


  ngOnInit(): void {
    this.url = this.common.sheardData
  }

  closeModal(): any {
    this.modalService.dismissAll();
  }

}
