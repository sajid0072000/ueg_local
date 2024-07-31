import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormControl } from "@angular/forms";
import { RestApiService } from "src/app/rest-api.service";
import { NgxSpinnerService } from "ngx-spinner";
import { CommonService } from "src/app/common.service";
import { NotifierService } from "angular-notifier";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-educator",
  templateUrl: "./add-educator.component.html",
  styleUrls: ["./add-educator.component.css"],
})
export class AddEducatorComponent implements OnInit {

  @ViewChild("deleteModal") deleteModal: any;

  educatorname: any = "";
  educatorshortname: any = "";
  educatoremail: any = "";
  educatorphone: any = "";
  educatoraddress: any = "";
  educatorImage: any = "";
  subheading: any = "";
  educatorExpert: any = "";
  educatorAbout: any = "";
  teachingExperiance: any = "";
  fullScreenImg = "";
  searchText: any = "";
  password: any = "";
  categoryType: any = 0
  categoryTypeList: any = [];

  categoryList: any = [];
  categoriesList: any = [];

  subjectToughtList: any = [];
  subjectTought: any = [];

  gradeArr: any = [];
  gradeKeys: string[] = []
  levelArr: any = [];
  subjectArr: any = [];
  educatorsId: any = "";
  educatorDetails: any;

  gradeBackup: any = [];


  divArr: any = [
    {
      selecedSubject: "",
      selectLevel: "",
      agesFrom: "",
      agesTo: "",
    },
  ];
  qualificationArr: any = [];
  qualificationObj = {
    subjectid: "",
    subjectname: "",
    levelid: "",
    levelname: "",
    gradeid: "",
    gradename: '',
    institutionid: "",
    time: "",
    time1: "",
    time2: "",
    subjectidErr: false,
    levelidErr: false,
    gradeidErr: false,
    institutionidErr: false,
    timeErr: false,
    subjectArr: [],
    levelArr: [],
    gradeArr: [],
    gradeKeys: [],
    institutionArr: [],
  };
  public Editor = ClassicEditor;


  imageforpop: any = "";
  streets: any[] = [];
  FILE_URL = "";
  upDatebtnFlag: boolean = false;



  dropdownList = [] as any;
  selectedItems = [] as any;
  dropdownSettings = {} as any;


  dropdownList2 = [] as any;
  selectedItems2 = [] as any;
  dropdownSettings2 = {} as any;


  show: boolean = false;
  passwordType: any;

  nameFormat = /^([a-zA-Z ]){2,30}$/;
  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  subjectsArr: any = [];
  subjectsName: any = '';
  subjectsSpinner: boolean = false;
  subjectsList: any = [];

  categoriesArr: any = [];
  categoriesName: any = '';
  categoriesSpinner: boolean = false;


  educatornameErr: boolean = false;
  educatorshortnameErr: boolean = false;
  educatoremailErr: boolean = false;
  educatoremailValidErr: boolean = false;
  categoryTypeErr: boolean = false;
  educatoraddressErr: boolean = false;
  educatorImageErr: boolean = false;
  educatorphoneErr: boolean = false;
  educatorphoneValidErr: boolean = false;
  passwordErr: boolean = false;
  passwordValidErr: boolean = false;
  subheadingErr: boolean = false;
  educatorExpertErr: boolean = false;
  categoriesNameErr: boolean = false;
  subjectsNameErr: boolean = false;
  educatorAboutErr: boolean = false;
  teachingExperianceErr: boolean = false;


  categoryListErr: any = "";
  subjectToughtErr: any = "";
  qualificationErr: any = "";
  subjectErr: any = "";
  aboutErr: any = "";


  popular: boolean = false;
  featured: boolean = false;
  hidden: boolean = false;
  approve: boolean = false;
  active: boolean = false;
  eid: any = '';
  roleid: any = '';
  userId: any = '';
  showField: boolean = false;
  entity: any;
  coursesbyEducatorArr: Array<any> = []
  propularArr: any = [
    { value: null, name: "Not Set" },
    { value: "0", name: "Not Set" },
    { value: "1", name: "True" }
  ]
  featuredArr: any = [
    { value: null, name: "Not Set" },
    { value: '0', name: "Not Set" },
    { value: "1", name: "True" }
  ]


  levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional']
  institueSpinner: boolean = false

  valideducatornameErr: boolean = false;
  qualificationArr1: any = [];
  constructor(
    private router: Router,
    private restapi: RestApiService,
    private actroute: ActivatedRoute,
    public commonservice: CommonService,
    private notifierService: NotifierService,
    private modalService: NgbModal

  ) {
    this.FILE_URL = this.restapi.FILE_URL;
  }

