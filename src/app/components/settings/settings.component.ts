import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { ThemeService } from 'src/app/services/theme.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  adminAccount: User;
  themes: string[] = [];
  message: string;
  selectedValue: string = "";

  constructor(private userService: UserService, private themeService: ThemeService) { 
    this.adminAccount = userService.getUsersList().filter(x => x.appRole.toLowerCase() === "admin")[0];
    this.themes = this.themeService.getAllThemes();
    this.selectedValue = this.themeService.getCurrentTheme();
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
  changeTheme() {
    this.themeService.setCurrentTheme(this.selectedValue);
    // console.log(this.selectedValue);
  }

}
