import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  private authMessageListener: Subscription;
  private errorMessage: string;
  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    this.authMessageListener = this.authService
    .getAuthMessageEmitter()
    .subscribe(message => {
      this.errorMessage = message;
    });
  }

  ngOnDestroy(): void {
    this.authMessageListener.unsubscribe();
  }
  
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password);
  }

}
