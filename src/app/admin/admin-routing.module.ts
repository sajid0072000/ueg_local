import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { EducatorListComponent } from './educator/educator-list/educator-list.component';
import { AddEducatorComponent } from './educator/add-educator/add-educator.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { AddLessionComponent } from './lession/add-lession/add-lession.component';
import { LessionListComponent } from './lession/lession-list/lession-list.component';
import { AddExerciseComponent } from './exercise/add-exercise/add-exercise.component';
import { ExerciseListComponent } from './exercise/exercise-list/exercise-list.component';
import { UnitlistComponent } from './unit/unitlist/unitlist.component';
import { AddUnitComponent } from './unit/add-unit/add-unit.component';
import { AddAttachmentComponent } from './attachments/add-attachment/add-attachment.component';
import { AttachmentListComponent } from './attachments/attachment-list/attachment-list.component';
import { AddCourseEducatorMapComponent } from './course-educator-map/add-course-educator-map/add-course-educator-map.component';
import { CourseEducatorMapListComponent } from './course-educator-map/course-educator-map-list/course-educator-map-list.component';
import { LessonMappingListComponent } from './lesssonMapping/lesson-mapping-list/lesson-mapping-list.component';
import { AddLessonMappingComponent } from './lesssonMapping/add-lesson-mapping/add-lesson-mapping.component';
import { EducatorProfileComponent } from './profile/educator-profile/educator-profile.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { EducatorDashboardComponent } from './dashboard/educator-dashboard/educator-dashboard.component';
import { CategorytypeComponent } from './master/categorytype/categorytype/categorytype.component';
import { CategoriesListComponent } from './master/categories/categories-list/categories-list.component';
import { InstitueListComponent } from './master/institue/institue-list/institue-list.component';
import { SubjectListComponent } from './master/subjects/subject-list/subject-list.component';
import { QualificationsubjectComponent } from './master/qualifiaction/qualificationsubject/qualificationsubject.component';
import { LevelsComponent } from './master/qualifiaction/levels/levels.component';
import { GradesComponent } from './master/qualifiaction/grades/grades.component';
import { SkillsComponent } from './skills/skills/skills.component';
import { AddEducationLevelComponent } from './master/education_level/add-education-level/add-education-level.component';
import { EducationLevelListComponent } from './master/education_level/education-level-list/education-level-list.component';
import { ResourceListComponent } from './master/resource/resource-list/resource-list.component';
import { SchoolListComponent } from './master/schools/school-list/school-list.component';
import { AddSchoolComponent } from './master/schools/add-school/add-school.component';
import { AddResourceComponent } from './master/resource/add-resource/add-resource.component';
import { AddPartnerComponent } from './master/partner/add-partner/add-partner.component';
import { PartnerListComponent } from './master/partner/partner-list/partner-list.component';
import { AddEducatorOfTheMonthComponent } from './master/educatorOfTheMonth/add-educator-of-the-month/add-educator-of-the-month.component';
import { EducatorOfTheMonthListComponent } from './master/educatorOfTheMonth/educator-of-the-month-list/educator-of-the-month-list.component';
import { ResourceCategoryListComponent } from './master/resource_category/resource-category-list/resource-category-list.component';
import { AddResourceCategoryComponent } from './master/resource_category/add-resource-category/add-resource-category.component';
import { AddCategoriesListComponent } from './master/categories/add-categories-list/add-categories-list.component';
import { AddCategorytypeComponent } from './master/categorytype/add-categorytype/add-categorytype.component';
import { AddInstituteComponent } from './master/institue/add-institute/add-institute.component';
import { AddSubjectsComponent } from './master/subjects/add-subjects/add-subjects.component';
import { AddSkillsComponent } from './skills/add-skills/add-skills.component';
import { AddQualificationsubjectComponent } from './master/qualifiaction/add-qualificationsubject/add-qualificationsubject.component';
import { AddLevelsComponent } from './master/qualifiaction/add-levels/add-levels.component';
import { AddGradesComponent } from './master/qualifiaction/add-grades/add-grades.component';
import { CourseenrollfreeListComponent } from './courseenrollfree-list/courseenrollfree-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { GetStartedlistComponent } from './get-startedlist/get-startedlist.component';
import { GetenrollCourseComponent } from './getenroll-course/getenroll-course.component';
import { GetcontactEducatorDetailsComponent } from './getcontact-educator-details/getcontact-educator-details.component';
import { ContactWitTeamDetailsComponent } from './contact-wit-team-details/contact-wit-team-details.component';
import { EducatorSignupDetailsComponent } from './educator-signup-details/educator-signup-details.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { AddUniversityComponent } from './master/uk-university/add-university/add-university.component';
import { UniversityListComponent } from './master/uk-university/university-list/university-list.component';
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
import { CalendarComponent  } from './calendar/calendar.component';
import { AnalyticsComponent  } from './analytics/analytics.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'app', component: AdminComponent,
        children: [
            { path: '', component: AdminDashboardComponent },
            { path: 'educators', component: EducatorListComponent },
            { path: 'add-educator/:id', component: AddEducatorComponent },
            { path: 'add-course/:id', component: AddCourseComponent },
            { path: 'course-list', component: CourseListComponent },
            { path: 'add-lession/:id', component: AddLessionComponent },
            { path: 'lession-list', component: LessionListComponent },
            { path: 'add-exercise/:id', component: AddExerciseComponent },
            { path: 'exercise-list', component: ExerciseListComponent },
            { path: 'unit-list', component: UnitlistComponent },
            { path: 'add-unit/:id', component: AddUnitComponent },
            { path: 'add-attachment/:id', component: AddAttachmentComponent },
            { path: 'attachment-list', component: AttachmentListComponent },
            { path: 'add-course-educator-map/:id', component: AddCourseEducatorMapComponent },
            { path: 'course-educator-map-list', component: CourseEducatorMapListComponent },
            { path: 'lesson-mapping', component: LessonMappingListComponent },
            { path: 'add-lessonmapping/:id', component: AddLessonMappingComponent },
            { path: 'educator-profile', component: EducatorProfileComponent },
            { path: 'categorytype', component: CategorytypeComponent },
            { path: 'add-categorytype/:id', component: AddCategorytypeComponent },
            { path: 'categories', component: CategoriesListComponent },
            { path: 'add-categories/:id', component: AddCategoriesListComponent },
            { path: 'institutes', component: InstitueListComponent },
            { path: 'add-institutes/:id', component: AddInstituteComponent },
            { path: 'add-subject/:id', component: AddSubjectsComponent },
            { path: 'subjectlist', component: SubjectListComponent },
            { path: 'qualification-subject', component: QualificationsubjectComponent },
            { path: 'add-qualification-subject/:id', component: AddQualificationsubjectComponent },
            { path: 'qualification-levels', component: LevelsComponent },
            { path: 'add-qualification-levels/:id', component: AddLevelsComponent },
            { path: 'add-qualification-grade/:id', component: AddGradesComponent },
            { path: 'qualification-grade', component: GradesComponent },
            { path: 'add-education-level/:id', component: AddEducationLevelComponent },
            { path: 'education-level-list', component: EducationLevelListComponent },
            { path: 'add-resource/:id', component: AddResourceComponent },
            { path: 'resource-list', component: ResourceListComponent },
            { path: 'add-school/:id', component: AddSchoolComponent },
            { path: 'school-list', component: SchoolListComponent },
            { path: 'skills', component: SkillsComponent },
            { path: 'add-skills/:id', component: AddSkillsComponent },
            { path: 'partner-list', component: PartnerListComponent },
            { path: 'add-partner/:id', component: AddPartnerComponent },
            { path: 'add-educator-of-the-month/:id', component: AddEducatorOfTheMonthComponent },
            { path: 'educator-of-the-month-list', component: EducatorOfTheMonthListComponent },
            { path: 'resource-catrgories-list', component: ResourceCategoryListComponent },
            { path: 'add-resource-catrgories/:id', component: AddResourceCategoryComponent },
            { path: 'enrol-list', component: CourseenrollfreeListComponent },
            { path: 'users', component: UsersListComponent },
            { path: 'add-users/:id', component: AddUsersComponent },
            { path: 'learning-request', component: GetStartedlistComponent },
            { path: 'enrolloncourse-list', component: GetenrollCourseComponent },
            { path: "contacteducator-details", component: GetcontactEducatorDetailsComponent },
            { path: 'contact-team', component: ContactWitTeamDetailsComponent },
            { path: 'educator-signup', component: EducatorSignupDetailsComponent },
            { path: 'activityLog', component: ActivityLogComponent },
            { path: 'add-university/:id', component: AddUniversityComponent },
            { path: 'university-list', component: UniversityListComponent },
            { path: 'clients-list', component: ClientsListComponent },
            { path: 'add-client/:id', component: AddClientComponent }, 
            { path: 'students-list', component: StudentsListComponent }, 
            { path: 'student-details/:id', component: StudentDetailsComponent },
            { path: 'job-list', component: JobListComponent },
            { path: 'add-job', component: AddJobComponent },
            { path: 'job-details/:id', component: AddJobComponent },
            { path: 'my-jobs', component: MyJobComponent },
            { path: 'view-lessons/:jobId', component: ViewLessonsComponent },
            { path: 'invoice-preview', component: InvoicePreviewComponent },
            { path: 'invoice-list', component: InvoiceListComponent },
            { path: 'client-accounting/:clientId', component: ClientAccountingComponent }, 
            { path: 'calendar', component: CalendarComponent  },
            { path: 'analytics', component: AnalyticsComponent },
            { path: 'changepassword', component: ChangePasswordComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
