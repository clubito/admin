  
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";
  
import { AuthService } from "../services/auth.service";
  
@Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      //now all the request make from client will have the token of the user
      const token = this.authService.getToken();
      const request = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });
      return next.handle(request);
    }
}