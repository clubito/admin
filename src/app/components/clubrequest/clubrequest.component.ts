import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Club } from 'src/app/models/club';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-clubrequest',
  templateUrl: './clubrequest.component.html',
  styleUrls: ['./clubrequest.component.css']
})
export class ClubrequestComponent implements OnInit, OnDestroy {
  clubRequests: Club[] = [];
  private subscription: Subscription;
  constructor(private clubService: ClubService) { 
    this.clubRequests = this.clubService.getClubRequests();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.clubService.getClubRequestsEmitter().subscribe(response => {
      this.clubRequests = response;
    })
    this.clubService.getAllClubs();
  }

  approveRequest(id: string) {
    this.clubService.approveClubRequest(id);
  }

  rejectRequest(id: string) {
    this.clubService.rejectClubRequest(id);
  }

  getClubOwner(id: string) {
    const club = this.clubRequests.find(club => club._id === id);
    const owner = club.members.find(member => member.role === "OWNER");
    return owner;
  }
}
