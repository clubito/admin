import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Club } from '../models/club';

const BACKEND_URL = `${environment.apiUrl}/clubs`;
@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private clubApproved: Club[] = [];
  private clubApprovedEmitter = new Subject<Club[]>();
  
  private clubRequests: Club[] = [];
  private clubRequestsEmitter = new Subject<Club[]>();

  private clubServiceErrorEmitter = new Subject<string>();

  constructor(private http: HttpClient) { }

  getAllClubs(){
    this.http.get<Club[]>(BACKEND_URL).subscribe(response => {
      this.clubApproved = response.filter(x => x.isEnabled == true);
      this.clubApprovedEmitter.next([...this.clubApproved]);

      this.clubRequests = response.filter(x => x.isEnabled == false);
      this.clubRequestsEmitter.next([...this.clubRequests]);
    }, err => {
      console.log(err.error.error);
      this.clubServiceErrorEmitter.next(err.error.error);
    })
  }

  approveClubRequest(id: string) {
    this.http.post<any>(BACKEND_URL + "/requests/approve", {id}).subscribe(() => {
      // save the new approval club request to a variable
      const clubRequest = this.clubRequests.filter(x => x._id == id)[0];
      //remove the club from request array
      const updatedClubRequests = this.clubRequests.filter(x => x._id !== id);
      this.clubRequests = updatedClubRequests;
      //add the club to approve array
      this.clubApproved.push(clubRequest);
      
      //emit the new updates
      this.clubApprovedEmitter.next([...this.clubApproved]);
      this.clubRequestsEmitter.next([...this.clubRequests]);
    }, err => {
      console.log(err.error.error);
      this.clubServiceErrorEmitter.next(err.error.error);
    })
  }

  rejectClubRequest(id: string) {
    this.http.post<any>(BACKEND_URL + "/requests/deny", {id}).subscribe(() => {
      // delete the request from the array and update the array
      const updatedClubRequests = this.clubRequests.filter(x => x._id !== id);
      this.clubRequests = updatedClubRequests;

      // emit the new update
      this.clubRequestsEmitter.next([...this.clubRequests]);
    }, err => {
      console.log(err.error.error);
      this.clubServiceErrorEmitter.next(err.error.error);
    })
  }

  deleteClub(id: string) {
    this.http.post<any>(BACKEND_URL + "/delete", {id}).subscribe(() => {
      const copyClubApproved = [...this.clubApproved];
      const arrayIndex = copyClubApproved.findIndex(club => club._id === id);
      copyClubApproved[arrayIndex].deleted.isDeleted = true;
      copyClubApproved[arrayIndex].deleted.deletedAt = new Date(Date.now());
      this.clubApproved = copyClubApproved;

      // emit the new update
      this.clubApprovedEmitter.next(this.clubApproved);
    }, err => {
      console.log(err.error.error);
      this.clubServiceErrorEmitter.next(err.error.error);
    });
  }

  undeleteClub(id: string) {
    this.http.post<any>(BACKEND_URL + "/undelete", {id}).subscribe(() => {
      const copyClubApproved = [...this.clubApproved];
      const arrayIndex = copyClubApproved.findIndex(club => club._id === id);
      copyClubApproved[arrayIndex].deleted.deletedAt = null;
      copyClubApproved[arrayIndex].deleted.isDeleted = false;
      this.clubApproved = copyClubApproved;

      this.clubApprovedEmitter.next(this.clubApproved);
    }, err => {
      console.log(err.error.error);
      this.clubServiceErrorEmitter.next(err.error.error);
    });
  }

  setClubApproved(club: Club[]) {
    this.clubApproved = club;
    this.clubApprovedEmitter.next(this.clubApproved);
  }

  getClubApprovedByName(name: string) {
      const club: Club[] = this.clubApproved.filter(x => x.name == name);
      if (club.length == 0) {
        return null;
      }
      return club[0];
  }

  getClubRequestsEmitter() {
    return this.clubRequestsEmitter.asObservable();
  }

  getClubApprovedEmitter() {
    return this.clubApprovedEmitter.asObservable();
  }

  getClubApproved() {
    return this.clubApproved;
  }

  getClubRequests() {
    return this.clubRequests;
  }

  searchClub(clubName: string) {
    const resultApprove = this.clubApproved.filter(club => club.name.toLowerCase().includes(clubName.toLowerCase()));
    this.clubApprovedEmitter.next(resultApprove);
    const resultRequest = this.clubRequests.filter(club => club.name.toLowerCase().includes(clubName.toLowerCase()));
    this.clubRequestsEmitter.next(resultRequest);
  }

}
