import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import {NgSelectModule} from '@ng-select/ng-select';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';

import {LoginComponent} from './login/login.component';
import {EducatorListComponent} from './educator/educator-list/educator-list.component';
import {AddEducatorComponent} from './educator/add-educator/add-educator.component';
import {AddLessionComponent} from './lession/add-lession/add-lession.component';
import {CourseListComponent} from './course/course-list/course-list.component';
import {AddCourseComponent} from './course/add-course/add-course.component';
import {LessionListComponent} from './lession/lession-list/lession-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AddExerciseComponent} from './exercise/add-exercise/add-exercise.component';
import {ExerciseListComponent} from './exercise/exercise-list/exercise-list.component';
import {UnitlistComponent} from './unit/unitlist/unitlist.component';
import {AddUnitComponent} from './unit/add-unit/add-unit.component';
import { AddAttachmentComponent } from './attachments/add-attachment/add-attachment.component';
import { AttachmentListComponent } from './attachments/attachment-list/attachment-list.component';
import { AddCourseEducatorMapComponent } from './course-educator-map/add-course-educator-map/add-course-educator-map.component';
import { CourseEducatorMapListComponent } from './course-educator-map/course-educator-map-list/course-educator-map-list.component';
import { LessonMappingListComponent } from './lesssonMapping/lesson-mapping-list/lesson-mapping-list.component';
import { AddLessonMappingComponent } from './lesssonMapping/add-lesson-mapping/add-lesson-mapping.component';
import { EducatorProfileComponent } from './profile/educator-profile/educator-profile.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { EducatorDashboardComponent } from './dashboard/educator-dashboard/educator-dashboard.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CategorytypeComponent } from './master/categorytype/categorytype/categorytype.component';
import { CategoriesListComponent } from './master/categories/categories-list/categories-list.component';
import { QualificationsubjectComponent } from './master/qualifiaction/qualificationsubject/qualificationsubject.component';
import { LevelsComponent } from './master/qualifiaction/levels/levels.component';
import { GradesComponent } from './master/qualifiaction/grades/grades.component';
import { SubjectListComponent } from './master/subjects/subject-list/subject-list.component';
import { InstitueListComponent } from './master/institue/institue-list/institue-list.component';
import { FooterComponent } from './footer/footer.component';
import { SkillsComponent } from './skills/skills/skills.component';
import { NgChunkUploadComponent } from './ng-chunk-upload/ng-chunk-upload.component';
import { ResourceListComponent } from './master/resource/resource-list/resource-list.component';
import { EducationLevelListComponent } from './master/education_level/education-level-list/education-level-list.component';
import { AddEducationLevelComponent } from './master/education_level/add-education-level/add-education-level.component';
import { SchoolListComponent } from './master/schools/school-list/school-list.component';
import { AddSchoolComponent } from './master/schools/add-school/add-school.component';
import { AddResourceComponent } from './master/resource/add-resource/add-resource.component';
import { AddPartnerComponent } from './master/partner/add-partner/add-partner.component';
import { PartnerListComponent } from './master/partner/partner-list/partner-list.component';
import { AddEducatorOfTheMonthComponent } from './master/educatorOfTheMonth/add-educator-of-the-month/add-educator-of-the-month.component';
import { EducatorOfTheMonthListComponent } from './master/educatorOfTheMonth/educator-of-the-month-list/educator-of-the-month-list.component';

import { DatePipe } from '@angular/common';
import { AddResourceCategoryComponent } from './master/resource_category/add-resource-category/add-resource-category.component';
import { ResourceCategoryListComponent } from './master/resource_category/resource-category-list/resource-category-list.component';
import { HeaderComponent } from './login/header/header.component';
import { AddGradesComponent } from './master/qualifiaction/add-grades/add-grades.component';
import { AddLevelsComponent } from './master/qualifiaction/add-levels/add-levels.component';
import { AddQualificationsubjectComponent } from './master/qualifiaction/add-qualificationsubject/add-qualificationsubject.component';
import { AddCategoriesListComponent } from './master/categories/add-categories-list/add-categories-list.component';
import { AddCategorytypeComponent } from './master/categorytype/add-categorytype/add-categorytype.component';
import { AddInstituteComponent } from './master/institue/add-institute/add-institute.component';
import { AddSubjectsComponent } from './master/subjects/add-subjects/add-subjects.component';
import { AddSkillsComponent } from './skills/add-skills/add-skills.component';
import { CourseenrollfreeListComponent } from './courseenrollfree-list/courseenrollfree-list.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { GetStartedlistComponent } from './get-startedlist/get-startedlist.component';
import { GetenrollCourseComponent } from './getenroll-course/getenroll-course.component';
import { GetcontactEducatorDetailsComponent } from './getcontact-educator-details/getcontact-educator-details.component';
import { EducatorSignupDetailsComponent } from './educator-signup-details/educator-signup-details.component';
import { ContactWitTeamDetailsComponent } from './contact-wit-team-details/contact-wit-team-details.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { AddUniversityComponent } from './master/uk-university/add-university/add-university.component';
import { UniversityListComponent } from './master/uk-university/university-list/university-list.component';
import { PreviewComponent } from './master/preview/preview.component';

