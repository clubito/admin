import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AllclubComponent } from './components/allclub/allclub.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomepageComponent,
    AllclubComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
