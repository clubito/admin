import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttachSession } from 'protractor/built/driverProviders';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isError } from 'util';
import { User } from '../models/user';
import { ClubService } from './club.service';

const BACKEND_URL = `${environment.apiUrl}/users`
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersListEmitter: Subject<User[]> = new Subject<User[]>();
  private usersList: User[] = [];
  constructor(private http: HttpClient, private clubService: ClubService) { }

  getAllUsers() {
    this.http.get<User[]>(BACKEND_URL).subscribe(response => {
      this.usersList = response;
      this.usersListEmitter.next(this.usersList);
    }, err => {
      console.log(err.error.error);
    })
  }

  getUsersListEmitter() {
    return this.usersListEmitter.asObservable();
  }

  getUsersList() {
    return this.usersList;
  }

  banUser(id: string) {
    this.http.post<any>(BACKEND_URL + "/ban", {id}).subscribe(() => {
      const user = this.getUserById(id);
      const copyClubList = [...this.clubService.getClubApproved()];
      user.clubs.forEach(club => {
        const index = this.clubService.getClubApproved().findIndex(x => x._id === club.club._id);
        if (index !== -1) {
          copyClubList[index].members = (copyClubList[index].members as any[]).filter(item => item.member._id !== user._id);
          copyClubList[index].joinRequests = (copyClubList[index].joinRequests as any[]).filter(item => item.user._id !== user._id);
        }
      })
      user.banned = true;
      this.clubService.setClubApproved(copyClubList);
      console.log(this.usersList);
      this.usersListEmitter.next(this.usersList);
    }, err => {
      console.log(err.error.error);
    })
  }

  unbanUser(id: string) {
    this.http.post<any>(BACKEND_URL + "/unban", {id}).subscribe(() => {
      const user = this.getUserById(id);
      const copyClubList = [...this.clubService.getClubApproved()];
      user.clubs.forEach(userClub => {
        const index = this.clubService.getClubApproved().findIndex(x => x._id === userClub.club._id);
        if (index !== -1) {
          copyClubList[index].members.push({role: userClub.role, member: user});
        }
      })
      user.joinRequests.forEach(userClub => {
        const index = this.clubService.getClubApproved().findIndex(x => x._id === userClub.club._id);
        if (index !== -1) {
          copyClubList[index].joinRequests.push({user: user, status: userClub.status, requestedAt: userClub.requestedAt});
        }
      })
      user.banned = false;
      this.clubService.setClubApproved(copyClubList);
      this.usersListEmitter.next(this.usersList);
    }, err => {
      console.log(err.error.error);
    })
  }

  deleteUser(id: string) {
    this.http.post<any>(BACKEND_URL + "/delete", {id}).subscribe(() => {
      const user = this.getUserById(id);
      const copyClubList = [...this.clubService.getClubApproved()];
      user.clubs.forEach(userClub => {
        const index = this.clubService.getClubApproved().findIndex(x => x._id === userClub.club._id);
        if (index !== -1) {
          copyClubList[index].members = (copyClubList[index].members as any[]).filter(item => item.member._id !== user._id);
          copyClubList[index].joinRequests = (copyClubList[index].joinRequests as any[]).filter(item => item.user._id !== user._id);
        }
      })
      user.joinRequests.forEach(userClub => {
        const index = this.clubService.getClubApproved().findIndex(x => x._id === userClub.club._id);
        if (index !== -1) {
          copyClubList[index].members = (copyClubList[index].members as any[]).filter(item => item.member._id !== user._id);
          copyClubList[index].joinRequests = (copyClubList[index].joinRequests as any[]).filter(item => item.user._id !== user._id);
        }
      })
      this.clubService.setClubApproved(copyClubList);
      // remove user from the array
      this.usersList = this.usersList.filter(x => x._id !== user._id);
      this.usersListEmitter.next(this.usersList);
    }, err => {
      console.log(err.error.error);
    })
  }

  getUserById(id: string) {
    return this.usersList.find(user => user._id === id);
  }

  searchUser(name: string) {
    const resultByName = this.usersList.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    const resultByEmail = this.usersList.filter(user => user.email.toLowerCase().includes(name.toLowerCase()));
    const combineResult = resultByName.concat(resultByEmail.filter((item) => resultByName.indexOf(item) < 0)) // to get unique user list
    this.usersListEmitter.next(combineResult);
  }
}
