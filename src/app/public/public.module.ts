import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { FormsModule } from '@angular/forms';
import { CoursesComponent } from './courses/courses.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriprionSuccessComponent } from './subscriprion-success/subscriprion-success.component';
import { ResourcesComponent } from './resources/resources.component';
import { ResourcesDetailsComponent } from './resources-details/resources-details.component';
import { EducatorsComponent } from './educators/educators.component';
import { EducatorDetailsComponent } from './educator-details/educator-details.component';
import {MatMenuModule} from '@angular/material/menu';

import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { PartnershipsComponent } from './partnerships/partnerships.component';
import { UsingUEGComponent } from './using-ueg/using-ueg.component';
import { MeetOurTeamComponent } from './meet-our-team/meet-our-team.component';
import { BecomeAnEducatorComponent } from './become-an-educator/become-an-educator.component';
import { SchoolsComponent } from './schools/schools.component';
import { ResourcecheckOutComponent } from './resourcecheck-out/resourcecheck-out.component';
import { GetStatedComponent } from './get-stated/get-stated.component';
import { EnrolOnCourseComponent } from './enrol-on-course/enrol-on-course.component';
import { ContactEducatorComponent } from './contact-educator/contact-educator.component';
import { ShareDataComponent } from './share-data/share-data.component';

import {ClipboardModule} from '@angular/cdk/clipboard';
import { CookiesComponent } from './cookies/cookies.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SafeguardingComponent } from './safeguarding/safeguarding.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUegComponent } from './about-ueg/about-ueg.component';
import { PrerecordedComponent } from './prerecorded/prerecorded.component';

import { UkSchoollistComponent } from './ukstudy/uk-schoollist/uk-schoollist.component';
import { UkUniversitylistComponent } from './ukstudy/uk-universitylist/uk-universitylist.component';
import { UkschoolDetailsComponent } from './ukstudy/ukschool-details/ukschool-details.component';
import { UkuniversityDetailsComponent } from './ukstudy/ukuniversity-details/ukuniversity-details.component';
import { GetTonowComponent } from './get-tonow/get-tonow.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

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
      autoHide: 15000,
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
          speed: 500,
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
    PublicComponent,
    FooterComponent,
    HomeComponent,
    CourseDetailsComponent,
    CoursesComponent,
    SubscriptionComponent,
    SubscriprionSuccessComponent,
    ResourcesComponent,
    ResourcesDetailsComponent,
    EducatorsComponent,
    EducatorDetailsComponent,
    PartnershipsComponent,
    UsingUEGComponent,
    MeetOurTeamComponent,
    BecomeAnEducatorComponent,
    SchoolsComponent,
    ResourcecheckOutComponent,
    GetStatedComponent,
    EnrolOnCourseComponent,
    ContactEducatorComponent,
    ShareDataComponent,
    CookiesComponent,
    PrivacyComponent,
    SafeguardingComponent,
    TermsConditionsComponent,
    ContactUsComponent,
    AboutUegComponent,
    PrerecordedComponent,
    UkSchoollistComponent,
    UkUniversitylistComponent,
    UkschoolDetailsComponent,
    UkuniversityDetailsComponent,
    GetTonowComponent,
    UserDashboardComponent

  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    ClipboardModule,
    MatMenuModule,
    MatProgressBarModule,
    SlickCarouselModule
  ]
})
export class PublicModule { }
