import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private notiEmitter: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  postAnnouncement(message: string) {
    this.http.post(BACKEND_URL + "/announcement", {message}).subscribe(res => {
      this.notiEmitter.next(true);
    }, err => {
      console.log(err.error.error);
      this.notiEmitter.next(false);
    })
  }

  getNotiEmitter() {
    return this.notiEmitter.asObservable();
  }
}
