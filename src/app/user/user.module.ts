import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { FooterComponent } from './footer/footer.component';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { CourseComponent } from './course/course.component';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
 


const notifierDefaultOptions: NotifierOptions = {
  position: {
      horizontal: {
          position: 'right',
          distance: 12,
      },
      vertical: {
          position: 'top',
          distance: 12,
          gap: 10,
      },
  },
  theme: 'material',
  behaviour: {
      autoHide: 5000,
      onClick: false,
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4,
  },
  animations: {
      enabled: true,
      show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease',
      },
      hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50,
      },
      shift: {
          speed: 300,
          easing: 'ease',
      },
      overlap: 150,
  },
};

@NgModule({
  declarations: [
    UserComponent,
    UserProfileComponent,
    LoginComponent,
    CartComponent,
    WishListComponent,
    FooterComponent,
    CourseComponent,
    AccountComponent,
    AchievementsComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    FormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
    


  ]
})
export class UserModule { }
