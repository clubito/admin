import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Club } from 'src/app/models/club';
import { User } from 'src/app/models/user';
import { ClubService } from 'src/app/services/club.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.css']
})
export class SingleuserComponent implements OnInit, OnDestroy {
  private id: string;
  private singleUser: User;
  private userClubs: any[] = [];
  private subscription: Subscription;
  constructor(private route: ActivatedRoute, private userService: UserService, private clubService: ClubService, private router: Router) { }

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
    return this.singleUser.banned === true ? "Ban" : "Active"
  }

  banUser() {
    this.userService.banUser(this.singleUser._id);
  }

  unbanUser() {
    this.userService.unbanUser(this.singleUser._id);
  }

  deleteUser() {
    this.userService.deleteUser(this.singleUser._id);
    this.router.navigate(["/users"])
  }
}
