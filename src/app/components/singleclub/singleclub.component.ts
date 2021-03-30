import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Club } from 'src/app/models/club';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-singleclub',
  templateUrl: './singleclub.component.html',
  styleUrls: ['./singleclub.component.css']
})
export class SingleclubComponent implements OnInit, OnDestroy {
  private clubName: string;
  private singleClub: Club;
  private subscription: Subscription;
  constructor(private route: ActivatedRoute, private clubService: ClubService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("name")) {
        this.clubName = paramMap.get("name");
        this.singleClub = this.clubService.getClubApprovedByName(this.clubName);

        // also, send a new request to the backend to check for any update to the current club
        this.subscription = this.clubService.getClubApprovedEmitter().subscribe(response => {
          this.singleClub = this.clubService.getClubApprovedByName(this.clubName);
        })
      }
    })
    this.clubService.getAllClubs();
  }

  deleteClub() {
    this.clubService.deleteClub(this.singleClub._id);
  }

  undeleteClub() {
    this.clubService.undeleteClub(this.singleClub._id);
  }

  getStatus() {
    return this.singleClub.deleted.isDeleted === true ? "Deleted" : "OK"
  }
}