  ngOnInit(): void {
    this.roleid = this.commonservice.getRoleId();
    this.userId = this.commonservice.getUserId();
    this.passwordType = 'password';
    this.educatorsId = this.actroute.snapshot.params["id"];
    this.qualificationArr1.push(JSON.parse(JSON.stringify(this.qualificationObj)));
    this.getCourcesByEducatorFun()

    if (this.educatorsId == 0) {
      this.educatorsId = null
    }
    if (this.educatorsId) {
      this.qualificationArr = []
      // this.getEducatorById();
    }

    this.getCategoryType();
    // this.getCategories();
    this.getSubjects();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'categoriesid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.getQualificationLevels("", this.qualificationArr1[0])

  }

  goToPreview(): any {
    let url = this.restapi.SERVER_BASE + '/educator-details/' + this.educatorsId;
    window.open(url, '_blank');
  }


  uploadBtn(): any {
    let elem = document.getElementById('file-input')
    if (elem) {
      elem.click()
    }
  }

  onClickDelete(): any {
    this.modalService.open(this.deleteModal, { centered: true, size: "md" });
  }

  deleteEducator(): any {
    let params = {
      userId: this.commonservice.getUserId(),
      educatorid: this.educatorsId,
    };
    this.commonservice.loaderStart();
    this.restapi.deleteEducator(params).subscribe(
      (res: any) => {
        this.commonservice.loaderEnd();
        if (res.success) {
          this.notifierService.notify("success", res.message);
          this.router.navigate(["admin/app/educators"]);
          this.closeModal()
        } else {
          this.notifierService.notify("error", res.message);
        }
      },
      (err: any) => {
        this.commonservice.loaderEnd();
        this.notifierService.notify("error", err.error.message);
      }
    );
  }



  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onItemSelect2(item: any) {
    console.log(item);
  }
  onSelectAll2(items: any) {
    console.log(items);
  }



