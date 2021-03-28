import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  private authMessageListener: Subscription;
  private authListener: Subscription;
  private errorMessage: string;
  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit() {
    this.authMessageListener = this.authService
    .getAuthMessageEmitter()
    .subscribe(message => {
      this.errorMessage = message;
    });

    this.authListener = this.authService.getAuthEmitter().subscribe(result => {
      if(result) {
        this.router.navigate(["/"]);
      }
    })
  }

  ngOnDestroy(): void {
    this.authMessageListener.unsubscribe();
    this.authListener.unsubscribe();
  }
  
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password);
  }
}
