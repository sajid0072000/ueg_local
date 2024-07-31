import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { CartComponent } from './cart/cart.component';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user.component';
import { WishListComponent } from './wish-list/wish-list.component';

const routes: Routes = [
  {
      path: '',
      component: LoginComponent
  }, {
      path: 'app', component: UserComponent,
      children: [
          {path: 'user-profile', component: UserProfileComponent},
          {path: 'cart', component: CartComponent},
          {path: 'course/:id', component: CourseComponent},
          {path: 'wish-list', component: WishListComponent},
          {path: 'account', component: AccountComponent},
          {path: 'achievement', component: AchievementsComponent},
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})




export class UserRoutingModule { }
