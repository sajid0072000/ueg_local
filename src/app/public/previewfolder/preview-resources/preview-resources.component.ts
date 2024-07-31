import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-preview-resources',
  templateUrl: './preview-resources.component.html',
  styleUrls: ['./preview-resources.component.css']
})
export class PreviewResourcesComponent  implements OnInit {
  resourcename:any=''
  resourceimg:any=''
  resourceprice:any=''
  resourcecategoryname:any=''
  agerangename:any=''
  resourcelevel:any=''
  resourcedesc1:any=''
  resourcedesc2:any=''
  schoolListArr:Array<any>=[]
  resourcecategoryid:any=''
  backgroundColor:any=''
  resourcesPrev:any={}
  quantity:number=1
  constructor(public common:CommonService){}
  ngOnInit(): void {
    let resourcesPrev:any = localStorage.getItem('resourcesformData');
    this.resourcesPrev = JSON.parse(resourcesPrev);
    this.resourcename = this.resourcesPrev.resourcename;
    this.resourceimg =  this.resourcesPrev.logoURI;
    this.resourceprice = this.resourcesPrev.resourceprice;
    this.resourcecategoryname = this.resourcesPrev.resourcecategoryname;
    this.agerangename = this.resourcesPrev.agerangename;
    this.resourcelevel = this.resourcesPrev.resourcelevel;
    this.resourcedesc1 = this.resourcesPrev.resourcedesc1;
    this.resourcedesc2 = this.resourcesPrev.resourcedesc2;
    this.schoolListArr = this.resourcesPrev.schoolList;
    this.backgroundColor = this.resourcesPrev.backgroundColour;
  }

}
