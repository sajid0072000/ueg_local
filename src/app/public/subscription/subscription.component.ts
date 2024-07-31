import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {

  constructor(
    private router: Router, private common: CommonService
  ) {

  }

  ngOnInit(): void {
  }

  goto(path: any): any {
    this.common.navigate([path]);
  }

}
