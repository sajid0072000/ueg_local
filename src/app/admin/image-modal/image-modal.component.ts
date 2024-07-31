import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent  implements OnInit{
  constructor(public common:CommonService, private modalService:NgbModal){}
  ngOnInit(): void {
  }


  closeModal(){
    this.modalService.dismissAll()
  }

}
