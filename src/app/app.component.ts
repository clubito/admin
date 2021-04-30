import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  themeUrl: string;
  constructor(private authService: AuthService, private themeService: ThemeService) {
    this.themeUrl = this.themeService.getCurrentThemeUrl();
  }

  ngOnInit(): void {
    this.authService.getAuthEmitter().subscribe(response => {
      this.isAuthenticated = response;
    })
    this.authService.autoLogin();
    this.themeService.getThemeEmitter().subscribe(themeName => {
      this.themeUrl = this.themeService.getThemeUrlByName(themeName);
    })
  }

  getTheme() {
    if (this.themeUrl === "") {
      return "";
    }
    return `url(${this.themeUrl})`;
  }
}
