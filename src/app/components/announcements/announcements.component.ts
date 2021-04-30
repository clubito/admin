import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit, OnDestroy {

  message: string = "";
  result: string;
  private subscription: Subscription;

  constructor(private announcementService: AnnouncementService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.announcementService.getNotiEmitter().subscribe(result => {
      if(result) {
        this.result = "Send announcement successfully";
      }
    })
  }

  submitAnnouncement() {
    if (this.message != "") {
      this.announcementService.postAnnouncement(this.message);
      this.message = "";
    }
  }

}
