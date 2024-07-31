import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    BASE_URL = environment.BASE_URL;
    FILE_URL = environment.FILE_URL;
    Local_URL = environment.Local_URL;
    SERVER_BASE = environment.SERVER_BASE;
    UPLOAD_URL = environment.UPLOAD_URL;
    Video_URL = environment.Video_URL;
    Socket_URL = environment.Socket_URL;

    constructor(private http: HttpClient) {
    }

    adminLogin(data: any) {
        return this.http.post(this.BASE_URL + '/v1/login/loginCheck', data, httpOptions);
    }

    getCategories(data: any) {
        return this.http.post(this.BASE_URL + '/v1/master/getCategories', data, httpOptions)
    }

    getSpecificCategoryForEducator(data: any) {
        return this.http.post(this.BASE_URL + '/v1/master/getSpecificCategoryForEducator', data, httpOptions)
    }

    getCategoryType(data: any) {
        return this.http.post(this.BASE_URL + '/v1/master/getCategoryType', data, httpOptions);
    }

    getSubjects(data: any) {
        return this.http.post(this.BASE_URL + '/v1/master/getSubjects', data, httpOptions)
    }

    getQualificationGrades(data: any) {
        return this.http.post(this.BASE_URL + '/v1/master/getQualificationGrades', data, httpOptions);
    }

    getQualificationLevels(data: any) {
        return this.http.post(this.BASE_URL + '/v1/master/getQualificationLevels', data, httpOptions);
    }

    getQualificationSubjects(data: any) {
        return this.http.post(this.BASE_URL + '/v1/master/getQualificationSubjects', data, httpOptions);
    }

    getInstitution(data: any) {
        return this.http.post(this.BASE_URL + '/v1/master/getInstitution', data, httpOptions);
    }

    uploadFile(data: any) {
        return this.http.post(this.BASE_URL + '/v1/upload/file', data);
    }

    uploadMultiFile(data: any) {
        return this.http.post(this.BASE_URL + '/v1/upload/multifile', data);
    }

    addEducator(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educator/addEducator', data, httpOptions);
    }

    getEducator(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educator/getEducator', data, httpOptions);
    }

    getEducatorById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educator/getEducatorById', data, httpOptions);
    }

    updateEducator(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educator/updateEducator', data, httpOptions);
    }

    deleteEducator(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educator/deleteEducator', data, httpOptions);
    }

    enableActive(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educator/enableActive', data, httpOptions);
    }

    enableApprove(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educator/enableApprove', data, httpOptions);
    }

    getCourses(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courses/getCourses', data, httpOptions);
    }

    addCourse(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courses/addCourse', data, httpOptions);
    }

    getCourseById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courses/getCourseById', data, httpOptions);
    }

    updateCourse(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courses/updateCourse', data, httpOptions);
    }

    deleteCourse(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courses/deleteCourse', data, httpOptions);
    }

    enableApproveCourse(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courses/enableApprove', data, httpOptions);
    }

    enableActiveCourse(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courses/enableActive', data, httpOptions);
    }

    enableHiddenCourse(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courses/enableHidden', data, httpOptions);
    }

    updateCoursePopular(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courses/updateCoursePopular', data, httpOptions);
    }
    
    updateCourseFeatured(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courses/updateCourseFeatured', data, httpOptions);
    }

    searchCourseByName(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courses/searchCourseByName', data, httpOptions);
    }

    getLession(data: any) {
        return this.http.post(this.BASE_URL + '/v1/lession/getLession', data, httpOptions);
    }

    addLession(data: any) {
        return this.http.post(this.BASE_URL + '/v1/lession/addLession', data, httpOptions);
    }

    getLessionById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/lession/getLessionById', data, httpOptions);
    }

    updateLession(data: any) {
        return this.http.post(this.BASE_URL + '/v1/lession/updateLession', data, httpOptions);
    }

    deleteLession(data: any) {
        return this.http.post(this.BASE_URL + '/v1/lession/deleteLession', data, httpOptions);
    }

    searchLessionByName(data: any) {
        return this.http.post(this.BASE_URL + '/v1/lession/searchLessionByName', data, httpOptions);
    }

    getUnits(data: any) {
        return this.http.post(this.BASE_URL + '/v1/unit/getUnit', data, httpOptions);
    }

    getUnitById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/unit/getUnitById', data, httpOptions);
    }

    addUnit(data: any) {
        return this.http.post(this.BASE_URL + '/v1/unit/addUnit', data, httpOptions);
    }

    updateUnit(data: any) {
        return this.http.post(this.BASE_URL + '/v1/unit/updateUnit', data, httpOptions);
    }

    deleteUnit(data: any) {
        return this.http.post(this.BASE_URL + '/v1/unit/deleteUnit', data, httpOptions);
    }

    searchUnitByName(data: any) {
        return this.http.post(this.BASE_URL + '/v1/unit/searchUnitByName', data, httpOptions);
    }

    addExercise(data: any) {
        return this.http.post(this.BASE_URL + '/v1/exercise/addExercise', data, httpOptions);
    }

    getExercise(data: any) {
        return this.http.post(this.BASE_URL + '/v1/exercise/getExercise', data, httpOptions);
    }

    deleteExercise(data: any) {
        return this.http.post(this.BASE_URL + '/v1/exercise/deleteExercise', data, httpOptions);
    }

    updateExercise(data: any) {
        return this.http.post(this.BASE_URL + '/v1/exercise/updateExercise', data, httpOptions);
    }

    getExerciseById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/exercise/getExerciseById', data, httpOptions);
    }

    addAttachments(data: any) {
        return this.http.post(this.BASE_URL + '/v1/attachments/addAttachments', data, httpOptions);
    }

    getAttachments(data: any) {
        return this.http.post(this.BASE_URL + '/v1/attachments/getAttachments', data, httpOptions);
    }

    getAttachmentsById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/attachments/getAttachmentsById', data, httpOptions);
    }

    updateAttachments(data: any) {
        return this.http.post(this.BASE_URL + '/v1/attachments/updateAttachments', data, httpOptions);
    }

    deleteAttachments(data: any) {
        return this.http.post(this.BASE_URL + '/v1/attachments/deleteAttachments', data, httpOptions);
    }

    searchEducatorByName(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educator/searchEducatorByName', data, httpOptions);
    }

    addCourseEducatorMap(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courseeducatormap/addCourseEducatorMap', data, httpOptions);
    }

    updateCourseEducatorMap(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courseeducatormap/updateCourseEducatorMap', data, httpOptions);
    }

    deleteCourseEducatorMap(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courseeducatormap/deleteCourseEducatorMap', data, httpOptions);
    }

    getCourseEducatorMapById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courseeducatormap/getCourseEducatorMapById', data, httpOptions);
    }

    getCourseEducatorMap(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courseeducatormap/getCourseEducatorMap', data, httpOptions);
    }

    getLessionmap(data: any) {
        return this.http.post(this.BASE_URL + '/v1/lessionmap/getLessionmap', data, httpOptions);
    }

    getLessionmapById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/lessionmap/getLessionmapById', data, httpOptions);
    }

    addLessionmap(data: any) {
        return this.http.post(this.BASE_URL + '/v1/lessionmap/addLessionmap', data, httpOptions);
    }

    updateLessionmap(data: any) {
        return this.http.post(this.BASE_URL + '/v1/lessionmap/updateLessionmap', data, httpOptions);
    }

    deleteLessionmap(data: any) {
        return this.http.post(this.BASE_URL + '/v1/lessionmap/deleteLessionmap', data, httpOptions);
    }

    searchExerciseByName(data: any) {
        return this.http.post(this.BASE_URL + '/v1/exercise/searchExerciseByName', data, httpOptions);
    }

    getUserDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/user/getUserDetails', data, httpOptions);
    }

    fetchCategoryType(data: any) {
        return this.http.post(this.BASE_URL + '/v1/categoryType/fetchCategoryType', data, httpOptions);
    }
    addCategoryType(data: any) {
        return this.http.post(this.BASE_URL + '/v1/categoryType/insertCategoryId', data, httpOptions);
    }
    updateCategoryType(data: any) {
        return this.http.post(this.BASE_URL + '/v1/categoryType/updateName', data, httpOptions);
    }
    updateHidden(data: any) {
        return this.http.post(this.BASE_URL + '/v1/categoryType/editHidden', data, httpOptions);
    }
    deleteCategoryType(data: any) {
        return this.http.post(this.BASE_URL + '/v1/categoryType/deletedCategories', data, httpOptions);
    }

    // Qualification Subject

    fetchQualificationSubject(data: any) {
        return this.http.post(this.BASE_URL + '/v1/QualificationSubjects/fetchQualificationSubjects', data, httpOptions);
    }
    addQualificationSubject(data: any) {
        return this.http.post(this.BASE_URL + '/v1/QualificationSubjects/insertQualificationSubjects', data, httpOptions);
    }
    updateQaulificationSubject(data: any) {
        return this.http.post(this.BASE_URL + '/v1/QualificationSubjects/updateQulaificationSubjects', data, httpOptions);
    }
    deleteQualificationSubject(data: any) {
        return this.http.post(this.BASE_URL + '/v1/QualificationSubjects/deletedQualificationSubjects', data, httpOptions);
    }

    // Qualification Level

    fetchQualificationLevel(data: any) {
        return this.http.post(this.BASE_URL + '/v1/qualificationLevels/fetchQualificationLevels', data, httpOptions);
    }
    addQualificationLevel(data: any) {
        return this.http.post(this.BASE_URL + '/v1/qualificationLevels/insertQualificationLevels', data, httpOptions);
    }
    updateQualificationLevel(data: any) {
        return this.http.post(this.BASE_URL + '/v1/qualificationLevels/updateQualificationLevels', data, httpOptions);
    }
    deleteQualificationLevel(data: any) {
        return this.http.post(this.BASE_URL + '/v1/qualificationLevels/deletedQualificationLevels', data, httpOptions);
    }

    //Qualification Grade
    fetchQualificationGrade(data: any) {
        return this.http.post(this.BASE_URL + '/v1/qualificationGrades/fetchQualificationGrades', data, httpOptions);
    }
    addQualificationGrade(data: any) {
        return this.http.post(this.BASE_URL + '/v1/qualificationGrades/insertQualificationGrades', data, httpOptions);
    }
    updateQualificationGrade(data: any) {
        return this.http.post(this.BASE_URL + '/v1/qualificationGrades/updationQualificationGrades', data, httpOptions);
    }
    deleteQualificationGrade(data: any) {
        return this.http.post(this.BASE_URL + '/v1/qualificationGrades/deletQualificationGrades', data, httpOptions);
    }

    // Categories 
    fetchCategories(data: any) {
        return this.http.post(this.BASE_URL + '/v1/categories/fetchCategories', data, httpOptions);
    }
    addCategories(data: any) {
        return this.http.post(this.BASE_URL + '/v1/categories/insertCategories', data, httpOptions);
    }
    updateCategories(data: any) {
        return this.http.post(this.BASE_URL + '/v1/categories/updateCategories', data, httpOptions);
    }
    deleteCategories(data: any) {
        return this.http.post(this.BASE_URL + '/v1/categories/deleteCategories', data, httpOptions);
    }

    // subject by Sajid
    fetchSubject(data: any) {
        return this.http.post(this.BASE_URL + '/v1/subject/fetchSubjects', data, httpOptions);
    }
    insertSubject(data: any) {
        return this.http.post(this.BASE_URL + '/v1/subject/insertSubjects', data, httpOptions);
    }
    updateSubject(data: any) {
        return this.http.post(this.BASE_URL + '/v1/subject/updateSubjectDtl', data, httpOptions);
    }

    deleteSubject(data: any) {
        return this.http.post(this.BASE_URL + '/v1/subject/deletedSubjects', data, httpOptions);
    }

    getCategoriesTree(data: any) {
        return this.http.post(this.BASE_URL + '/v1/master/getCategoriesTree', data, httpOptions);
    }


    // institue
    fetchInstitue(data: any) {
        return this.http.post(this.BASE_URL + '/v1/institutions/fetchInstitutionsDtl', data, httpOptions);
    }
    inserInstitue(data: any) {
        return this.http.post(this.BASE_URL + '/v1/institutions/insertInstitutionsDtl', data, httpOptions)
    }
    updateInstitue(data: any) {
        return this.http.post(this.BASE_URL + '/v1/institutions/updateInstitutionsDtl', data, httpOptions)
    }

    deleteInstitue(data: any) {
        return this.http.post(this.BASE_URL + '/v1/institutions/deleteInstitutionsDtl', data, httpOptions)
    }


    //cart 

    addToCart(data: any) {
        return this.http.post(this.BASE_URL + '/v1/cart/addToCart', data, httpOptions)
    }

    getCart(data: any) {
        return this.http.post(this.BASE_URL + '/v1/cart/getCart', data, httpOptions)
    }

    deleteCart(data: any) {
        return this.http.post(this.BASE_URL + '/v1/cart/deleteCart', data, httpOptions)
    }

    updateCartQuantity(data: any) {
        return this.http.post(this.BASE_URL + '/v1/cart/updateCartQuantity', data, httpOptions)
    }

    // Onboarding

    courseDetailsOnboarding(data: any) {
        return this.http.post(this.BASE_URL + '/v1/onboarding/courseDetails', data, httpOptions)
    }


    getPopularCourses(data: any) {
        return this.http.post(this.BASE_URL + '/v1/onboarding/getPopularCourses', data, httpOptions)
    }


    searchCourse(data: any) {
        return this.http.post(this.BASE_URL + '/v1/onboarding/searchCourse', data, httpOptions)
    }

    getFeaturedCourses(data: any) {
        return this.http.post(this.BASE_URL + '/v1/onboarding/getFeaturedCourses', data, httpOptions)
    }

    getRecentAddedCourses(data: any) {
        return this.http.post(this.BASE_URL + '/v1/onboarding/getRecentAddedCourses', data, httpOptions)
    }

    getTopCategories(data: any) {
        return this.http.post(this.BASE_URL + '/v1/onboarding/getTopCategories', data, httpOptions)
    }


    // skills

    addSkill(data: any) {
        return this.http.post(this.BASE_URL + '/v1/skillList/addSkill', data, httpOptions)
    }

    updateSkill(data: any) {
        return this.http.post(this.BASE_URL + '/v1/skillList/updateSkill', data, httpOptions)
    }

    getSkills(data: any) {
        return this.http.post(this.BASE_URL + '/v1/skillList/getSkills', data, httpOptions)
    }

    deleteSkill(data: any) {
        return this.http.post(this.BASE_URL + '/v1/skillList/deleteSkill', data, httpOptions)
    }

    enableActiveSkill(data: any) {
        return this.http.post(this.BASE_URL + '/v1/skillList/enableActive', data, httpOptions)
    }


    //courses -> Skills and Subject

    searchSkillByName(data: any) {
        return this.http.post(this.BASE_URL + '/v1/skillList/searchSkillByName', data, httpOptions)
    }

    searchSubjectsByName(data: any) {
        return this.http.post(this.BASE_URL + '/v1/subject/searchSubjectsByName', data, httpOptions)
    }


    getCategoryTypeById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/categorytype/getCategoryTypeById', data, httpOptions)
    }


    startModule(data: any) {
        return this.http.post(this.BASE_URL + '/v1/onboarding/startModule', data, httpOptions)
    }


    fetchResources(data: any) {
        return this.http.post(this.BASE_URL + '/v1/resource/fetchResources', data, httpOptions)
    }


    fetchResourcesDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/resource/fetchResourcesDetails', data, httpOptions)
    }


    insertResources(data: any) {
        return this.http.post(this.BASE_URL + '/v1/resource/insertResources', data, httpOptions)
    }

    updateResources(data: any) {
        return this.http.post(this.BASE_URL + '/v1/resource/updateResources', data, httpOptions)
    }

    deleteResources(data: any) {
        return this.http.post(this.BASE_URL + '/v1/resource/deleteResources', data, httpOptions)
    }

    deleteResourcePDF(data: any) {
        return this.http.post(this.BASE_URL + '/v1/resource/deleteResourcePDF', data, httpOptions)
    }



    fetchSchools(data: any) {
        return this.http.post(this.BASE_URL + '/v1/schools/fetchSchools', data, httpOptions)
    }


    fetchSchoolsDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/schools/fetchSchoolsDetails', data, httpOptions)
    }


    insertSchools(data: any) {
        return this.http.post(this.BASE_URL + '/v1/schools/insertSchools', data, httpOptions)
    }


    updateSchools(data: any) {
        return this.http.post(this.BASE_URL + '/v1/schools/updateSchools', data, httpOptions)
    }


    deleteSchools(data: any) {
        return this.http.post(this.BASE_URL + '/v1/schools/deleteSchools', data, httpOptions)
    }

    fetchResourceCategory(data: any) {
        return this.http.post(this.BASE_URL + '/v1/commonApis/fetchResourceCategory', data, httpOptions)
    }

    fetchAgeRanges(data: any) {
        return this.http.post(this.BASE_URL + '/v1/commonApis/fetchAgeRanges', data, httpOptions)
    }

    fetchSchoolsByName(data: any) {
        return this.http.post(this.BASE_URL + '/v1/commonApis/fetchSchoolsByName', data, httpOptions)
    }


    fetchPartners(data: any) {
        return this.http.post(this.BASE_URL + '/v1/partners/fetchPartners', data, httpOptions)
    }

    fetchPartnersById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/partners/fetchPartnersById', data, httpOptions)
    }

    addPartners(data: any) {
        return this.http.post(this.BASE_URL + '/v1/partners/addPartners', data, httpOptions)
    }

    updatePartners(data: any) {
        return this.http.post(this.BASE_URL + '/v1/partners/updatePartners', data, httpOptions)
    }

    deletePartners(data: any) {
        return this.http.post(this.BASE_URL + '/v1/partners/deletePartners', data, httpOptions)
    }


    fetchEducatorId(data: any) {
        return this.http.post(this.BASE_URL + '/v1/commonApis/fetchEducatorId', data, httpOptions)
    }


    insertEducatorOfTheMonth(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educatorOfTheMonth/insertEducatorOfTheMonth', data, httpOptions)
    }

    fetchEducatorOfTheMonth(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educatorOfTheMonth/fetchEducatorOfTheMonth', data, httpOptions)
    }

    updateEducatorOfTheMonth(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educatorOfTheMonth/updateEducatorOfTheMonth', data, httpOptions)
    }

    fetchDetailsEducatorOfTheMonth(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educatorOfTheMonth/fetchDetailsEducatorOfTheMonth', data, httpOptions)
    }

    deleteEducatorOfTheMonth(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educatorOfTheMonth/deleteEducatorOfTheMonth', data, httpOptions)
    }

    fetchEducationLevels(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educationLevel/fetchEducationLevels', data, httpOptions)
    }

    fetchEducationLevelsById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educationLevel/fetchEducationLevelsById', data, httpOptions)
    }

    addEducationLevel(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educationLevel/addEducationLevel', data, httpOptions)
    }

    updateEducationLevel(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educationLevel/updateEducationLevel', data, httpOptions)
    }

    deleteEducationLevel(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educationLevel/deleteEducationLevel', data, httpOptions)
    }

    switchStatusEducationLevel(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educationLevel/switchStatusEducationLevel', data, httpOptions)
    }

    fetchResourceCategoryv1(data: any) {
        return this.http.post(this.BASE_URL + '/v1/resourceCategory/fetchResourceCategory', data, httpOptions)
    }

    fetchResourceCategoryDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/resourceCategory/fetchResourceCategoryDetails', data, httpOptions)
    }

    insertResourceCategory(data: any) {
        return this.http.post(this.BASE_URL + '/v1/resourceCategory/insertResourceCategory', data, httpOptions)
    }

    updateResourceCategory(data: any) {
        return this.http.post(this.BASE_URL + '/v1/resourceCategory/updateResourceCategory', data, httpOptions)
    }

    deleteResourceCategory(data: any) {
        return this.http.post(this.BASE_URL + '/v1/resourceCategory/deleteResourceCategory', data, httpOptions)
    }

    toogleStatusResourceCategory(data: any) {
        return this.http.post(this.BASE_URL + '/v1/resourceCategory/toogleStatusResourceCategory', data, httpOptions)
    }

    fetchResourceCategoryTypes(data: any) {
        return this.http.post(this.BASE_URL + '/v1/commonApis/fetchResourceCategoryTypes', data, httpOptions)
    }

    getFeaturedLiveCourses(data: any) {
        return this.http.post(this.BASE_URL + '/v1/livecourse/getFeaturedLiveCourses', data, httpOptions)
    }

    getPopularLiveCourses(data: any) {
        return this.http.post(this.BASE_URL + '/v1/livecourse/getPopularLiveCourses', data, httpOptions)
    }

    getRecentAddedLiveCourses(data: any) {
        return this.http.post(this.BASE_URL + '/v1/livecourse/getRecentAddedLiveCourses', data, httpOptions)
    }

    getFurtherLiveCourses(data: any) {
        return this.http.post(this.BASE_URL + '/v1/livecourse/getFurtherLiveCourses', data, httpOptions)
    }

    liveCourseDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/livecourse/liveCourseDetails', data, httpOptions)
    }

    searchLiveCourse(data: any) {
        return this.http.post(this.BASE_URL + '/v1/livecourse/searchLiveCourse', data, httpOptions)
    }

    getCoursesByCategoryId(data: any) {
        return this.http.post(this.BASE_URL + '/v1/livecourse/getCoursesByCategoryId', data, httpOptions)
    }

    getPopularLiveCoursesOfAcademicDevelopment(data: any) {
        return this.http.post(this.BASE_URL + '/v1/livecourse/getPopularLiveCoursesOfAcademicDevelopment', data, httpOptions)
    }

    getFeaturedCoursesOfWellBeing(data: any) {
        return this.http.post(this.BASE_URL + '/v1/livecourse/getFeaturedCoursesOfWellBeing', data, httpOptions)
    }

    getResourceCategories() {
        return this.http.get(this.BASE_URL + '/v1/userpanelresource/getResourceCategories')
    }

    getResources(data: any) {
        return this.http.post(this.BASE_URL + '/v1/userpanelresource/getResources', data, httpOptions)
    }


    resourceDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/userpanelresource/resourceDetails', data, httpOptions)
    }


    furtherResourcesByCategory(data: any) {
        return this.http.post(this.BASE_URL + '/v1/userpanelresource/furtherResourcesByCategory', data, httpOptions)
    }

    getFeaturedEducators(data: any) {
        return this.http.post(this.BASE_URL + '/v1/userpaneleducator/getFeaturedEducators', data, httpOptions)
    }

    getPopularEducators(data: any) {
        return this.http.post(this.BASE_URL + '/v1/userpaneleducator/getPopularEducators', data, httpOptions)
    }

    educatorDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/userpaneleducator/educatorDetails', data, httpOptions)
    }

    searchEducator(data: any) {
        return this.http.post(this.BASE_URL + '/v1/userpaneleducator/searchEducator', data, httpOptions)
    }

    addCourseEnrollFree(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courseenrollfree/addCourseEnrollFree', data, httpOptions)
    }

    getCourseEnrollFree(data: any) {
        return this.http.post(this.BASE_URL + '/v1/courseenrollfree/getCourseEnrollFree', data, httpOptions)
    }

    updateCart(data: any) {
        return this.http.post(this.BASE_URL + '/v1/cart/updateCart', data, httpOptions)
    }

    getSchoolResources(data: any) {
        return this.http.post(this.BASE_URL + '/v1/userpanelresource/getSchoolResources', data, httpOptions)
    }

    schoolDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/userpanelresource/schoolDetails', data, httpOptions)
    }
    schoolsOutsideOfTheLocation(data: any) {
        return this.http.post(this.BASE_URL + '/v1/userpanelresource/schoolsOutsideOfTheLocation', data, httpOptions)
    }

    getTimeZone(data: any) {
        return this.http.post(this.BASE_URL + '/v1/timezone/getTimeZone', data, httpOptions)
    }

    addLiveCourseSchedule(data: any) {
        return this.http.post(this.BASE_URL + '/v1/livecourseschedule/addLiveCourseSchedule', data, httpOptions)
    }

    addEnrollOnCourseByCourseId(data: any) {
        return this.http.post(this.BASE_URL + '/v1/livecourse/addEnrollOnCourseByCourseId', data, httpOptions)
    }

    addContactEducatorDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/userpaneleducator/addContactEducatorDetails', data, httpOptions)
    }

    getAllUsers(data: any) {
        return this.http.post(this.BASE_URL + '/v1/user/getAllUsers', data, httpOptions)
    }

    addUserAdminPanel(data: any) {
        return this.http.post(this.BASE_URL + '/v1/user/addUserAdminPanel', data, httpOptions)
    }

    updateUserAdminPanel(data: any) {
        return this.http.post(this.BASE_URL + '/v1/user/updateUserAdminPanel', data, httpOptions)
    }

    deleteUser(data: any) {
        return this.http.post(this.BASE_URL + '/v1/user/deleteUser', data, httpOptions)
    }

    getUserById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/user/getUserById', data, httpOptions)
    }

    getLiveCourseSchedule(data: any) {
        return this.http.post(this.BASE_URL + '/v1/livecourseschedule/getLiveCourseSchedule', data, httpOptions)
    }

    getEnrollOnCourse(data: any) {
        return this.http.post(this.BASE_URL + '/v1/livecourse/getEnrollOnCourse', data, httpOptions)
    }


    getContactEducatorDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/userpaneleducator/getContactEducatorDetails', data, httpOptions)
    }
    addEducatorSignUpDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educatorsignup/addEducatorSignUpDetails', data, httpOptions)
    }
    getEducatorSignUpDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educatorsignup/getEducatorSignUpDetails', data, httpOptions)
    }
    approveEducator(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educatorsignup/approveEducator', data, httpOptions)
    }
    addContachWithTeamDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/getintouchwithteam/addContachWithTeamDetails', data, httpOptions)
    }
    getContachWithTeamDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/getintouchwithteam/getContachWithTeamDetails', data, httpOptions)
    }
    getActivityLog(data: any) {
        return this.http.post(this.BASE_URL + '/v1/activitylog/getActivityLog', data, httpOptions)
    }
    addActivityLog(data: any) {
        return this.http.post(this.BASE_URL + '/v1/activitylog/addActivityLog', data, httpOptions)
    }
    userSignIn(data: any) {
        return this.http.post(this.BASE_URL + '/v1/user/userSignIn', data, httpOptions)
    }

    getRoles() {
        return this.http.get(this.BASE_URL + '/v1/user/getRoles', httpOptions);
    }

    addAccountUsers(data: any) {
        return this.http.post(this.BASE_URL + '/v1/accountusers/addAccountUsers', data, httpOptions)
    }

    updateAccountUsers(data: any) {
        return this.http.post(this.BASE_URL + '/v1/accountusers/updateAccountUsers', data, httpOptions)
    }

    getAllAccountUsers(data: any) {
        return this.http.post(this.BASE_URL + '/v1/accountusers/getAllAccountUsers', data, httpOptions)
    }

    getAccountUsersById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/accountusers/getAccountUsersById', data, httpOptions)
    }

    deleteAccountUser(data: any) {
        return this.http.post(this.BASE_URL + '/v1/accountusers/deleteAccountUser', data, httpOptions)
    }

    updateUser(data: any) {
        return this.http.post(this.BASE_URL + '/v1/user/updateUser', data, httpOptions)
    }

    downloadListAsCsv(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educator/downloadListAsCsv', data, httpOptions)
    }

    getPopularFeatureResource(data: any) {
        return this.http.post(this.BASE_URL + '/v1/userpanelresource/getPopularFeaturedResrc', data, httpOptions)
    }

    emptyCart(data: any) {
        return this.http.post(this.BASE_URL + '/v1/cart/emptyCart', data, httpOptions)
    }

    getPopularFeaturedScl(data: any) {
        return this.http.post(this.BASE_URL + '/v1/ukschool/getPopularFeaturedScl', data, httpOptions)
    }

    getSchools(data: any) {
        return this.http.post(this.BASE_URL + '/v1/ukschool/getSchools', data, httpOptions)
    }

    ukSchoolDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/ukschool/schoolDetails', data, httpOptions)
    }

    ukschoolsOutsideLocation(data: any) {
        return this.http.post(this.BASE_URL + '/v1/ukschool/schoolsOutsideLocation', data, httpOptions)
    }

    getSchoolFilter() {
        return this.http.get(this.BASE_URL + '/v1/ukschool/getSchoolFilter')
    }

    getPopularFeaturedUnvs(data: any) {
        return this.http.post(this.BASE_URL + '/v1/ukuniversity/getPopularFeaturedUnvs', data, httpOptions)
    }

    getUniversityFilter() {
        return this.http.get(this.BASE_URL + '/v1/ukuniversity/getUniversityFilter')
    }

    universityDetails(data: any) {
        return this.http.post(this.BASE_URL + '/v1/ukuniversity/universityDetails', data, httpOptions)
    }

    getUniversities(data: any) {
        return this.http.post(this.BASE_URL + '/v1/ukuniversity/getUniversities', data, httpOptions)
    }

    getUniversityEducators(data: any) {
        return this.http.post(this.BASE_URL + '/v1/ukuniversity/getUniversityEducators', data, httpOptions)
    }

    getOtherUniversities(data: any) {
        return this.http.post(this.BASE_URL + '/v1/ukuniversity/getOtherUniversities', data, httpOptions)
    }

    getUkUniversity(data:any){
        return this.http.post(this.BASE_URL + '/v1/university/getUniversities', data, httpOptions)
    }

    getUkUniversitybyId(data:any){
        return this.http.post(this.BASE_URL + '/v1/university/getUniversityById', data, httpOptions)
    }

    deleteUkUniversity(data:any){
        return this.http.post(this.BASE_URL + '/v1/university/deleteUniversity', data, httpOptions)
    }
    addUkUniversity(data:any){
        return this.http.post(this.BASE_URL + '/v1/university/addUniversity', data, httpOptions)
    }
    updateUkUniversity(data:any){
        return this.http.post(this.BASE_URL + '/v1/university/updateUniversity', data, httpOptions)
    }

    checkAnswer(data:any){
        return this.http.post(this.BASE_URL + '/v1/exercise/checkAnswer', data, httpOptions);
    }


    // user-signup

    userSignUp(data:any){
        return this.http.post(this.BASE_URL + '/v1/user/userSignUp', data, httpOptions);
    }
    userVerification(data:any){
        return this.http.post(this.BASE_URL + '/v1/user/userVerification', data, httpOptions);
    }

    addStatistic(data:any){
        return this.http.post(this.BASE_URL + '/v1/userstatistic/addStatistic', data, httpOptions);
    }

    globalSearch(data:any){
        return this.http.post(this.BASE_URL + '/v1/onboarding/globalSearch', data, httpOptions);
    }

    getCourcesByEducator(data:any){
        return this.http.post(this.BASE_URL + '/v1/educator/getCourcesByEducator', data, httpOptions);
    }

    createCheckoutSession(data:any){
        return this.http.post(this.BASE_URL + '/v1/payment/create-checkout-session', data, httpOptions);
    }

    educatorcategoriestype(data:any){
        return this.http.post(this.BASE_URL + '/v1/userpaneleducator/educatorcategoriestype', data, httpOptions);
    }


    // Client related methods
    getAllClients(data: any) {
        return this.http.post(this.BASE_URL + '/v1/client/getClients', data, httpOptions);
    }

    getClientById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/client/getClientById', data, httpOptions);
    }

    addClient(data: any) {
        return this.http.post(this.BASE_URL + '/v1/client/addClient', data, httpOptions);
    }

    updateClient(data: any) {
        return this.http.post(this.BASE_URL + '/v1/client/updateClient', data, httpOptions);
    }

    deleteClient(data: any) {
        return this.http.post(this.BASE_URL + '/v1/client/deleteClient', data, httpOptions);
    }

    getChildrenByClientId(data: any) {
        return this.http.post(this.BASE_URL + '/v1/client/getChildrenByClientId', data, httpOptions);
    }

    // Student related methods
    getStudentById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/students/getStudentById', data, httpOptions);
    }

    getAllStudents(data: any) {
        return this.http.post(this.BASE_URL + '/v1/students/getAllStudents', data, httpOptions);
    }

    addStudent(data: any) {
        return this.http.post(this.BASE_URL + '/v1/students/addStudent', data, httpOptions);
    }

    updateStudent(data: any) {
        return this.http.post(this.BASE_URL + '/v1/students/updateStudent', data, httpOptions);
    }

    deleteStudent(data: any) {
        return this.http.post(this.BASE_URL + '/v1/students/deleteStudent', data, httpOptions);
    }

    getStudentsByClientId(data: any) {
        return this.http.post(this.BASE_URL + '/v1/students/getStudentsByClientId', data, httpOptions);
    }

    // Job related methods
    getJobs(data: any) {
        return this.http.post(this.BASE_URL + '/v1/job/getJobs', data, httpOptions);
    }

    getJobById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/job/getJobById', data, httpOptions);
    }

    addJob(data: any) {
        return this.http.post(this.BASE_URL + '/v1/job/addJob', data, httpOptions);
    }

    updateJob(data: any) {
        return this.http.post(this.BASE_URL + '/v1/job/updateJob', data, httpOptions);
    }

    deleteJob(data: any) {
        return this.http.post(this.BASE_URL + '/v1/job/deleteJob', data, httpOptions);
    }

    getAllEducators(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educator/getEducator', data, httpOptions);
    }

    getAllCategory(data: any) {
        return this.http.post(this.BASE_URL + '/v1/categories/fetchCategories', data, httpOptions);
    }

    getEducatorsByCategory(data: any) {
        return this.http.post(this.BASE_URL + '/v1/educator/getEducatorsByCategory', data, httpOptions);
    }

    // Educator Lesson methods 
    getMyJobs(data: any) {
        return this.http.post(this.BASE_URL + '/v1/myjobs/getMyJobs', data, httpOptions);
    }
    
    addMyJob(data: any) {
        return this.http.post(this.BASE_URL + '/v1/myjobs/addMyJob', data, httpOptions);
    }
    
    updateMyJob(data: any) {
        return this.http.post(this.BASE_URL + '/v1/myjobs/updateMyJob', data, httpOptions);
    }

    getLessonsByJobIdAndEducatorId(data: any) {
        return this.http.post(this.BASE_URL + '/v1/myjobs/getLessonsByJobIdAndEducatorId', data, httpOptions);
    }

    // Invoice methods
    previewInvoice(data: any) {
        return this.http.post(this.BASE_URL + '/v1/invoice/previewInvoicePdf', data, httpOptions);
    }
    
    downloadApprovedInvoices(data: any[]) {
        return this.http.post(this.BASE_URL + '/v1/invoice/downloadAllApprovedPdfs', data, httpOptions);
    }

    getPdf(token: string, download: boolean = false): string {
        return this.BASE_URL + `/v1/invoice/getPdf?token=${token}&download=${download}`;
    }
    
    storeInvoiceData(data: { identifier: string, invoiceData: any }) {
        return this.http.post(this.BASE_URL + '/v1/invoice/storeCachedInvoice', data, httpOptions);
    }
    
    getInvoiceData(identifier: string) {
        return this.http.get(this.BASE_URL + `/v1/invoice/getCachedInvoice/${identifier}`, httpOptions);
    }
    
    getInvoices(data: any) {
        return this.http.post(this.BASE_URL + '/v1/invoice/getInvoices', data, httpOptions);
    }
    
    getInvoiceById(data: any) {
        return this.http.post(this.BASE_URL + '/v1/invoice/getInvoiceById', data, httpOptions);
    }
    
    deleteInvoice(data: any) {
        return this.http.post(this.BASE_URL + '/v1/invoice/deleteInvoice', data, httpOptions);
    }
    
    updateInvoice(data: any) {
        return this.http.post(this.BASE_URL + '/v1/invoice/updateInvoice', data, httpOptions);
    }
    
    // Calendar methods
    getInvoicesByClient(data: any) {
        return this.http.post(this.BASE_URL + '/v1/invoice/getInvoicesByClient', data, httpOptions);
    }

    getMyJobsEducator(data: any) {
        return this.http.post(this.BASE_URL + '/v1/calendar/getMyJobsEducator', data, httpOptions);
    }
    
    getMyJobsAdmin(data: any) {
        return this.http.post(this.BASE_URL + '/v1/calendar/getMyJobsAdmin', data, httpOptions);
    }

    getAvailability(data: any) {
        return this.http.get(this.BASE_URL + '/v1/calendar/getAvailability', {
            ...httpOptions,
            params: data
        });
    }

    getAllAvailabilities(data: any) {
        return this.http.get(this.BASE_URL + '/v1/calendar/getAllAvailabilities', {
            ...httpOptions,
            params: data
        });
    }
    
    updateAvailability(data: any) {
        return this.http.post(this.BASE_URL + '/v1/calendar/updateAvailability', data, httpOptions);
    }

    downloadResourcePDF(data:any){
        return this.http.post(this.BASE_URL + '/v1/resource/downloadResourcePDF', data, httpOptions);
    }


    // Analytics
    filterRevenueByTimeInterval(data: any){
        return this.http.get(this.BASE_URL + '/v1/revenueAnalytics/filterRevenueByTimeInterval', {
            ...httpOptions,
            params: data
        });
    }

    getLatestRevenues(data: any) {
        return this.http.get(this.BASE_URL + '/v1/revenueAnalytics/getLatestRevenues', {
            ...httpOptions,
            params: data
        });
    }

    //change password
    changePassword(data:any){
        return this.http.post(this.BASE_URL + '/v1/login/changePassword', data, httpOptions);
    }

    forgetPasswordGenOtp(data:any){
        return this.http.post(this.BASE_URL + '/v1/login/forgetPasswordGenOtp', data, httpOptions);
    }

    updateNewPassword(data:any){
        return this.http.post(this.BASE_URL + '/v1/login/updateNewPassword', data, httpOptions);
    }
}
