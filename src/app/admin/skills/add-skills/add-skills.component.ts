import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.css']
})
export class AddSkillsComponent {
  @ViewChild('deleteModal') deleteModal: any;

  name: any = ""
  skillId: any = ''

  skillErr: any = ''

  constructor(
    private router: Router,
    private restapi: RestApiService,
    public common: CommonService,
    private modalService: NgbModal,
    private notifierService: NotifierService,
    private actroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.skillId = this.actroute.snapshot.params['id'];
    if (this.skillId == 0) {
      this.skillId = null
    }
    if (this.skillId) {
      let data = this.common.sheardData
      if(!data){
        this.router.navigate(["admin/app/skills"]);
      }
      this.name = data.Name
    }
  }

  changeSkillName(): any {
    this.skillErr = ''

  }

  add(): any {
    this.skillErr = ''
    let err = 0

    if (this.name == "" || this.name == null || this.name == undefined) {
      this.skillErr = "Skill name required";
      err++;
    }

    if (err == 0) {
      const data = {
        "name": this.name
      }
      this.common.loaderStart()
      this.restapi.addSkill(data).subscribe((result: any) => {
        this.common.loaderEnd()
        if (result.success) {
          this.notifierService.notify('success', result.message);
          this.resetForm()
        } else {
          this.notifierService.notify('error', result.message);
        }
      })
    }
  }

  edit(): any {

    this.skillErr = ''
    let err = 0

    if (this.name == "" || this.name == null || this.name == undefined) {
      this.skillErr = "Skill name required";
      err++;
    }

    if (err == 0) {
      const data = {
        "id": this.skillId,
        "name": this.name
      }
      this.common.loaderStart()
      this.restapi.updateSkill(data).subscribe((result: any) => {
        this.common.loaderEnd()
        if (result.success) {
          this.notifierService.notify('success', result.message);
          this.resetForm()
        } else {
          this.notifierService.notify('error', result.message);
        }
      })
    }

  }

  resetForm(): any {
    this.name = ''
    this.router.navigate(["admin/app/skills"]);
  }

  goBack() {
    this.router.navigate(["admin/app/skills"]);
  }

  closeModal(): any {
    this.modalService.dismissAll();
  }

  delete(): any {
    const data = {
      "id": this.skillId
    }
    this.common.loaderStart();
    this.restapi.deleteSkill(data).subscribe((res: any) => {
      this.common.loaderEnd();
      console.log(res.response);
      if (res.success) {
        this.notifierService.notify('success', res.message);
        this.resetForm()
        this.closeModal()
      } else {
        this.notifierService.notify('error', res.message);
      }
    })

  }

  onClickDelete(): any {
    this.modalService.open(this.deleteModal, { centered: true, size: 'md' });
  }

}
