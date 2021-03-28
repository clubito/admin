import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Club } from 'src/app/models/club';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-allclub',
  templateUrl: './allclub.component.html',
  styleUrls: ['./allclub.component.css']
})
export class AllclubComponent implements OnInit, OnDestroy {
  private clubList: [Club];
  private clubListener: Subscription;
  constructor(private clubService: ClubService) { }

  ngOnInit() {
    this.clubService.getAllClubs();
    this.clubListener = this.clubService.getClubEmitter().subscribe(response => {
      this.clubList = response;
      console.log(this.clubList);
    })
  }

  ngOnDestroy(): void {
    this.clubListener.unsubscribe();
  }
}
