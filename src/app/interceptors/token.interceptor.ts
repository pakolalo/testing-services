import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpEvent
 } from "@angular/common/http";
 import { inject } from "@angular/core";
 import { Observable } from "rxjs";
 import { TokenService } from './../services/token.service';


export const tokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
):Observable<HttpEvent<unknown>> => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  if(token) {
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(authReq)
  }

  return next(request);


  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   request = this.addToken(request);
  //   return next.handle(request);
  // }

  // private addToken(request: HttpRequest<unknown>) {
  //   const token = this.tokenService.getToken();
  //   if (token) {
  //     const authReq = request.clone({
  //       headers: request.headers.set('Authorization', `Bearer ${token}`)
  //     });
  //     return authReq;
  //   }
  //   return request;
  // }
}