  passwordShowHide(): any {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.show = true;
    } else {
      this.passwordType = 'password';
      this.show = false;
    }
  }



  onFileChanged(event: any) {
    this.educatorImageErr = false;
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const fd = new FormData();
      fd.append("file", file);
      fd.append('uploadType', 'educator')
      this.restapi.uploadFile(fd).subscribe((res: any) => {
        if (res.success) {
          this.educatorImage = res.response.fileName;
        }
      });
    }
  }

  changeEducatorNameFun(): any {
    this.educatornameErr = false;
  }

  changeEducatorShortNameFun(): any {
    this.educatorshortnameErr = false;
  }

  changeEducatorEmailFun(): any {
    this.educatoremailErr = false
    if (this.educatoremail) {
      if (!this.educatoremail.match(this.mailformat)) {
        this.educatoremailValidErr = true
      } else {
        this.educatoremailValidErr = false
      }
    }
  }

  changeEducatorcategoryTypeFun(): any {
    this.categoryTypeErr = false
  }

  changeEducatorAddressFun(): any {
    this.educatoraddressErr = false
  }

  changeEducatorPhoneFun(): any {
    this.educatorphoneErr = false;
    if (this.educatorphone) {
      if (
        this.educatorphone.toString().length > 15 ||
        this.educatorphone.toString().length < 7
      ) {
        this.educatorphoneValidErr = true
      } else {
        this.educatorphoneValidErr = false
      }
    }
  }

  changeEducatorPasswordFun(): any {
    this.passwordErr = false;
    if (this.password) {
      if (this.password.length < 8) {
        this.passwordValidErr = true;
      } else {
        this.passwordValidErr = false;
      }
    }

  }

  changeEducatorSubHeadingFun(): any {
    this.subheadingErr = false;
  }

  changeEducatorExpertFun(): any {
    this.educatorExpertErr = false
  }

  changeEducatorAboutFun(): any {
    this.educatorAboutErr = false
  }

  changeEducatorTeachingExperianceFun(): any {
    this.teachingExperianceErr = false
  }

  changeEducatorTimeFun(arr: any): any {
    arr.timeErr = false
  }
  changeEducatorInstitutionFun(arr: any) {
    arr.institutionidErr = false;
  }


  getLevelIdByName(obj: any, selectedLevel: any) {
    const exists = obj.levelList.some((level: any) => level.levelid === selectedLevel.Id);
    if (!exists) {
      obj.searchLevel = selectedLevel.Name;
      obj.levelList.push({ levelid: selectedLevel.Id, name: selectedLevel.Name });
    } else {
      obj.searchLevel = '';
    }
  }


  regTest(string: any): boolean {
    var regex = /^[A-Za-z\s]+$/;
    return regex.test(string);
  }
  onKeyPress(event: any): any {
    this.educatornameErr = false;
    this.valideducatornameErr = false
    let temp = event.key;
    if (!this.regTest(temp)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  addEducator(): any {
    this.educatornameErr = false;
    this.valideducatornameErr = false
    this.educatorshortnameErr = false
    this.educatoremailErr = false
    this.educatoremailValidErr = false
    this.categoryTypeErr = false
    this.educatoraddressErr = false
    this.educatorImageErr = false;
    this.educatorphoneErr = false;
    this.educatorphoneValidErr = false
    this.passwordErr = false;
    this.passwordValidErr = false;
    this.subheadingErr = false;
    this.educatorExpertErr = false
    this.categoriesNameErr = false
    this.subjectsNameErr = false
    this.educatorAboutErr = false
    this.teachingExperianceErr = false;


    for (let obj of this.qualificationArr) {
      obj.subjectidErr = false,
        obj.levelidErr = false,
        obj.gradeidErr = false,
        obj.institutionidErr = false,
        obj.timeErr = false
    }


    let category = []
    for (let cat of this.categoriesList) {
      category.push(
        { "categoriesid": cat.categoriesid }
      )
    }

    let subject = []
    for (let sub of this.subjectsList) {
      subject.push(
        { "subjectid": sub.subjectid, levelList: sub.levelList, "minAge": sub.minAge, "maxAge": sub.maxAge }
      )
    }

    let err = 0;

    if (
      this.educatorname == "" ||
      this.educatorname == null ||
      this.educatorname == undefined
    ) {
      this.educatornameErr = true;
      err++;
    }


    if (!this.educatorname || /^\s*$/.test(this.educatorname) || /\s{2,}/.test(this.educatorname)) {
      this.valideducatornameErr = true;
      err++;
    }

    if (
      this.educatorshortname == "" ||
      this.educatorshortname == null ||
      this.educatorshortname == undefined
    ) {

      this.educatorshortnameErr = true
      err++;
    }
    if(this.educatoremail == '' || this.educatoremail == null){
      this.educatoremailErr = true
      err++;
    } else {
      if (!this.educatoremail.match(this.mailformat)) {
        this.educatoremailValidErr = true;
        err++;
      } else {
        this.educatoremailValidErr = false
      }
    }
    if(this.password == '' || this.password == null){
      this.passwordErr = true
      err++;
    }
    for (let [index, obj] of this.qualificationArr.entries()) {
      if ((obj.subjectid == "" || obj.subjectid == null || obj.subjectid == undefined)) {
        obj.subjectidErr = true
        err++;
      }
      // if (obj.levelid == "" || obj.levelid == null || obj.levelid == undefined) {
      //   obj.levelidErr = true
      //   err++;
      // }
      // if (obj.gradeid == "" || obj.gradeid == null || obj.gradeid == undefined) {
      //   obj.gradeidErr = true
      //   err++;
      // }
      if (obj.subjectid) {
        if (obj.institutionid == "" || obj.institutionid == null || obj.institutionid == undefined) {
          obj.institutionidErr = true;
          err++;
        }
      }
    }

    for (let [index, obj] of this.qualificationArr.entries()) {
      if (obj.time1 !== '' && obj.time2 !== '') {
        obj.time = obj.time1 + ' - ' + obj.time2;
      } else if (obj.time1 !== '') {
        obj.time = obj.time1;
      } else if (obj.time2 !== '') {
        obj.time = obj.time2;
      }
      obj.subjectArr = [];
      obj.levelArr = [],
        obj.gradeArr = [],
        obj.institutionArr = [];
    }

    if (err == 0) {
      const obj = {
        'educatorid': this.eid === null ? null : this.educatorsId,
        'educatorname': this.educatorname,
        'approvedby': this.commonservice.getUserType(),
        'shortname': this.educatorshortname,
        'accesscontrol': "",
        'password': this.password,
        'webprofileId': "0",
        'requiredchecks': "",
        'availability': "",
        'address': this.educatoraddress,
        'mobile': this.educatorphone,
        'email': this.educatoremail,
        'educatorsubheading': this.subheading,
        'educatorexcerpt': this.educatorExpert,
        'categorytype': this.categoryType,
        'educatorphotouri': this.educatorImage,
        'subjectList': subject,
        'categoryList': category,
        'qualificationList': this.qualificationArr,
        'about': this.educatorAbout,
        'teachingexp': this.teachingExperiance,
        "popular": this.popular === false ? 0 : 1,
        "featured": this.featured === false ? 0 : 1,
        "hidden": this.hidden === false ? 0 : 1,
        "approve": this.approve === false ? 0 : 1,
        "active": this.active === false ? 0 : 1,
      };
      this.commonservice.loaderStart();
      this.restapi.addEducator(obj).subscribe(
        (res: any) => {
          this.commonservice.loaderEnd();
          if (res.success) {
            this.notifierService.notify("success", res.message);
            this.resetForm();
            this.router.navigate(["admin/app/educators"]);
          } else {
            this.notifierService.notify("error", res.message);
          }
        },
        (err: any) => {
          this.commonservice.loaderEnd();
          this.notifierService.notify("error", err.error.message);
        }
      );
    }


  }


  getEducatorById() {
    let obj = {
      educatorid: this.educatorsId,
    };
    this.commonservice.loaderStart();
    this.restapi.getEducatorById(obj).subscribe((res: any) => {
      this.commonservice.loaderEnd();
      if (res.success) {
        this.educatorDetails = res.response;
        if (this.userId != res.response.createdby && this.roleid != 1 && this.educatorDetails.educatorid != this.userId) {
          this.showField = true;
        } else if (this.roleid == 1) {
          this.showField = false;
        } else if (this.educatorDetails.educatorid == this.userId) {
          this.showField = false;
        } else {
          this.showField = true;
        }

        this.eid = this.educatorDetails.educatorid
        this.educatorname = this.educatorDetails.educatorname;
        this.educatorshortname = this.educatorDetails.shortname;
        this.educatoraddress = this.educatorDetails.address;
        this.educatoremail = this.educatorDetails.email;
        this.educatorphone = this.educatorDetails.mobile;
        this.educatorImage = this.educatorDetails.userphotourl;
        this.educatorAbout = this.educatorDetails.about;
        this.teachingExperiance = this.educatorDetails.teachingexp;
        this.categoryType = this.educatorDetails.categorytype;

        this.educatorExpert = this.educatorDetails.educatorexcerpt;
        this.subheading = this.educatorDetails.educatorsubheading;

        this.popular = this.educatorDetails.popular === 0 ? false : true;
        this.featured = this.educatorDetails.featured === 0 ? false : true;
        this.hidden = this.educatorDetails.hidden === 0 ? false : true;
        this.approve = this.educatorDetails.approved === 0 ? false : true;
        this.active = this.educatorDetails.active === 0 ? false : true;


        var category = []
        for (let cat of res.response.categoryList) {
          category.push(
            { "categoriesid": cat.categoryid, "name": cat.name }
          )
        }
        this.categoriesList = category


        /* var subject = []
        for (let sub of this.educatorDetails.subjectList) {
          subject.push(
            { "subjectid": sub.subjectid, "name": sub.name, levelList: [] }
          )
        } */
        this.subjectsList = this.educatorDetails.subjectList;
        if (this.educatorDetails.qualificationList.length == 0) {
          this.qualificationObj['gradeArr'] = JSON.parse(JSON.stringify(this.gradeArr));
          this.qualificationObj['gradeKeys'] = JSON.parse(JSON.stringify(this.gradeKeys));
          this.qualificationObj['institutionArr'] = JSON.parse(JSON.stringify(this.qualificationArr1[0].institutionArr));
          this.qualificationObj['subjectArr'] = JSON.parse(JSON.stringify(this.qualificationArr1[0].subjectArr));
          this.qualificationObj['levelArr'] = JSON.parse(JSON.stringify(this.qualificationArr1[0].levelArr));
        }
        for (let i = 0; i < this.educatorDetails.qualificationList.length; i++) {
          this.qualificationArr.push({
            subjectid: "",
            levelid: "",
            gradeid: "",
            gradename: '',
            institutionid: "",
            time: "",
            time1: "",
            time2: "",
            subjectArr: JSON.parse(JSON.stringify(this.qualificationArr1[0].subjectArr)),
            levelArr: JSON.parse(JSON.stringify(this.qualificationArr1[0].levelArr)),
            gradeArr: JSON.parse(JSON.stringify(this.gradeArr)),
            gradeKeys: JSON.parse(JSON.stringify(this.gradeKeys)),
            institutionArr: JSON.parse(JSON.stringify(this.qualificationArr1[0].institutionArr)),
          });

          this.qualificationArr[i].subjectid = this.educatorDetails.qualificationList[i].subjectid;
          /* this.getQualificationSubjects(
            this.educatorDetails.qualificationList[i].subjectname,
            this.qualificationArr[i]
          ); */
          this.qualificationArr[i].levelid = this.educatorDetails.qualificationList[i].levelid;
          /* this.getQualificationLevels(
            this.educatorDetails.qualificationList[i].levelname,
            this.qualificationArr[i]
          ); */
          this.qualificationArr[i].institutionid = this.educatorDetails.qualificationList[i].institutename;
          /* this.getInstitution(
            this.educatorDetails.qualificationList[i].institutename,
            this.qualificationArr[i], 1
          ); */

          this.qualificationArr[i].gradeid = this.educatorDetails.qualificationList[i].gradeid;
          this.qualificationArr[i].gradename = this.educatorDetails.qualificationList[i].gradeid;
          /* this.getQualificationGrade(
            this.educatorDetails.qualificationList[i].greadname,
            this.qualificationArr[i]
          ); */
          this.qualificationArr[i].time = this.educatorDetails.qualificationList[i].time;
          if (this.qualificationArr[i].time && this.qualificationArr[i].time !== '') {
            // this.qualificationArr[i].time1 = this.educatorDetails.qualificationList[i].time.split('-')[0].trim();
            // this.qualificationArr[i].time2 = this.educatorDetails.qualificationList[i].time.split('-')[1].trim();

            this.qualificationArr[i].time1 = this.educatorDetails.qualificationList[i].time.split('-')[0] ? this.educatorDetails.qualificationList[i].time.split('-')[0].trim() : "";
            this.qualificationArr[i].time2 = this.educatorDetails.qualificationList[i].time.split('-')[1] ? this.educatorDetails.qualificationList[i].time.split('-')[1].trim() : "";
          }
          this.selectGrade(this.qualificationArr[i])
        }
        this.qualificationArr = this.qualificationArr.length === 0 ? JSON.parse(JSON.stringify([this.qualificationObj])) : this.qualificationArr;
        // this.selectGrade(this.qualificationArr)
      }
    });
  }
  updateEducator(): any {
    this.educatornameErr = false;
    this.educatorshortnameErr = false
    this.educatoremailErr = false
    this.educatoremailValidErr = false
    this.categoryTypeErr = false
    this.educatoraddressErr = false
    this.educatorImageErr = false;
    this.educatorphoneErr = false;
    this.educatorphoneValidErr = false
    this.passwordErr = false;
    this.passwordValidErr = false;
    this.subheadingErr = false;
    this.educatorExpertErr = false
    this.categoriesNameErr = false
    this.subjectsNameErr = false
    this.educatorAboutErr = false
    this.teachingExperianceErr = false


    for (let obj of this.qualificationArr) {
      obj.subjectidErr = false,
        obj.levelidErr = false,
        obj.gradeidErr = false,
        obj.institutionidErr = false,
        obj.timeErr = false
    }


    let category = []
    for (let cat of this.categoriesList) {
      category.push(
        { "categoriesid": cat.categoriesid }
      )
    }

    let subject = []
    for (let sub of this.subjectsList) {
      subject.push(
        { "subjectid": sub.subjectid, levelList: sub.levelList, "minAge": sub.minAge, "maxAge": sub.maxAge }
      )
    }


    let err = 0;
    if (
      this.educatorname == "" ||
      this.educatorname == null ||
      this.educatorname == undefined
    ) {
      this.educatornameErr = true;
      err++;
    }

    if (
      this.educatorshortname == "" ||
      this.educatorshortname == null ||
      this.educatorshortname == undefined
    ) {
      this.educatorshortnameErr = true
      err++;
    }

    if(this.educatoremail == '' || this.educatoremail == null){
      this.educatoremailErr = true
      err++;
    } else {
      if (!this.educatoremail.match(this.mailformat)) {
        this.educatoremailValidErr = true;
        err++;
      } else {
        this.educatoremailValidErr = false
      }
    }

    


    for (let [index, obj] of this.qualificationArr.entries()) {
      /* if ((obj.subjectid == "" || obj.subjectid == null || obj.subjectid == undefined)) {
        obj.subjectidErr = true
        err++;
      } */
      if (obj.subjectid) {
        if (obj.institutionid == "" || obj.institutionid == null || obj.institutionid == undefined) {
          obj.institutionidErr = true
          err++;
        }
      }
    }

    for (let [index, obj] of this.qualificationArr.entries()) {
      if (obj.time1 !== '' && obj.time2 !== '') {
        obj.time = obj.time1 + ' - ' + obj.time2;
      } else if (obj.time1 !== '') {
        obj.time = obj.time1;
      } else if (obj.time2 !== '') {
        obj.time = obj.time2;
      }
      obj.subjectArr = [];
      obj.levelArr = [],
        obj.gradeArr = [],
        obj.institutionArr = [];
    }
    if (err == 0) {
      const obj = {
        'educatorid': this.eid === null ? null : this.educatorsId,
        'approvedby': this.commonservice.getUserType(),
        'educatorname': this.educatorname,
        'shortname': this.educatorshortname,
        'accesscontrol': "",
        'password': this.password,
        'webprofileId': "0",
        'requiredchecks': "",
        'availability': "",
        'address': this.educatoraddress,
        'mobile': this.educatorphone,
        'email': this.educatoremail,
        'educatorsubheading': this.subheading,
        'educatorexcerpt': this.educatorExpert,
        'categorytype': this.categoryType,
        'educatorphotouri': this.educatorImage,
        'subjectList': subject,
        'categoryList': category,
        'qualificationList': this.qualificationArr,
        'about': this.educatorAbout,
        'teachingexp': this.teachingExperiance,
        "popular": this.popular === false ? 0 : 1,
        "featured": this.featured === false ? 0 : 1,
        "hidden": this.hidden === false ? 0 : 1,
        "approve": this.approve === false ? 0 : 1,
        "active": this.active === false ? 0 : 1,
      };
      this.commonservice.loaderStart();
      this.restapi.updateEducator(obj).subscribe(
        (res: any) => {
          this.commonservice.loaderEnd();
          if (res.success) {
            this.resetForm();
            this.notifierService.notify("success", res.message);
            this.router.navigate(["admin/app/educators"]);
          } else {
            this.notifierService.notify("error", res.message);
          }
        },
        (err: any) => {
          this.notifierService.notify("error", err.error.message);
        }
      );
    }
  }


  resetForm() {
    this.educatorname = "";
    this.educatorshortname = "";
    this.password = "";
    this.educatoraddress = "";
    this.educatorphone = "";
    this.educatoremail = "";
    this.subheading = "";
    this.educatorExpert = "";
    this.categoryType = "";
    this.educatorImage = "";
    this.categoryList = [];
    this.subjectsList = [];
    this.qualificationArr = [
      {
        subjectid: "",
        levelid: "",
        gradeid: "",
        institutionid: "",
        time: "",
        time1: "",
        time2: "",
        subjectidErr: false,
        levelidErr: false,
        gradeidErr: false,
        institutionidErr: false,
        timeErr: false,
        subjectArr: [],
        levelArr: [],
        gradeArr: [],
        gradeKeys: [],
        institutionArr: [],
      },
    ];
    this.educatorAbout = "";
    this.teachingExperiance = "";
    this.educatornameErr = false;
    this.educatorshortnameErr = false
    this.educatoremailErr = false
    this.educatoremailValidErr = false
    this.categoryTypeErr = false
    this.educatoraddressErr = false
    this.educatorImageErr = false;
    this.educatorphoneErr = false;
    this.educatorphoneValidErr = false
    this.passwordErr = false;
    this.passwordValidErr = false;
    this.subheadingErr = false;
    this.educatorExpertErr = false
    this.categoriesNameErr = false
    this.subjectsNameErr = false
    this.educatorAboutErr = false
    this.teachingExperianceErr = false
    this.router.navigate(["admin/app/educators"]);

  }

  addExpTable(): any {
    this.qualificationArr.push({
      subjectid: "",
      levelid: "",
      gradeid: "",
      gradename: '',
      institutionid: "",
      time: "",
      time1: "",
      time2: "",
      subjectArr: JSON.parse(JSON.stringify(this.qualificationArr1[0].subjectArr)),
      levelArr: JSON.parse(JSON.stringify(this.qualificationArr1[0].levelArr)),
      gradeArr: JSON.parse(JSON.stringify(this.gradeArr)),
      gradeKeys: JSON.parse(JSON.stringify(this.gradeKeys)),
      institutionArr: JSON.parse(JSON.stringify(this.qualificationArr1[0].institutionArr)),
    });
    // let lastindex = this.qualificationArr.length - 1
    /* this.getQualificationLevels("", this.qualificationArr[lastindex])
    this.getQualificationSubjects("", this.qualificationArr[lastindex])
    this.getQualificationGrade("", this.qualificationArr[lastindex]);
    this.getInstitution("", this.qualificationArr[lastindex]) */
  }



  deleteExpTable(i: any) {
    this.qualificationArr.splice(i, 1);
  }

  // imagePopUp() {
  //   if (this.educatorImage) {
  //     this.fullScreenImg = this.commonservice.imgCheck(this.educatorImage);
  //     this.toggleFullScreenImg(1);
  //   }
  // }
  // toggleFullScreenImg(flag: number): void {
  //   const elem = document.getElementById("fulldiv");
  //   if (elem) {
  //     elem.style.display = flag === 0 ? "none" : "block";
  //   }
  // }


  openIMageModal(imageModal: any) {
    this.modalService.open(imageModal, { centered: true, size: "xxl", backdrop: true });
    if (this.educatorImage) {
      this.fullScreenImg = this.commonservice.imgCheck(this.educatorImage);
    }
  }



  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter((street) =>
      this._normalizeValue(street).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, "");
  }

  getCategoryType() {
    let obj = {
      searchText: "",
    };
    this.restapi.getCategoryType(obj).subscribe((res: any) => {
      this.categoryTypeList = res.response;
    });
  }
  // getCategories() {
  //   this.selectedItems = []
  //   this.categoryTypeErr
  //   let obj = {
  //     searchText: "",
  //     categoryTypeId: this.categoryType
  //   };
  //   this.restapi.getCategories(obj).subscribe((res: any) => {
  //     this.dropdownList = res.response;
  //   });
  // }
  getSubjects() {
    let obj = {
      searchText: "",
    };
    this.restapi.getSubjects(obj).subscribe((res: any) => {
      this.dropdownList2 = res.response;
    });
  }


  onKeyup(i: any, arr: any) {
    const inputValue = arr[i].gradename;
    const grade = this.gradeBackup.filter((option: any) => option.name.toLowerCase().includes(inputValue.toLowerCase()));
    arr[i].gradeArr = this.commonservice.groupBy(grade, 'ParentCategory');
    arr[i].gradeKeys = Object.keys(this.gradeArr);
  }


  getQualificationGrade(search: any, obj: any, flag: any = 0) {
    let params: any = {};
    if (search) {
      params.searchText = search.key;
    } else {
      params.searchText = "";
    }
    this.restapi.getQualificationGrades(params).subscribe((res: any) => {
      if (res.success) {
        let array = res.response;
        this.gradeBackup = JSON.parse(JSON.stringify(array));
        this.gradeArr = this.commonservice.groupBy(array, 'ParentCategory');
        this.gradeKeys = Object.keys(this.gradeArr);
        // this.selectGrade(obj)
      } else {
      }
      if (flag === 1) {
        this.getInstitution("", this.qualificationArr1[0], 2)
      }
    });
  }

  selectGrade(obj: any) {
    for (let key of obj.gradeKeys) {
      if (obj.gradeArr[key]) {
        for (let grade of obj.gradeArr[key]) {
          if (obj.gradename == grade.id) {
            obj.gradeid = grade.id;
            obj.gradename = grade.name;
            break;
          }
        }
      }

    }
  }


  getQualificationLevels(search: any, obj: any, flag: number = 0) {
    let params = {
      searchText: search,
    };
    this.restapi.getQualificationLevels(params).subscribe((res: any) => {
      if (res.success) {
        res.response.sort(function(a: any, b: any){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        });
        obj.levelArr = res.response;
        obj.levelidErr = false
      }
      if (flag === 0) {
        this.getQualificationSubjects("", this.qualificationArr1[0]);
      }
    });
  }

  getQualificationSubjects(search: any, obj: any, flag: Number = 0) {
    let params = {
      searchText: search,
    };
    this.restapi.getQualificationSubjects(params).subscribe((res: any) => {
      if (res.success) {
        obj.subjectArr = res.response;
        obj.subjectidErr = false;
      }
      search = '';
      if (flag === 0) {
        this.getQualificationGrade("", this.qualificationArr1[0], 1)
      }
    });
  }

  // getInstitution(search: any, obj: any) {
  //   let params = {
  //     searchText: search,
  //   };
  //   this.restapi.getInstitution(params).subscribe((res: any) => {
  //     if (res.success) {
  //       obj.institutionArr = res.response;
  //       obj.institutionidErr = false
  //     }
  //   });
  // }

  getInstitution(search: any, obj: any, flag: any = 0) {
    let params = {
      searchText: flag == 0 ? search : '',
    };

    this.restapi.getInstitution(params).subscribe((res: any) => {
      if (res.success) {
        obj.institutionArr = res.response.sort((a: any, b: any) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        /* for (let inst of obj.institutionArr) {
          if (inst.id == search) {

            obj.institutionid = inst.name;
            break;
          }
        } */
        obj.institutionidErr = false;
      }
      if (this.educatorsId === 0) {
        this.qualificationArr = JSON.parse(JSON.stringify(this.qualificationArr1));
      }
      if (flag === 2) {
        if (this.educatorsId) {
          this.qualificationArr = []
          this.getEducatorById();
        }
      }
    });
  }


  goBack() {
    this.router.navigate(["admin/app/educators"]);
  }

  searchCategoriesByName(): any {
    this.categoriesNameErr = false
    let obj = {
      searchText: this.categoriesName,
      categoryTypeId: this.categoryType
    };
    this.categoriesSpinner = true
    this.restapi.getCategories(obj).subscribe((res: any) => {
      this.categoriesSpinner = false
      if (res.success) {
        this.categoriesArr = res.response;
      } else {
        this.categoriesArr = []
      }
    });
  }



  searchSubjectByName() {
    this.subjectsNameErr = false
    let obj = {
      searchText: this.subjectsName,
    };
    this.subjectsSpinner = true
    this.restapi.getSubjects(obj).subscribe((res: any) => {
      this.subjectsSpinner = false
      if (res.success) {
        this.subjectsArr = res.response;
      } else {
        this.subjectsArr = [];
      }
    });
  }

  getCategoriesIdByName(): any {
    // this.categoriesNameErr = false
    for (let data of this.categoriesArr) {
      if (data.name === this.categoriesName) {
        if (!this.categoriesList.some((item: { name: any; }) => item.name === this.categoriesName)) {
          this.categoriesList.push({ categoriesid: data.categoriesid, name: data.name })
        }
      }
    }
  }

  getSubjectsIdByName(): any {
    // this.categoriesNameErr = false
    for (let data of this.subjectsArr) {
      if (data.name === this.subjectsName) {
        if (!this.subjectsList.some((item: { name: any; }) => item.name === this.subjectsName)) {
          this.subjectsList.push({ subjectid: data.id, name: data.name, levelList: [], minAge: '', maxAge: '' })
        }
        break;
      }

    }
    this.subjectsName = '';
  }

  catrgoriesRemove(i: any): any {
    this.categoriesList.splice(i, 1)
  }
  levelRemove(i: any, arr: any): any {
    arr.splice(i, 1)
  }

  subjectsRemove(i: any): any {
    this.subjectsList.splice(i, 1)
  }

  closeModal(): any {
    this.modalService.dismissAll();
  }

  onImageError(entity: any): void {
    entity.imageUrl = 'some-image.svg'
  }

  downloadProfileImage() {
    if (this.educatorImage) {
      window.open(this.commonservice.imgCheck(this.educatorImage), "_blank");
    }
  }

  getCourcesByEducatorFun() {
    const data = {
      "educatorid": this.educatorsId
    };
    this.commonservice.loaderStart();
    this.restapi.getCourcesByEducator(data).subscribe((res: any) => {
      this.commonservice.loaderEnd()
      if (res.success) {
        this.coursesbyEducatorArr = res.response;
      } else {
        this.coursesbyEducatorArr = []
      }
    });
  }

  deleteDiv(i: any) {
    this.subjectsList.splice(i, 1)
  }

  levelArry: any = []
  limitlevel = 1000
  levelOffset = 0
  searchLevel = ''

  onfocusCall(obj: any) {
    if (obj.searchLevel == undefined || obj.searchLevel == '') {
      this.fetchEducationLevels(obj);
    }
  }
  fetchEducationLevels(obj: any): any {
    const data = {
      limit: this.limitlevel,
      offset: this.levelOffset,
      searchtext: obj.searchLevel
    };
    this.commonservice.loaderStart();
    this.restapi.fetchEducationLevels(data).subscribe((res: any) => {
      this.commonservice.loaderEnd()
      if (res.success) {
        this.levelArry = res.response;
      } else {
        this.levelArry = []
      }
    });
  }



  goToPreviewEducator(): any {
    let qualificationTemp = this.qualificationArr
    for (let qual of this.qualificationArr) {
      for (let level of qual.levelArr) {
        if (level.id == qual.levelid) {
          qual.levelname = level.name
        }
        if (qual.time1 !== '' && qual.time2 !== '') {
          qual.time = qual.time1 + ' - ' + qual.time2;
        } else if (qual.time1 !== '') {
          qual.time = qual.time1;
        } else if (qual.time2 !== '') {
          qual.time = qual.time2;
        }
      }
    }

    for (let qual of this.qualificationArr) {
      for (let sub of qual.subjectArr) {
        if (sub.id == qual.subjectid) {
          qual.subjectname = sub.name
        }
      }
    }

    for (let qual of this.qualificationArr) {
      qual.levelArr = []
      qual.subjectArr = []
    }



    let educatorFormData = {
      "educatorid": this.eid === null ? null : this.educatorsId,
      "educatorname": this.educatorname,
      'approvedby': this.commonservice.getUserType(),
      "shortname": this.educatorshortname,
      'password': this.password,
      'webprofileId': "0",
      'requiredchecks': "",
      'availability': "",
      "address": this.educatoraddress,
      "educatorphone": this.educatorphone,
      'email': this.educatoremail,
      "educatorsubheading": this.subheading,
      "educatorexcerpt": this.educatorExpert,
      "educatorphotouri": this.educatorImage,
      'subjectList': this.subjectsList,
      "qualificationList": qualificationTemp,
      "about": this.educatorAbout,
      "teachingexp": this.teachingExperiance,
      "popular": this.popular === false ? 0 : 1,
      "featured": this.featured === false ? 0 : 1,
      "hidden": this.hidden === false ? 0 : 1,
      "approve": this.approve === false ? 0 : 1,
      "active": this.active === false ? 0 : 1,
      categoriesList: this.categoriesList
    }
    localStorage.setItem('educatorFormData', JSON.stringify(educatorFormData));
    const previewUrl = "/educatorpreview"
    window.open(previewUrl, '_blank');
  }

}
