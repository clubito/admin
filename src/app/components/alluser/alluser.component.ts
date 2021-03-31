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
  private itemPerRow: number = 4;
  private isActivePage: boolean = true;
  private subscription: Subscription;
  private userList: User[] = [];
  constructor(private userService: UserService) {
    this.userList = this.userService.getUsersList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.userService.getUsersListEmitter().subscribe(response => {
      this.userList = response;
      console.log(this.userList);
    })
    this.userService.getAllUsers();
  }

  private toggleActivePage(activePage: boolean) {
    this.isActivePage = activePage;
    console.log(this.isActivePage);
  }

  getActiveUsers() {
    return this.userList.filter(x => x.banned === false);
  }

  getBanUsers() {
    return this.userList.filter(x => x.banned === true);
  }

  private getTuple(array: User[], size: number) {
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


}
