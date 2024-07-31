import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CommonService} from "../../common.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  implements OnInit{
  year: number = 0;
  constructor(private common:CommonService){}

  ngOnInit(): void {
    this.year = this.common.getCurrentYear();
  }



}
