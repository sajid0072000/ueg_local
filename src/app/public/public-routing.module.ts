import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BecomeAnEducatorComponent } from './become-an-educator/become-an-educator.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesComponent } from './courses/courses.component';
import { EducatorDetailsComponent } from './educator-details/educator-details.component';
import { EducatorsComponent } from './educators/educators.component';
import { HomeComponent } from './home/home.component';
import { MeetOurTeamComponent } from './meet-our-team/meet-our-team.component';
import { PartnershipsComponent } from './partnerships/partnerships.component';
import { PublicComponent } from './public.component';
import { ResourcecheckOutComponent } from './resourcecheck-out/resourcecheck-out.component';
import { ResourcesDetailsComponent } from './resources-details/resources-details.component';
import { ResourcesComponent } from './resources/resources.component';
import { SchoolsComponent } from './schools/schools.component';
import { SubscriprionSuccessComponent } from './subscriprion-success/subscriprion-success.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UsingUEGComponent } from './using-ueg/using-ueg.component';
import { CookiesComponent } from './cookies/cookies.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SafeguardingComponent } from './safeguarding/safeguarding.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { AboutUegComponent } from './about-ueg/about-ueg.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrerecordedComponent } from './prerecorded/prerecorded.component';
import { UkSchoollistComponent } from './ukstudy/uk-schoollist/uk-schoollist.component';
import { UkschoolDetailsComponent } from './ukstudy/ukschool-details/ukschool-details.component';
import { UkUniversitylistComponent } from './ukstudy/uk-universitylist/uk-universitylist.component';
import { UkuniversityDetailsComponent } from './ukstudy/ukuniversity-details/ukuniversity-details.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SchoolPreviewComponent } from './previewfolder/school-preview/school-preview.component';
import { UniversityPreviewComponent } from './previewfolder/university-preview/university-preview.component';
import { PreviewResourcesComponent } from './previewfolder/preview-resources/preview-resources.component';
import { EducatorPreviewComponent } from './previewfolder/educator-preview/educator-preview.component';
import { CoursePreviewComponent } from './previewfolder/course-preview/course-preview.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'courses/:id/:isLive', component: CoursesComponent },
      { path: 'course-details/:id', component: CourseDetailsComponent },
      { path: 'subscription', component: SubscriptionComponent },
      { path: 'subscription-success', component: SubscriprionSuccessComponent },
      { path: 'resources', component: ResourcesComponent },
      { path: 'resources-details/:id', component: ResourcesDetailsComponent },
      { path: 'educators/:id', component: EducatorsComponent },
      { path: 'educator-details/:id', component: EducatorDetailsComponent },
      { path: 'become-an-educator', component: BecomeAnEducatorComponent },
      { path: 'our-team', component: MeetOurTeamComponent },
      { path: 'partnerships', component: PartnershipsComponent },
      { path: 'schools/:id', component: SchoolsComponent },
      { path: 'using-ueg', component: UsingUEGComponent },
      { path: 'checkout', component: ResourcecheckOutComponent },
      { path: 'Cookies', component: CookiesComponent },
      { path: 'Privacy', component: PrivacyComponent },
      { path: 'Safeguarding', component: SafeguardingComponent },
      { path: 'Terms', component: TermsConditionsComponent },
      { path: 'about-ueg', component: AboutUegComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'pre-recorded', component: PrerecordedComponent },
      { path: 'ukschoollist', component: UkSchoollistComponent },
      { path: 'ukschooldetails/:id', component: UkschoolDetailsComponent },
      { path: 'ukuniversitylist', component: UkUniversitylistComponent },
      { path: 'ukuniversityDetails/:id', component: UkuniversityDetailsComponent },
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'schoolpreview', component: SchoolPreviewComponent },
      { path: 'universitypreview', component: UniversityPreviewComponent },
      { path: 'resourcespreview', component: PreviewResourcesComponent },
      { path: 'educatorpreview', component: EducatorPreviewComponent },
      { path: 'coursepreview', component: CoursePreviewComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
