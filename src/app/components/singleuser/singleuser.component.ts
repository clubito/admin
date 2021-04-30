import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.css']
})
export class SingleuserComponent implements OnInit, OnDestroy {
  private id: string;
  singleUser: User;
  userClubs: any[] = [];
  private subscription: Subscription;
  constructor(private route: ActivatedRoute, private userService: UserService, private location: Location) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.id = paramMap.get("id");
        this.singleUser = this.userService.getUserById(this.id);

        this.subscription = this.userService.getUsersListEmitter().subscribe(response => {
          this.singleUser = this.userService.getUserById(this.id);
        })
      }
    })
    this.userService.getAllUsers();
  }

  getStatus() {
    if (this.singleUser.deleted.isDeleted === true ) {
      return "DELETE";
    }
    if (this.singleUser.banned === true) {
      return "BAN"; 
    } else {
      return "ACTIVE"
    }
  }

  banUser() {
    this.userService.banUser(this.singleUser._id);
  }

  unbanUser() {
    this.userService.unbanUser(this.singleUser._id);
  }

  deleteUser() {
    this.userService.deleteUser(this.singleUser._id);
    // this.location.back();
  }

  undeleteUser() {
    this.userService.undeleteUser(this.singleUser._id);
  }
}
