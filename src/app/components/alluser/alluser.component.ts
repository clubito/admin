import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css']
})
export class AlluserComponent implements OnInit, OnDestroy {
  itemPerRow: number = 4;
  isActivePage: boolean = true;
  userList: User[] = [];
  searchName: string;
  private subscription: Subscription;
  constructor(private userService: UserService) {
    this.userList = this.userService.getUsersList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.userService.getUsersListEmitter().subscribe(response => {
      this.userList = response;
    })
    this.userService.getAllUsers();
  }

  toggleActivePage(activePage: boolean) {
    this.isActivePage = activePage;
  }

  getActiveUsers() {
    return this.userList.filter(x => x.banned === false && x.deleted.isDeleted === false);
  }

  getBanUsers() {
    return this.userList.filter(x => x.banned === true && x.deleted.isDeleted === false);
  }

  getDeletedUsers() {
    return this.userList.filter(x => x.deleted.isDeleted === true);
  }

  getTuple(array: User[], size: number) {
    const result: User[][] = [];
    let temp: User[] = [];
    for (let item of array) {
      if (temp.length >= size) {
        result.push(temp);
        temp = [];
      }
      temp.push(item);
    }
    if (temp.length != 0) {
      result.push(temp);
    }
    return result;
  }

  search() {
    this.userService.searchUser(this.searchName);
  }


}
