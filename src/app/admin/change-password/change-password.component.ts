import { Component } from '@angular/core';
import { RestApiService } from 'src/app/rest-api.service';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor(
    private restapi: RestApiService,
    private notifierService: NotifierService,
    public common: CommonService,

  ) { }

  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';



  changePassword() {
    if (this.newPassword == this.confirmNewPassword) {
      const data = {
        userid: this.common.getUserId(),
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        confirmNewPassword: this.confirmNewPassword
      };

      this.restapi.changePassword(data).subscribe((result: any) => {
        if (result.success) {
          this.notifierService.notify('success', result.message);
          this.currentPassword = "";
          this.newPassword = "";
          this.confirmNewPassword = "";
        } else {
          this.notifierService.notify('error', result.message);
        }
      });
    } else {
      this.notifierService.notify('error', "New password and Confirm password is not matched!");
    }
  }

}
