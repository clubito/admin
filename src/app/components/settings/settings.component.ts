import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private adminAccount: User;
  private message: string;

  constructor(private userService: UserService) { 
    this.adminAccount = userService.getUsersList().filter(x => x.appRole.toLowerCase() === "admin")[0];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  ngOnInit() {
    this.subscriptions.push(this.userService.getUsersListEmitter().subscribe(x => {
      this.adminAccount = this.userService.getUsersList().filter(x => x.appRole.toLowerCase() === "admin")[0];
    }));
    this.subscriptions.push(this.userService.getNotificationEmitter().subscribe(res => {
      this.message = res.message;
    }))
    
    this.userService.getAllUsers();
  }

  submitSettings() {
    this.userService.editAdminInfo(this.adminAccount);
  }

}
