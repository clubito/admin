import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authMessageEmitter = new Subject<string>();
  private authEmitter = new Subject<any>();
  private token: string = null;
  private isAuthenticated: boolean;
  constructor(private http: HttpClient) { 
  }

  login(email: string, password: string) {
      this.http.post<any>(BACKEND_URL + "/login", {email, password}).subscribe(response => {
      const token: string = response.token;
      localStorage.setItem("token", token);
      this.token = token;
      this.isAuthenticated = true;
      this.authEmitter.next(true);
    }, err => {
      // console.log(err);
      this.authMessageEmitter.next(err.error.error);
      this.authEmitter.next(false);
    })
  }

  autoLogin() {
    const token = localStorage.getItem("token");
    if (token != null) {
      this.token = token;
      this.isAuthenticated = true;
      this.authEmitter.next(true);
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.isAuthenticated = false;
    this.token = null;
    this.authEmitter.next(false);
  }

  getToken() {
    return this.token;
  }

  getAuthMessageEmitter(){
    return this.authMessageEmitter.asObservable();
  }

  getAuthEmitter() {
    return this.authEmitter.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
}