import { UniversityPreviewComponent } from '../public/previewfolder/university-preview/university-preview.component';
import { SchoolPreviewComponent } from '../public/previewfolder/school-preview/school-preview.component';
import { EducatorPreviewComponent } from '../public/previewfolder/educator-preview/educator-preview.component';
import { CoursePreviewComponent } from '../public/previewfolder/course-preview/course-preview.component';
import { PreviewResourcesComponent } from '../public/previewfolder/preview-resources/preview-resources.component';
import { ImageModalComponent } from './image-modal/image-modal.component';

import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { StudentDetailsComponent } from './students/students-details/students-details.component';
import { JobListComponent } from './job/job-list/job-list.component';
import { AddJobComponent } from './job/add-job/add-job.component';
import { MyJobComponent } from './my-jobs/myjobs-list/my-jobs.component';
import { ViewLessonsComponent } from './my-jobs/view-lessons/view-lessons.component';
import { InvoicePreviewComponent } from './invoices/invoice-preview/invoice-preview.component';  
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { ClientAccountingComponent } from './clients/client-accounting/client-accounting.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { CalendarComponent } from './calendar/calendar.component'; 
import { RevenueAnalyticsComponent } from './revenue-analytics/revenue-analytics.component'; 
import { AnalyticsComponent  } from './analytics/analytics.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



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
        AdminComponent,
        LoginComponent,
        EducatorListComponent,
        AddEducatorComponent,
        AddLessionComponent,
        CourseListComponent,
        AddCourseComponent,
        LessionListComponent,
        AddExerciseComponent,
        ExerciseListComponent,
        UnitlistComponent,
        AddUnitComponent,
        AddAttachmentComponent,
        AttachmentListComponent,
        AddCourseEducatorMapComponent,
        CourseEducatorMapListComponent,
        LessonMappingListComponent,
        AddLessonMappingComponent,
        EducatorProfileComponent,
        AdminDashboardComponent,
        EducatorDashboardComponent,
        InstitueListComponent,
        SubjectListComponent,
        GradesComponent,
        LevelsComponent,
        QualificationsubjectComponent,
        CategoriesListComponent,
        FooterComponent,
        CategorytypeComponent,
        SkillsComponent,
        NgChunkUploadComponent,
        ResourceListComponent,
        EducationLevelListComponent,
        AddEducationLevelComponent,
        SchoolListComponent,
        AddSchoolComponent,
        AddResourceComponent,
        AddPartnerComponent,
        PartnerListComponent,
        AddEducatorOfTheMonthComponent,
        EducatorOfTheMonthListComponent,
        AddResourceCategoryComponent,
        ResourceCategoryListComponent,
        HeaderComponent,
        AddGradesComponent,
        AddLevelsComponent,
        AddQualificationsubjectComponent,
        AddCategoriesListComponent,
        AddCategorytypeComponent,
        AddInstituteComponent,
        AddSubjectsComponent,
        AddSkillsComponent,
        CourseenrollfreeListComponent,
        AddUsersComponent,
        UsersListComponent,
        GetStartedlistComponent,
        GetenrollCourseComponent,
        GetcontactEducatorDetailsComponent,
        EducatorSignupDetailsComponent,
        ContactWitTeamDetailsComponent,
        ActivityLogComponent,
        AddUniversityComponent,
        UniversityListComponent,
        PreviewComponent,
        UniversityPreviewComponent,
        SchoolPreviewComponent,
        EducatorPreviewComponent,
        CoursePreviewComponent,
        PreviewResourcesComponent,
        ImageModalComponent,
        ClientsListComponent,
        AddClientComponent,
        StudentsListComponent,
        StudentDetailsComponent,
        JobListComponent,
        AddJobComponent,
        MyJobComponent,
        ViewLessonsComponent,
        InvoicePreviewComponent,
        InvoiceListComponent,
        ClientAccountingComponent,
        CalendarComponent,
        RevenueAnalyticsComponent,
        AnalyticsComponent,
        ChangePasswordComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule,
        MatSidenavModule,
        MatButtonModule,
        MatMenuModule,
        FormsModule,
        MatAutocompleteModule,
        NgMultiSelectDropDownModule.forRoot(),
        CKEditorModule,
        ReactiveFormsModule,
        NotifierModule.withConfig(notifierDefaultOptions),
        HttpClientModule,
        NgSelectModule,
        FontAwesomeModule,
        MatToolbarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatCheckboxModule,
        MatRadioModule,
        MatListModule,
        MatExpansionModule,
        FullCalendarModule,
    ],
    providers: [
        DatePipe,
      ],
    schemas: []
})
export class AdminModule {
}
