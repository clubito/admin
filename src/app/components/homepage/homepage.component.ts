import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private clubsNum: number;
  private requestsNum: number;
  constructor(private clubService: ClubService) { 
    this.requestsNum = this.clubService.getClubRequests().length;
    this.clubsNum = this.clubService.getClubApproved().length;
  }

  ngOnInit() {
    this.subscriptions.push(this.clubService.getClubRequestsEmitter().subscribe(response => {
      this.requestsNum = response.length;
    }))
    this.subscriptions.push(this.clubService.getClubApprovedEmitter().subscribe(response => {
      this.clubsNum = response.length;
    }))
    this.clubService.getAllClubs();
  }

}
