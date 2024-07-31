import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  implements OnInit{
  year:string=''
  constructor(private router:Router, private common:CommonService){}
  ngOnInit(): void {
    const d = new Date();
    let year = d.getFullYear();
    this.year = year + '';

  }

  goto(path: any): any {
    this.common.navigate([path])
   }


   goToUsingUeg(path:any):any{
    this.common.navigate([path])
    localStorage.setItem('tab', '1');
   }
}
