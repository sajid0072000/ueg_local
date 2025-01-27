import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from "./common.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor {

  constructor(private common: CommonService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.common.getToken() !== null) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.common.getToken()}`,
        },
      });
    }
    let foo: any = {};
    if (request.method === 'POST') {
      if (request.body instanceof FormData) {
      } else {
        foo.sessionid = this.common.getSessionId();
        if (this.common.getUserId()) {
          foo = { loginUserId: this.common.getUserId(), roleid: this.common.getRoleId() };
        }
        let req: any = {};
        try {
          req = JSON.parse(request.body)
        } catch (e) {
          req = request.body;
        }
        if (req.userId === undefined) {
          foo['userId'] = this.common.getUserId()
        }

        let body = {};
        /*if(request.url?.indexOf(this.config.CMS_URL) === -1
            && request.url?.indexOf(this.config.IFIX_URL) === -1) {

        } else {
          body = {...req, ...foo}
        }*/
        body = this.common.encryptPayload({ ...req, ...foo })
        request = request.clone({
          body: { ...body }
        })
      }
    }
    return next.handle(request).pipe(map((event1: HttpEvent<any>): any => {
      let event: any = event1;
      if (event1 instanceof HttpResponse) {
        try {
          /*Response body decrypted here*/
          const obj = this.common.decryptPayload(event.body);
          event.body = {};
          for (const key of Object.keys(obj)) {
            event.body[key] = obj[key]
          }
          /* Response body decryption end here*/
        } catch (e) {
          console.log(e)
        }
        if (event.body.status && event.body.status === 498) {
          this.common.clearUserData();
          this.router.navigate(['/']);
        } else {
          if (event.body.response) {
            event.body.response = this.common.decryptPayload(event.body.response)
          }
        }
      }
      return event
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400) {
          // redirect to the login route
          // or show a modal
          console.log('ERROR');
          // window.location.href = this.messageService.API_ROOT;
        }
      }
    }));
  }
}
