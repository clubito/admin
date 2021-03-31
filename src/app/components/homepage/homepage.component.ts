import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClubService } from 'src/app/services/club.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private clubsNum: number;
  private requestsNum: number;
  private usersNum: number;
  constructor(private clubService: ClubService, private userService: UserService) { 
    this.requestsNum = this.clubService.getClubRequests().length;
    this.clubsNum = this.clubService.getClubApproved().length;
    this.usersNum = this.userService.getUsersList().length;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  ngOnInit() {
    this.subscriptions.push(this.clubService.getClubRequestsEmitter().subscribe(response => {
      this.requestsNum = response.length;
    }))
    this.subscriptions.push(this.clubService.getClubApprovedEmitter().subscribe(response => {
      this.clubsNum = response.length;
    }))
    this.subscriptions.push(this.userService.getUsersListEmitter().subscribe(response => {
      this.usersNum = response.length;
    }))
    this.clubService.getAllClubs();
    this.userService.getAllUsers();
  }

}
