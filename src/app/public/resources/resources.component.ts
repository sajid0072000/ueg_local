import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

declare var $: any;

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit, OnDestroy {
  limit = 5;
  offset = 0;
  resourseLimit: any = 21;
  resourceOffset: any = 0;
  searchkey: any = '';
  resourceCategoriesArr: any = [];
  resourceArr: any = [];
  count: any = '';
  isShowMore: boolean = true;
  isShowMoreSchool: boolean = true;
  searchLimit = 9;
  schoolLimit = 20;
  schoolOffset = 0;
  schoollist: any = [];
  sortingType: any = '';
  totalCount: any = '';
  resourcecategory: any = [];
  popularResourceList: any = [];
  featureResourceList: any = [];
  slideConfigpopularresources: any = {};
  slideConfigFeatureresources: any = {};
  quantity: any = 1;
  navdivfilter: any = false;
  searchText: any = '';
  searchResourcesArr: any = [];
  searchSpinner: boolean = false;
  searchresourceLimit = 9;
  searchresourceOffSet = 0;

  constructor(private rest: RestApiService, private router: Router, public common: CommonService, private notifierService: NotifierService) {}

  ngOnInit(): void {
    this.getResourceCategories().then(() => {
      this.getPopularFeatureResource();
      let name: any = this.common.sheardData;
      if (name) {
        setTimeout(() => {
          for (let [i, item] of this.resourceCategoriesArr.entries()) {
            if (item.ResourceCategoryName === name) {
              this.resourcecategory = [item.ResourceCategoryId];
              const elem: any = document.getElementById('checked' + i);
              if (elem) {
                elem.checked = true;
              }
              this.getResources(1);
              this.common.sheardData = null; // Clear the data after use
              break;
            }
          }
        }, 1000);
      } else {
        this.getResources(1);
      }
    });
  }

  ngOnDestroy(): void {
    this.common.sheardData = null;
  }

  gotResourseDetails(id: any): any {
    this.common.navigate(['/resources-details/' + id]);
  }

  async getResourceCategories(): Promise<any> {
    const data = {};
    return new Promise((resolve) => {
      this.rest.getResourceCategories().subscribe((res: any) => {
        if (res.success) {
          let temp = res.response;
          for (let item of temp) {
            item.ischecked = false;
          }
          this.resourceCategoriesArr = temp;
        } else {
          this.resourceCategoriesArr = [];
        }
        resolve(true);
      });
    });
  }

  getResources(flag = 0): any {
    const data = {
      limit: this.resourseLimit,
      offset: this.resourceOffset,
      resourcecategory: this.resourcecategory,
      sortingType: this.sortingType
    };

    this.rest.getResources(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        if (flag === 1) {
          this.count = res.response.count;
          this.resourceArr = res.response.resourceList;
        } else {
          for (const obj of res.response.resourceList) {
            this.resourceArr.push(obj);
          }
        }
        this.isShowMore = this.resourceArr.length >= this.resourseLimit;
        if (this.resourceArr.length === this.count) {
          this.isShowMore = false;
        }
      } else {
        this.common.notify("error", res.message);
      }
    });
  }

  getResourcesByCategoryid(e: any, obj: any): any {
    this.resourceArr = [];
    let check = e.target.checked;
    if (check) {
      this.resourcecategory.push(obj.ResourceCategoryId);
    } else {
      for (const [index, data] of this.resourcecategory.entries()) {
        if (data === obj.ResourceCategoryId) {
          this.resourcecategory.splice(index, 1);
        }
      }
    }
    this.getResources(1);
  }

  showMore(): void {
    this.resourceOffset += this.resourseLimit;
    this.getResources();
  }

  goto(path: any): any {
    this.common.navigate([path]);
  }

  runFilterSortBy(type: string) {
    this.sortingType = type;
    this.getResources(1);
  }

  getPopularFeatureResource() {
    const data = {};
    this.rest.getPopularFeatureResource(data).subscribe((res: any) => {
      this.common.pageLoadEnd('p-loaded');
      if (res.success) {
        this.popularResourceList = res.response.popularList;
        this.slideConfigpopularresources = this.common.getSlickCaroOption(this.popularResourceList);
        this.featureResourceList = res.response.featuredList;
        this.slideConfigFeatureresources = this.common.getSlickCaroOption(this.featureResourceList);
      } else {
        this.popularResourceList = [];
        this.featureResourceList = [];
      }
      this.getResources(1);
    }, (err: any) => {
      this.common.notify('error', err.error.message);
    });
  }

  addCart(id: any): any {
    const data = {
      userid: this.common.getUserId(),
      resourceid: id,
      type: "resource",
      quantity: this.quantity,
    };
    this.common.loaderStart();
    this.rest.addToCart(data).subscribe(
      (res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          if (res.status === 1004) {
            this.common.notify("warning", res.message);
          }
          if (res.status === 200) {
            this.common.notify("success", res.message);
            this.common.Subject.next({ success: true });
          }
        } else {
          this.common.notify("error", res.message);
        }
      },
      (err: any) => {
        this.common.notify("error", err.error.message);
      }
    );
  }

  navdivfilterfun() {
    this.navdivfilter = !this.navdivfilter;
  }

  serchResources(): any {
    const data = {
      limit: 20,
      offset: this.resourceOffset,
      resourcecategory: this.resourcecategory,
      sortingType: this.sortingType,
      searchText: this.searchText
    };
    this.rest.getResources(data).subscribe((result: any) => {
      this.common.loaderEnd();
      if (result.success) {
        this.searchResourcesArr = result.response.resourceList;
      }
    });
  }

  onSearchFun(): any {
    if (this.searchText.length >= 3) {
      this.serchResources();
    }
    if (this.searchText.length === 0) {
      this.searchResourcesArr = [];
    }
  }

  SerchClearFun(): any {
    this.searchResourcesArr = [];
  }
}
