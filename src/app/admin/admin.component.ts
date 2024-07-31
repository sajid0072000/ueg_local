import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "../common.service";
import { RestApiService } from "../rest-api.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  showDrawer = true;
  drawer: any;

  menuArr = [] as any;

  url = "" as any;
  panelOpenState = false;
  roleid: any = '';

  constructor(private router: Router, public common: CommonService, private rest: RestApiService) { }

  ngOnInit(): void {
    if (!this.common.getUserId()) {
      this.router.navigate(['/']);
    }
    
    this.roleid = sessionStorage.getItem('roleid');
    this.getMenu();
    this.common.addBodyClass()
    this.common.Subject.subscribe((res: any) => {
      this.roleid = sessionStorage.getItem('roleid');
      this.menuArr = [];
      this.getMenu();
    })
  }

  getMenu(): any {
    if (this.roleid == 1) {
      this.menuArr.push(
        { path: "/admin/app/course-list", name: "Courses", child: [] },
        { path: "/admin/app/educators", name: "Educators", child: [] },
        {
          path: "",
          name: "Course Config",
          child: [
            { path: "/admin/app/lession-list", name: "Lesson" },
            { path: "/admin/app/unit-list", name: "Unit" },
            { path: "/admin/app/exercise-list", name: "Exercise" },
            { path: "/admin/app/attachment-list", name: "Attachment" },
            { path: "/admin/app/lesson-mapping", name: "Lesson Mapping" },
            {
              path: "/admin/app/course-educator-map-list",
              name: "Course Educator Mapping",
            },
          ],
        },
        {
          path: "",
          name: "Resources",
          child: [
            { path: "/admin/app/resource-catrgories-list", name: "Category" },
            { path: "/admin/app/resource-list", name: "Resources" },
          ],
        },
        {
          path: "",
          name: "UK STUDY",
          child: [
            { path: "/admin/app/school-list", name: "Schools" },
            { path: "/admin/app/university-list", name: "Universities" },

          ],
        },
        {
          path: "",
          name: "Admin",
          child: [
            { path: "/admin/app/users", name: "Users" },
            {
              path: "/admin/app/educator-of-the-month-list",
              name: "Eduactor of the Month",
            },
            { path: "/admin/app/activityLog", name: "Activity Log" },
            { path: "/admin/app/clients-list", name: "Clients" },
            { path: "/admin/app/students-list", name: "Students" },
            { path: "/admin/app/job-list", name: "Jobs" },
            { path: "/admin/app/invoice-list", name: "Invoices" },
            { path: "/admin/app/partner-list", name: "Partners" },
            { path: "/admin/app/enrol-list", name: "Enrol" },
            { path: "/admin/app/learning-request", name: "Learning Request" },
            { path: "/admin/app/enrolloncourse-list", name: "Enrol on Course" },
            {
              path: "/admin/app/contacteducator-details",
              name: "Contact Educator",
            },
            { path: "/admin/app/educator-signup", name: "Educator Sign Up Request" },
            { path: "/admin/app/contact-team", name: "Contact With Team" },
            { path: "/admin/app/analytics", name: "Analytics" },
          ],
        },
        {
          path: "",
          name: "Data",
          child: [
            { path: "/admin/app/categories", name: "Category" },
            { path: "/admin/app/categorytype", name: "Category Type" },
            { path: "/admin/app/institutes", name: "Institute" },
            { path: "/admin/app/subjectlist", name: "Subject" },
            { path: "/admin/app/skills", name: "Skills" },
            {
              path: "/admin/app/qualification-subject",
              name: "Qualification Subjects",
            },
            {
              path: "/admin/app/qualification-levels",
              name: "Qualification Levels",
            },
            {
              path: "/admin/app/qualification-grade",
              name: "Qualification Grades",
            },
            {
              path: "/admin/app/education-level-list",
              name: "Education Levels",
            },
          ],
        }
      );
    }

    if (this.roleid == 2) {
      this.menuArr.push(
        {
          path: "/admin/app/course-list",
          name: "Course",
          icon: "book",
          child: [],
        },
        // { path: "/admin/app/educators", name: "Educator", child: [] },
        {
          path: "/admin/app/educator-profile",
          name: "Educator Profile",
          icon: "people",
          child: [],
        },
        {
          path: "",
          name: "Course Config",
          child: [
            { path: "/admin/app/lession-list", name: "Lesson" },
            { path: "/admin/app/unit-list", name: "Unit" },
            { path: "/admin/app/exercise-list", name: "Exercise" },
            { path: "/admin/app/attachment-list", name: "Attachment" },
            { path: "/admin/app/lesson-mapping", name: "Lesson Mapping" },
          ],
        },
        {
          path: "/admin/app/my-jobs",
          name: "My Lessons",
          child: [],
        }
      );
    }
    if (this.roleid == 3) {
      this.menuArr.push(
        {
          path: "/admin/app/course-list",
          name: "Course",
          icon: "book",
          child: [],
        },
        { path: "/admin/app/educators", name: "Educator", child: [] },
        {
          path: "",
          name: "Resources",
          child: [
            { path: "/admin/app/resource-catrgories-list", name: "Category" },
            { path: "/admin/app/school-list", name: "Schools" },
            { path: "/admin/app/resource-list", name: "Resources" },
          ],
        },
        {
          path: "",
          name: "Course Config",
          child: [
            { path: "/admin/app/lession-list", name: "Lesson" },
            { path: "/admin/app/unit-list", name: "Unit" },
            { path: "/admin/app/exercise-list", name: "Exercise" },
            { path: "/admin/app/attachment-list", name: "Attachment" },
            { path: "/admin/app/lesson-mapping", name: "Lesson Mapping" },
          ],
        },
      )
    }
  }

  gotoHome(p: any): any {
      this.router.navigate([p])
  }

  gotoCalendar(): void {
    this.router.navigate(['/admin/app/calendar']);
  }

  gotoChangePassword(): void {
    this.router.navigate(['/admin/app/changepassword']);
  }

  goto(obj: any): void {
    this.url = obj.path;
    this.router.navigate([obj.path]);
    this.addActivityLog(obj.name);
  }

  addActivityLog(page: any): void {
    const data = {
      userid: this.common.getUserId(),
      pagename: page,
    };

    this.rest.addActivityLog(data).subscribe((result: any) => {
      if (result.success) {
        // Handle success
      } else {
        // Handle failure
      }
    });
  }

  logout(): void {
    this.common.clearUserData();
    this.common.removeBodyClass();
    this.router.navigate(["/admin"]);
  }
}
