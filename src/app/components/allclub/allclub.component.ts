import { Component, OnDestroy, OnInit } from '@angular/core';
import { range, Subscription } from 'rxjs';
import { Club } from 'src/app/models/club';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-allclub',
  templateUrl: './allclub.component.html',
  styleUrls: ['./allclub.component.css']
})
export class AllclubComponent implements OnInit, OnDestroy {
  isActivePage: boolean = true;
  itemPerRow: number = 2;
  clubApproved: Club[] = [];
  searchName: string;

  private clubApprovedListener: Subscription;
  constructor(private clubService: ClubService) { 
    this.clubApproved = clubService.getClubApproved();
  }

  ngOnInit() {
    this.clubApprovedListener = this.clubService.getClubApprovedEmitter().subscribe(response => {
      this.clubApproved = response;
      // console.log(this.clubApproved);
    },
    err => {
      console.log(err)
    })
    this.clubService.getAllClubs();
  }

  ngOnDestroy(): void {
    this.clubApprovedListener.unsubscribe();
  }

  getTuple(array: Club[], size: number) {
    const result: Club[][] = [];
    let temp: Club[] = [];
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

  toggleActivePage(activePage: boolean) {
    this.isActivePage = activePage;
    // this.isActivePage ? false : true;
    console.log(this.isActivePage);
  }

  getActiveClubs() {
    return this.clubApproved.filter(club => club.deleted.isDeleted === false);
  }

  getDeletedClubs() {
    return this.clubApproved.filter(club => club.deleted.isDeleted === true);
  }

  search() {
    this.clubService.searchClub(this.searchName);
  }
}
