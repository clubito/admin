import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private requestsNum: number;

  constructor(private authService: AuthService, private clubService: ClubService, private router: Router) {
    this.requestsNum = this.clubService.getClubRequests().length;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.clubService.getClubRequestsEmitter().subscribe(response => {
      this.requestsNum = response.length;
    }) 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"])
  }
}
