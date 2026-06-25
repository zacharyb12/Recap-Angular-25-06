import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Authservice } from '../services/auth-services/authservice';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

const authService = inject(Authservice)
const token = localStorage.getItem("token")

if(token && authService.isTokenValid()){
  const clonedReq = req.clone({
    setHeaders : {
      Authorization:`Bearer ${token}`
    }
  })

  return next(clonedReq)
}

  return next(req);
};
