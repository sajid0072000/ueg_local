import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotifierService } from "angular-notifier";
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var Hls: any;

@Component({
    selector: 'app-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {

    @ViewChild('deleteModal') deleteModal: any;


    public Editor = ClassicEditor;

    coursename = '' as any
    coursetypeid = '' as any
    agerangeMin = '' as any
    agerangeMax = '' as any
    shortdesc = '' as any
    longdesc = '' as any
    coursephoto = '' as any
    coursevideourl = '' as any
    tags = '' as any
    price = '' as any
    categoryList = [] as any
    FILE_URL = '' as any;
    Video_URL = '' as any;
    courseid = '' as any
    categoryTypeArr = [] as any
    categoriesList: any = [];
    fullScreenImg = '' as any;
    fullScreenVideo = '' as any


    dropdownList = [] as any;
    selectedItems = [] as any;
    dropdownSettings = {} as any;


    skillName: any = ''
    skillsSpinner: boolean = false
    skillsArr: any = []
    subjectName: any = ''
    subjectSpinner: boolean = false
    subjectArr: any = []

    skillid: any = ''
    subjectId: any = ''
    skillList: any = []
    subjectList: any = []
    featured: boolean = false
    ageRangeArr: any = [
        { value: "Beginner", ischeck: false },
        { value: "Intermediate", ischeck: false },
        { value: "Advanced", ischeck: false },
        { value: "7-11", ischeck: false },
        { value: "11-14", ischeck: false },
        { value: "14-16", ischeck: false },
        { value: "16-18", ischeck: false },
        { value: "Adult", ischeck: false },
    ]

    categoriesSpinner: boolean = false

    selected = -1;
    agerange: any = ''

    coursenameErr: boolean = false
    coursetypeidErr: boolean = false
    categoriesNameErr: boolean = false
    agerangeErr: boolean = false
    skillNameErr: boolean = false
    subjectNameErr: boolean = false
    priceErr: boolean = false
    coursephotoErr: boolean = false
    courseVideoErr: boolean = false
    shortdescErr: boolean = false
    longdescErr: boolean = false
    tagsErr: boolean = false;
    educatorname = '' as any
    spinnerEducator: boolean = false
    educatorArr = [] as any
    educatorid = '' as any
    educatornameErr = false;
    userType = 0;
    trncstatus = 0;

    videothumbnail: any = ''
    videothumbnailErr: boolean = false
    isLive: boolean = true;

    popular: any = false
    hidden: any = false
    approved: any = false;
    roleid: any = '';
    userId: any = '';
    showApproved: boolean = true;
    showField: boolean = false;
    courseContent: any = []
    categorytypename: any = ''
    categoryname: any = ''
    previewcourseData: any = {}
    educatorErr: boolean = false
    educatorSpinner: boolean = false
    educatorList: any = [];
    categoriesArr: any = [];
    categoriesName: any = '';
    constructor(
        private router: Router,
        private restapi: RestApiService,
        private actroute: ActivatedRoute,
        private notifierService: NotifierService,
        public common: CommonService,
        private modalService: NgbModal,

    ) {
        this.FILE_URL = this.restapi.FILE_URL;
        this.Video_URL = this.restapi.Video_URL;
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);
        this.userType = this.common.getUserType();
        if (this.userType != 1) {
            this.educatorid = this.common.getUserId();
        }
        this.courseid = this.actroute.snapshot.params['id'];
        if (this.courseid == 0) {
            this.courseid = null;
        }
        if (this.courseid) {
            this.getCourseById();
        }
        this.getCategoryType();

        this.dropdownSettings = {
            singleSelection: false,
            idField: 'categoriesid',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true
        };

        this.roleid = this.common.getRoleId();
        if (this.roleid == 1) {
            this.showApproved = false;
        }
        if (this.roleid == 3) {
            this.approved = true;
        }
        this.userId = this.common.getUserId();

    }

    addCourseContent(): any {
        this.courseContent.push({
            sequence: this.courseContent.length + 1,
            title: '',
            duration: 0,
        });
    }

    removeCourseContent(i: any): any {
        // if (this.courseContent.length > 1) {
            this.courseContent.splice(i, 1);
        // }
    }

    goToPreview(): any {
        let url = this.restapi.SERVER_BASE + '/course-details/' + this.courseid;
        window.open(url, '_blank');
    }


    searchSkillByName(): any {
        let obj = {
            "name": this.skillName
        };
        this.skillsSpinner = true;
        this.restapi.searchSkillByName(obj).subscribe((res: any) => {
            if (res.success) {
                this.skillsArr = res.response;
                this.skillsSpinner = false
            } else {
                this.skillsArr = []
                this.skillsSpinner = false
            }
        });
    }

    

    searchCategoriesByName(): any {
        this.selectedItems = [];
        let obj = {
            searchText: this.categoriesName,
            categoryTypeId: this.coursetypeid
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


    getSkillsIdByName(): any {
        this.skillNameErr = false
        for (let data of this.skillsArr) {
            if (data.Name === this.skillName) {
                if (!this.skillList.some((item: { name: any; }) => item.name === this.skillName)) {
                    this.skillList.push({ skillid: data.Id, name: data.Name })
                    this.skillName = ''
                    this.skillsArr = []
                }
            }
        }
    }

    getCategoriesIdByName(): any {
        this.categoriesNameErr = false;
        for (let data of this.categoriesArr) {
            if (data.name === this.categoriesName) {
                if (!this.categoriesList.some((item: { name: any; }) => item.name === this.categoriesName)) {
                    this.categoriesList.push({ categoriesid: data.categoriesid, name: data.name })
                    this.categoriesName = ''
                    this.categoriesArr = []
                }
            }
        }
    }


    checkAgeRange(e: any, i: any): any {
        for (let [index, data] of this.ageRangeArr.entries()) {
            if (index === i) {
                if (data.ischeck) {
                    data.ischeck = false
                } else {
                    data.ischeck = true
                }
            }
        }
        this.agerangeErr = false
    }

    getSubjectsIdByName(): any {
        this.subjectNameErr = false
        for (let data of this.subjectArr) {
            if (data.Name === this.subjectName) {
                this.subjectList.push({ subjectid: data.Id })
            }
        }
    }

    searchSubjectsByName(): any {
        let obj = {
            "name": this.subjectName
        };
        this.subjectSpinner = true
        this.restapi.searchSubjectsByName(obj).subscribe((res: any) => {
            if (res.success) {
                this.subjectArr = res.response;
                this.subjectSpinner = false
            } else {
                this.subjectArr = []
                this.subjectSpinner = false

            }
        });
    }

    onItemSelect(item: any) {
        console.log(item);
    }

    onSelectAll(items: any) {
        console.log(items);
    }

    onSkillItemSelect(item: any) {
        console.log(item);
    }

    onSkillSelectAll(items: any) {
        console.log(items);
    }

    onSubjectItemSelect(item: any) {
        console.log(item);
    }

    onSubjectSelectAll(items: any) {
        console.log(items);
    }

    goBack() {
        this.router.navigate(["admin/app/course-list"]);
    }



    getCourseById(): any {
        const data = {
            "courseid": this.courseid
        };
        this.common.loaderStart();
        this.restapi.getCourseById(data).subscribe((res: any) => {
            this.common.loaderEnd();
            if (res.success) {
                let eduId: any = ""
                if (res.response.educatorList.length > 0) {
                    eduId = res.response.educatorList[0].educatorid;
                }
                if (this.userId != res.response.createdBy) {
                    this.showField = true;
                }
                if (eduId == this.common.getUserId()) {
                    this.showField = false;
                }
                if (this.roleid == 1 || this.roleid == 2) {
                    this.showField = false;
                }
                for (let obj2 of res.response.agerange) {
                    for (let obj1 of this.ageRangeArr) {
                        if (obj1.value === obj2) {
                            obj1.ischeck = true
                        }
                    }
                }

                this.agerange = res.response.agerange;
                for (let [index, data] of this.ageRangeArr.entries()) {
                    if (data.value == this.agerange) {
                        this.selected = index
                    }
                }
                this.coursename = res.response.coursename;
                this.coursetypeid = res.response.coursetypeid;
                this.shortdesc = res.response.shortdesc;
                this.longdesc = res.response.longdesc;
                this.coursephoto = res.response.coursephoto;
                this.coursevideourl = res.response.coursevideourl;
                this.tags = res.response.tags;
                this.price = res.response.price;
                this.educatorid = res.response.userId;
                this.educatorname = res.response.educatorname;
                this.videothumbnail = res.response.videothumbnail;
                this.isLive = res.response.isLive === 0 ? false : true;
                this.trncstatus = res.response.trncstatus;
                if (this.trncstatus == 1) {
                    const video = document.createElement('video');
                    const vContainer: any = document.getElementById('video-container');
                    video.id = 'video';
                    video.className = 'urlvideoplayer';
                    video.controls = true;
                    video.style.width = '200px';
                    video.style.height = '140px';
                    video.style.cursor = 'pointer';
                    if (Hls.isSupported()) {
                        const hls = new Hls();
                        hls.loadSource(this.Video_URL + this.coursevideourl);
                        hls.attachMedia(video);
                        hls.on(Hls.Events.MANIFEST_PARSED, () => {
                            // video.play();
                        });
                    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        video.src = this.Video_URL + this.coursevideourl;
                        video.addEventListener('loadedmetadata', () => {
                            // video.play();
                        });
                    }
                    vContainer.appendChild(video);
                }
                this.searchEducatorByName()
                this.getCategories();
                const category = [];
                for (let cat of res.response.categoryList) {
                    category.push(
                        { "categoriesid": cat.coursecategoryid, "name": cat.name }
                    )
                }
                this.categoriesList = category;
                const skill = [];
                for (let obj of res.response.skillList) {
                    skill.push({
                        skillid: obj.Id, name: obj.Name
                    })
                }
                this.skillList = skill;

                const subject = [];
                for (let obj of res.response.subjectList) {
                    subject.push({ subjectid: obj.subjectid });
                    this.subjectName = obj.Name
                }

                this.subjectList = subject

                this.featured = res.response.featured === 1 ? true : false
                this.popular = res.response.popular === 1 ? true : false
                this.hidden = res.response.hidden === 1 ? true : false
                this.approved = res.response.approved === 1 ? true : false;
                let educator = []
                for (let obj of res.response.educatorList) {
                    educator.push({ educatorid: obj.educatorid, educatorname: obj.educatorname });
                }

                this.educatorList = educator;
                if (res.response.courseContent.length > 0) {
                    this.courseContent = [];
                    for (const [index, obj] of res.response.courseContent.entries()) {
                        this.courseContent.push({
                            sequence: obj.lessionSeq,
                            title: obj.lessionTitle,
                            duration: obj.lessionduration,
                        });
                    }
                }
            }
        });
    }


    getCategoryType(): any {
        const data = {
            "searchText": ""
        }
        this.common.loaderStart();
        this.restapi.getCategoryType(data).subscribe((res: any) => {
            this.common.loaderEnd();
            if (res.success) {
                this.categoryTypeArr = res.response
            } else {
                this.categoryTypeArr = []
            }
        });
    }

    getCategories(): any {
        this.selectedItems = [];
        let obj = {
            searchText: '',
            categoryTypeId: this.coursetypeid
        };
        this.common.loaderStart();
        this.restapi.getCategories(obj).subscribe((res: any) => {
            this.common.loaderEnd();
            if (res.success) {
                this.dropdownList = res.response;
            } else {
                this.dropdownList = []
            }
        });
    }

    skillRemove(i: any): any {

        this.skillList.splice(i, 1)

    }

    educatorRemove(i: any): any {

        this.educatorList.splice(i, 1)

    }


    catrgoriesRemove(i: any): any {
        this.categoriesList.splice(i, 1)
    }

    uploadBtn(): any {
        let elem = document.getElementById('file-input')
        if (elem) {
            elem.click()
        }
    }

    uploadEditBtn(): any {
        let elem = document.getElementById('file-input-video')
        if (elem) {
            elem.click()
        }
    }

    uploadBtnvideothumbnail(): any {
        let elem = document.getElementById('file-input-videothumbnail')
        if (elem) {
            elem.click()
        }
    }

    add(): any {
        this.coursenameErr = false;
        this.coursetypeidErr = false;
        this.categoriesNameErr = false;
        this.agerangeErr = false;
        this.skillNameErr = false;
        this.subjectNameErr = false;
        this.priceErr = false;
        this.coursephotoErr = false;
        this.courseVideoErr = false;
        this.shortdescErr = false;
        this.longdescErr = false;
        this.tagsErr = false;
        this.educatornameErr = false;
        this.videothumbnailErr = false;

        let err = 0

        let category = []
        for (let cat of this.categoriesList) {
            category.push(
                { "categoriesid": cat.categoriesid }
            )
        }

        let agerange = []

        for (let obj of this.ageRangeArr) {
            if (obj.ischeck === true) {
                agerange.push(obj.value)
            }
        }

        if (this.coursename == '' || this.coursename == null || this.coursename == undefined) {
            this.coursenameErr = true;
            err++
        }

        if (this.coursetypeid == '' || this.coursetypeid == null || this.coursetypeid == undefined) {
            this.coursetypeidErr = true
            err++
        }

        /* if (category.length == 0) {
            this.categoriesNameErr = true
            err++
        }

        if (agerange.length == 0) {
            this.agerangeErr = true
            err++
        }

        if (this.skillList.length == 0) {
            this.skillNameErr = true
            err++
        }

        if (this.subjectList.length == 0) {
            this.subjectNameErr = true
            err++
        }

        if (!this.isLive && (this.price == '' || this.price == null || this.price == undefined || this.price < 0)) {
            this.priceErr = true
            err++
        }

        if (this.coursephoto == '' || this.coursephoto == null || this.coursephoto == undefined) {
            this.coursephotoErr = true
            err++
        }
        if (this.shortdesc == '' || this.shortdesc == null || this.shortdesc == undefined) {
            this.shortdescErr = true
            err++
        }
        if (this.longdesc == '' || this.longdesc == null || this.longdesc == undefined) {
            this.longdescErr = true
            err++
        }

        if (this.tags == '' || this.tags == null || this.tags == undefined) {
            this.tagsErr = true
            err++
        }

        if (this.videothumbnail == '' || this.videothumbnail == null || this.videothumbnail == undefined) {
            this.videothumbnailErr = true
            err++
        } */

        /* if (this.common.getRoleId() === 1) {
            if (this.educatorList.length == 0) {
                this.educatornameErr = true
                err++
            }
        } */

        if (this.isLive) {
            for (const [index, obj] of this.courseContent.entries()) {
                if (obj.sequence == 0 || obj.sequence == '') {
                    const elem: any = document.getElementById('seq_' + index);
                    elem.style.border = '1px solid red';
                    err++
                } else {
                    const elem: any = document.getElementById('seq_' + index);
                    elem.style.border = '1px solid #ced4da;';
                }
                if (obj.title == '') {
                    const elem: any = document.getElementById('tit_' + index);
                    elem.style.border = '1px solid red';
                    err++
                } else {
                    const elem: any = document.getElementById('tit_' + index);
                    elem.style.border = '1px solid #ced4da;';
                }
                if (obj.duration == 0 || obj.duration == '' || obj.duration < 0) {
                    const elem: any = document.getElementById('dur_' + index);
                    elem.style.border = '1px solid red';
                    err++
                } else {
                    const elem: any = document.getElementById('dur_' + index);
                    elem.style.border = '1px solid #ced4da;';
                }
            }
        } else {
            this.courseContent = [];
        }

        if (this.common.getRoleId() == 3) {
            this.approved = true;
        } else if(this.common.getRoleId() == 2) {
            this.educatorList = [{educatorid: this.userId}];
        }

        var data: any = {
            "coursename": this.coursename,
            "coursetypeid": this.coursetypeid,
            "agerange": agerange,
            "shortdesc": this.shortdesc,
            "longdesc": this.longdesc,
            "coursephoto": this.coursephoto,
            "coursevideourl": this.coursevideourl,
            "tags": this.tags,
            "price": this.price,
            "categoryList": category,
            skillList: this.skillList,
            subjectList: this.subjectList,
            featured: this.featured,
            educatorList: this.educatorList,
            videothumbnail: this.videothumbnail,
            islive: this.isLive === true ? 1 : 0,
            "popular": this.popular === true ? 1 : 0,
            "hidden": this.hidden === true ? 1 : 0,
            isapproved: this.approved === true ? 1 : 0,
            courseContent: this.courseContent
        }
        if (err == 0) {
            this.common.loaderStart();
            this.restapi.addCourse(data).subscribe((res: any) => {
                this.common.loaderEnd();
                if (res.success) {
                    this.notifierService.notify('success', res.message);
                    this.resetForm()
                    this.router.navigate(['admin/app/course-list'])
                } else {
                    this.notifierService.notify('error', res.message);
                }
            });
        }
    }

    edit(): any {
        this.coursenameErr = false
        this.coursetypeidErr = false
        this.categoriesNameErr = false
        this.agerangeErr = false
        this.skillNameErr = false
        this.subjectNameErr = false
        this.priceErr = false
        this.coursephotoErr = false
        this.courseVideoErr = false
        this.shortdescErr = false
        this.longdescErr = false
        this.tagsErr = false
        this.videothumbnailErr = false;
        this.educatornameErr = false

        let err = 0

        let category = []
        for (let cat of this.categoriesList) {
            category.push(
                { "categoriesid": cat.categoriesid }
            )
        }

        let agerange = []

        for (let obj of this.ageRangeArr) {
            if (obj.ischeck === true) {
                agerange.push(obj.value)
            }
        }

        if (this.coursename == '' || this.coursename == null || this.coursename == undefined) {
            this.coursenameErr = true;
            err++
        }

        if (this.coursetypeid == '' || this.coursetypeid == null || this.coursetypeid == undefined) {
            this.coursetypeidErr = true
            err++
        }
        /* if (category.length == 0) {
            this.categoriesNameErr = true
            err++
        }

        if (agerange.length == 0) {
            this.agerangeErr = true
            err++
        }

        if (this.skillList.length == 0) {
            this.skillNameErr = true
            err++
        } */

        /* if (!this.isLive && (this.price == '' || this.price == null || this.price == undefined || this.price < 0)) {
            this.priceErr = true
            err++
        } */
        /* if (this.coursephoto == '' || this.coursephoto == null || this.coursephoto == undefined) {
            this.coursephotoErr = true
            err++
        }
        if (this.shortdesc == '' || this.shortdesc == null || this.shortdesc == undefined) {
            this.shortdescErr = true
            err++
        }
        if (this.longdesc == '' || this.longdesc == null || this.longdesc == undefined) {
            this.longdescErr = true
            err++
        }

        if (this.tags == '' || this.tags == null || this.tags == undefined) {
            this.tagsErr = true
            err++
        }

        if (this.videothumbnail == '' || this.videothumbnail == null || this.videothumbnail == undefined) {
            this.videothumbnailErr = true
            err++
        }

        if (this.common.getRoleId() === 1) {
            if (this.educatorList.length == 0) {
                this.educatornameErr = true
                err++
            }
        } */

        if (this.isLive) {
            for (const [index, obj] of this.courseContent.entries()) {
                if (obj.sequence == 0 || obj.sequence == '' || obj.sequence == null) {
                    const elem: any = document.getElementById('seq_' + index);
                    elem.style.border = '1px solid red';

                    err++
                } else {
                    const elem: any = document.getElementById('seq_' + index);
                    elem.style.border = '1px solid #ced4da';
                }
                if (obj.title == '') {
                    const elem: any = document.getElementById('tit_' + index);
                    elem.style.border = '1px solid red';
                    err++
                } else {
                    const elem: any = document.getElementById('tit_' + index);
                    elem.style.border = '1px solid #ced4da';
                }
                if (obj.duration == 0 || obj.duration == '' || obj.duration == null || obj.duration < 0) {
                    const elem: any = document.getElementById('dur_' + index);
                    elem.style.border = '1px solid red';
                    err++
                } else {
                    const elem: any = document.getElementById('dur_' + index);
                    elem.style.border = '1px solid #ced4da';
                }
            }
        } else {
            this.courseContent = [];
        }

        if (this.common.getRoleId() == 3) {
            this.approved = true;
        } else if(this.common.getRoleId() == 2) {
            this.educatorList = [{educatorid: this.userId}];
        }

        const data: any = {
            "courseid": this.courseid,
            "coursename": this.coursename,
            "coursetypeid": this.coursetypeid,
            "agerange": agerange,
            "shortdesc": this.shortdesc,
            "longdesc": this.longdesc,
            "coursephoto": this.coursephoto,
            "coursevideourl": this.coursevideourl,
            "tags": this.tags,
            "price": this.price,
            "categoryList": category,
            skillList: this.skillList,
            subjectList: this.subjectList,
            featured: this.featured,
            educatorList: this.educatorList,
            trncstatus: this.trncstatus,
            videothumbnail: this.videothumbnail,
            islive: this.isLive === true ? 1 : 0,
            "popular": this.popular === true ? 1 : 0,
            "hidden": this.hidden === true ? 1 : 0,
            isapproved: this.approved === true ? 1 : 0,
            courseContent: this.courseContent

        }
        if (err == 0) {
            this.common.loaderStart();
            this.restapi.updateCourse(data).subscribe((res: any) => {
                this.common.loaderEnd();
                if (res.success) {
                    this.notifierService.notify('success', res.message);
                    this.resetForm()
                    this.router.navigate(['admin/app/course-list'])
                } else {
                    this.notifierService.notify('error', res.message);
                }
            });
        }

    }


    resetForm(): any {
        this.coursename = "";
        this.coursetypeid = '';
        this.agerangeMin = '';
        this.agerangeMax = '';
        this.shortdesc = '';
        this.longdesc = '';
        this.coursephoto = '';
        this.coursevideourl = '';
        this.tags = '';
        this.price = '';
        this.categoryList = [];
        this.skillList = []
        this.subjectList = []
        this.featured = false
        this.subjectName = ''
        this.skillName = ''
        this.coursenameErr = false
        this.coursetypeidErr = false
        this.categoriesNameErr = false
        this.agerangeErr = false
        this.skillNameErr = false
        this.subjectNameErr = false
        this.priceErr = false
        this.coursephotoErr = false
        this.courseVideoErr = false
        this.shortdescErr = false
        this.longdescErr = false
        this.tagsErr = false
        this.educatorid = '';
        this.educatorname = '';
        this.educatornameErr = false;
        this.isLive = false
        this.videothumbnail = ''
        this.videothumbnailErr = false
        this.trncstatus=0
        this.router.navigate(['admin/app/course-list'])

    }

    changeCourseName(): any {
        this.coursenameErr = false
    }

    changeCourseTypeName(): any {
        this.coursetypeidErr = false
    }

    changePriceName(): any {
        this.priceErr = false
    }

    changetags(): any {
        this.tagsErr = false
    }

    changeShortDecs(): any {
        this.shortdescErr = false
    }

    changeLongDecs(): any {
        this.longdescErr = false
    }

    onFileChanged(event: any): any {
        if (event.target.files && event.target.files.length > 0) {
            this.coursephotoErr = false
            let file = event.target.files[0];
            const fd = new FormData();
            fd.append('file', file);
            fd.append('uploadType', 'course')
            this.common.loaderStart();
            this.restapi.uploadFile(fd).subscribe((res: any) => {
                this.common.loaderEnd();
                if (res.success) {
                    this.coursephoto = res.response.fileName;
                }
            })
        }
    }



    onFileChangedvideothumbnail(event: any): any {
        if (event.target.files && event.target.files.length > 0) {
            this.coursephotoErr = false
            let file = event.target.files[0];
            const fd = new FormData();
            fd.append('file', file);
            fd.append('uploadType', 'course')
            this.common.loaderStart();
            this.restapi.uploadFile(fd).subscribe((res: any) => {
                this.common.loaderEnd();
                if (res.success) {
                    this.videothumbnail = res.response.fileName;
                }
            })
        }
    }

    imagePopUp(): any {
        this.fullScreenImg = this.common.imgCheck(this.coursephoto);
        this.toggleFullScreenImg(1);
    }

    toggleFullScreenImg(flag: number): any {
        const elem = document.getElementById('fulldiv');
        if (elem) {
            elem.style.display = flag === 0 ? 'none' : 'block';
        }
    }

    onFileChangedVideo(event: any): any {
        if (event.target.files && event.target.files.length > 0) {
            this.courseVideoErr = false
            let file = event.target.files[0];
            const fd = new FormData();
            fd.append('file', file);
            this.common.loaderStart();
            this.restapi.uploadFile(fd).subscribe((res: any) => {
                this.common.loaderEnd();
                if (res.success) {
                    this.coursevideourl = res.response.fileName;
                }
            })
        }
    }

    onFileChange(event: any): any {
        this.coursevideourl = event.file;
        this.trncstatus = 0
    }

    addTransProcess(item: any) {
        this.trncstatus = item;
    }

    onClickDelete(): any {
        this.modalService.open(this.deleteModal, { centered: true, size: 'md' });
    }

    delete(): any {
        const data = {
            "userid": this.common.getUserId(),
            "courseid": this.courseid
        }
        this.common.loaderStart();
        this.restapi.deleteCourse(data).subscribe((res: any) => {
            this.common.loaderEnd();
            console.log(res.response);
            if (res.success) {
                this.notifierService.notify('success', res.message);
                this.closeModal()
                this.router.navigate(["admin/app/course-list"]);

            } else {
                this.notifierService.notify('error', res.message);
            }
        })

    }
    closeModal(): any {
        this.modalService.dismissAll();
    }

    searchEducatorByName(): any {
        this.educatornameErr = false;
        var data = {
            "userId": this.common.getUserId(),
            "educatorname": this.educatorname
        }
        this.educatorSpinner = true;
        this.restapi.searchEducatorByName(data).subscribe((res: any) => {
            if (res.success) {
                this.educatorArr = res.response
                this.educatorSpinner = false
            }
            else {
                this.educatorArr = []
                this.educatorSpinner = false
            }
        });
    }

    getEducatorIdByName(): void {
        this.educatorErr = false
        for (let data of this.educatorArr) {
            if (data.educatorname === this.educatorname) {
                if (!this.educatorList.some((item: { educatorname: any; }) => item.educatorname === this.educatorname)) {
                    this.educatorList.push({ educatorid: data.educatorid, educatorname: data.educatorname })
                    this.educatorname = ''
                    this.educatorArr = []
                }
            }
        }
    }



    coursePreviewData() {
        let agerange = []
        let category = []

        for (let item of this.categoriesList) {
            this.categoryname = item.name
        }
        for (let data of this.categoryTypeArr) {
            if (data.categorytypeid == this.coursetypeid) {
                this.categorytypename = data.name
                break;
            }
        }
        for (let cat of this.categoriesList) {
            category.push(
                { "categoriesid": cat.categoriesid }
            )
        }
        if (this.common.getRoleId() === 1) {
            if (this.educatorList.length == 0) {
            }
        }
        if (this.common.getRoleId() == 3) {
            this.approved = true;
        }
        for (let obj of this.ageRangeArr) {
            if (obj.ischeck === true) {
                agerange.push(obj.value)
            }
        }
        if (this.common.getRoleId() === 1) {
            if (this.educatorList.length == 0) {
            }
        }
        for (let data of this.categoriesArr) {
            if (data.name === this.categoriesName) {
                if (!this.categoriesList.some((item: { name: any; }) => item.name === this.categoriesName)) {
                    this.categoriesList.push({ categoriesid: data.categoriesid, name: data.name })
                    this.categoriesName = ''
                    this.categoriesArr = []
                }
            }
        }

        for (let data of this.skillsArr) {
            if (data.Name === this.skillName) {
                if (!this.skillList.some((item: { name: any; }) => item.name === this.skillName)) {
                    this.skillList.push({ skillid: data.Id, name: data.Name })
                    this.skillName = ''
                    this.skillsArr = []
                }
            }
        }
        for (let data of this.educatorArr) {
            if (data.educatorname === this.educatorname) {
                if (!this.educatorList.some((item: { educatorname: any; }) => item.educatorname === this.educatorname)) {
                    this.educatorList.push({ educatorid: data.educatorid, educatorname: data.educatorname })
                    this.educatorname = ''
                    this.educatorArr = []
                }
            }
        }

        if (this.isLive) {
            for (const [index, obj] of this.courseContent.entries()) {
                if (obj.sequence == 0 || obj.sequence == '') {
                    const elem: any = document.getElementById('seq_' + index);
                    elem.style.border = '1px solid red';
                } else {
                    const elem: any = document.getElementById('seq_' + index);
                    elem.style.border = '1px solid #ced4da;';
                }
                if (obj.title == '') {
                    const elem: any = document.getElementById('tit_' + index);
                    elem.style.border = '1px solid red';
                } else {
                    const elem: any = document.getElementById('tit_' + index);
                    elem.style.border = '1px solid #ced4da;';
                }
                if (obj.duration == 0 || obj.duration == '') {
                    const elem: any = document.getElementById('dur_' + index);
                    elem.style.border = '1px solid red';
                } else {
                    const elem: any = document.getElementById('dur_' + index);
                    elem.style.border = '1px solid #ced4da;';
                }
            }

        } else {
            this.courseContent = [];
        }
        this.previewcourseData = {
            courseid: this.courseid,
            coursename: this.coursename,
            coursetypeid: this.coursetypeid,
            agerange: agerange,
            shortdesc: this.shortdesc,
            longdesc: this.longdesc,
            coursephoto: this.coursephoto,
            coursevideourl: this.coursevideourl,
            tags: this.tags,
            price: this.price,
            categoryList: category,
            skillList: this.skillList,
            featured: this.featured,
            subjectList: this.subjectList,
            educatorList: this.educatorList,
            educatorname: this.educatorname,
            categoriesName: this.categoriesName,
            skillName: this.skillName,
            subjectName: this.subjectName,
            videothumbnail: this.videothumbnail,
            isLive: this.isLive === true ? 1 : 0,
            popular: this.popular === true ? 1 : 0,
            hidden: this.hidden === true ? 1 : 0,
            categorytypename: this.categorytypename,
            courseContent: this.courseContent,
            categoryname: this.categoryname
        };
        localStorage.setItem('previewcourseData', JSON.stringify(this.previewcourseData));
        const previewUrl = "/coursepreview"
        window.open(previewUrl, '_blank');
    }

}
