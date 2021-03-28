import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Club } from '../models/club';

const BACKEND_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private clubList: [Club];
  private clubEmitter = new Subject<[Club]>();
  constructor(private http: HttpClient) { }

  getAllClubs(){
    this.http.get<[Club]>(BACKEND_URL + "/clubs").subscribe(response => {
      this.clubList = response;
      this.clubEmitter.next(this.clubList);
    }, err => {
      console.log(err);
    })
  }

  getClubEmitter() {
    return this.clubEmitter.asObservable();
  }
}
