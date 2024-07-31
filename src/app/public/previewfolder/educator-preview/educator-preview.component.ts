import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-educator-preview',
  templateUrl: './educator-preview.component.html',
  styleUrls: ['./educator-preview.component.css']
})
export class EducatorPreviewComponent implements OnInit, OnDestroy {
  isNav: boolean = false;
  isActiveDiv: any = '0'
  teachingsubject: any = [];
  categoryTypeList: any = []
  courseList: any = []
  educatorDetailsObj: any = {}
  address: any = ''
  shortName: any = ''
  educatorid: any = ''
  categoriesTypeList: any = []
  constructor(public common: CommonService, public rest: RestApiService) {
  }
  ngOnDestroy(): void {
    localStorage.removeItem('educatorFormData')
  }
  ngOnInit(): void {
    let educatorDetailsObj: any = localStorage.getItem('educatorFormData');
    this.educatorDetailsObj = JSON.parse(educatorDetailsObj);
    if (this.educatorDetailsObj.categoriesList) {
      let temp = this.educatorDetailsObj.categoriesList
      let res = []
      for (let [i, data] of temp.entries()) {
        res.push(data.categoriesid)
        if (i == temp.length - 1) {
          let data = {
            categoryid: res
          }
          this.rest.educatorcategoriestype(data).subscribe((res: any) => {
            if (res.success) {
              this.categoriesTypeList = res.response
            } else {
              this.categoriesTypeList = []
            }
          });
        }
      }
    }
    // console.log( this.educatorDetailsObj.subjectList)
    if (educatorDetailsObj.teachingsubject) {
      this.teachingsubject = JSON.parse(educatorDetailsObj.subjectList);
      console.log(this.teachingsubject)
      for (let item of this.teachingsubject) {
        item.subjectsub = item.subjectsub.split(',').join(', ');
        console.log(item.subjectsub)
      }
    }

    if (this.educatorDetailsObj.qualificationList) {
      const qData = this.common.groupBy(this.educatorDetailsObj.qualificationList, 'institutionid');
      const keys = Object.keys(qData);
      const newArr: any = [];
      for (const key of keys) {
        newArr.push({
          keyName: key,
          id: qData[key][0].id,
          data: qData[key]
        })
      }
      
      /* newArr.sort((a: any, b: any) => {
        return b.id - a.id;
      }); */
      console.log('>>>>>>>>>>>>>> ', newArr)
      for (const d of newArr) {
        if (d.data.length > 1) {
          d.data.sort((a: any, b: any) => {
            return b.time < a.time;
          });
          d.data1 = [];
          const tempobj = d.data[0];
          console.log(tempobj.gradename)
          tempobj.gradeName = tempobj.gradename;
          let qstr = tempobj.levelname + ': ' + tempobj.subjectname;
          if (tempobj.gradeName) {
            qstr += ' (' + tempobj.gradeName + ')';
          }
          tempobj.qList = qstr;
          d.data1.push(tempobj);
          for (let i = 1; i < d.data.length; i++) {
            let e = d.data1.length - 1;
            d.data[i].gradeName = d.data[i].gradename;
            if (d.data1[e].levelname == d.data[i].levelname && (d.data1[e].time === d.data[i].time || ((Number(d.data1[e].time.split(' - ')[0]) < Number(d.data[i].time.split(' - ')[0]))
              && Number(d.data1[e].time.split(' - ')[1]) > Number(d.data[i].time.split(' - ')[0])))) {
              let qstr = d.data[i].subjectname;
              if (d.data[i].gradeName) {
                qstr += ' (' + d.data[i].gradeName + ')';
              }
              d.data1[e].qList += ', ' + qstr;
            } else {
              let qList = d.data[i].levelname + ': ' + d.data[i].subjectname;
              if (d.data[i].gradeName) {
                qList += ' (' + d.data[i].gradeName + ')';
              }
              d.data[i].qList = qList;
              d.data1.push(d.data[i]);
            }
            console.log('>>>> ', d.data1[e].time.split(' - ')[1], d.data[i].time.split(' - ')[0])
            if (d.data1[e].time.split(' - ')[1] === d.data[i].time.split(' - ')[0]) {
              d.data[i].time = d.data1[e].time.split(' - ')[0] + ' - ' + d.data[i].time.split(' - ')[1];
              d.data1[e].time = '';
            }/*  else if ((Number(d.data1[e].time.split(' - ')[0]) < Number(d.data[i].time.split(' - ')[0]))
                && Number(d.data1[e].time.split(' - ')[1]) > Number(d.data[i].time.split(' - ')[0])) {
              d.data[i].time = d.data1[e].time.split(' - ')[0] + ' - ' + (Number(d.data[i].time.split(' - ')[1]) <= Number(d.data1[e].time.split(' - ')[1]) ? d.data1[e].time.split(' - ')[1] : d.data[i].time.split(' - ')[1]);
              d.data1[e].time = '';
            } */
             else if (d.data1[e].time === d.data[i].time && d.data1[e].levelname != d.data[i].levelname) {
              // d.data[i].time = '';
              d.data1[e].time = '';
            }
          }
          d.data = d.data1;
          console.log('>>>> ', d.data)
        } else if (d.data.length > 0) {
          if (d.data[0].subjectname) {
            d.data[0].subjectname = d.data[0].subjectname.split(',').join(', ')
          }
          let qList = d.data[0].levelname + ': ' + d.data[0].subjectname;

          if (d.data[0].gradename) {
            qList += ' (' + d.data[0].gradename + ')';
          }
          d.data[0].qList = qList;
        }
      };

      // ================================================================
      let tempTimeArr = [];
      for (let index = 0; index < newArr.length; index++) {
        const element = newArr[index];
        for (let index = 0; index < element.data.length; index++) {
          const el = element.data[index];
          if (el.time != '') {
            tempTimeArr.push(el.time.substr(el.time.length - 4))
          }

        }
      }

      let sortedtempTimeArr = tempTimeArr.sort().reverse();

      let tempFinalArr = [];

      if (sortedtempTimeArr.length > 0) {
        for (let i = 0; i < sortedtempTimeArr.length; i++) {
          const ele = sortedtempTimeArr[i];

          for (let index = 0; index < newArr.length; index++) {
            const element = newArr[index];
            for (let ind = 0; ind < element.data.length; ind++) {
              const el = element.data[ind];
              if (el.time.length >= 4) {
                if (ele == el.time.substr(el.time.length - 4))
                  tempFinalArr.push(element)
                break;
              }

            }
          }
        }
      } else {
        tempFinalArr = newArr;
      }

      tempFinalArr = [...new Set(tempFinalArr)];

      // ================================================================

      this.educatorDetailsObj.qualificationList = tempFinalArr;
    }

  }

  scrollToDiv(elemId: string) {
    let el = document.getElementById(elemId);
    if(el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 550) {
      this.isNav = true;
      this.isActiveDiv = '1'
    } else {
      this.isNav = false;
    }
    if (window.scrollY > 750) {
      this.isActiveDiv = '2'
    }
    if (window.scrollY > 950) {
      this.isActiveDiv = '3'
    }
    if (window.scrollY > 1270) {
      this.isActiveDiv = '4'
    }
    if (window.scrollY > 1470) {
      this.isActiveDiv = '5'
    }
  }


  getCommaValue(arr: any): any {
    let temp = []
    for (let [i, d] of arr.entries()) {
      temp.push(d.name)
      if (i == arr.length - 1) {
        return temp.join(', ')
      }
    }
  }

}


