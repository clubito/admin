import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private isAuthenticated: boolean = false;
  private subscription: Subscription;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.getAuthEmitter().subscribe(response => {
      this.isAuthenticated = response;
    })
    this.authService.autoLogin();
  }
}
