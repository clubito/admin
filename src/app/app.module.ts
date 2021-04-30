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
import { SingleclubComponent } from './components/singleclub/singleclub.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClubrequestComponent } from './components/clubrequest/clubrequest.component';
import { AlluserComponent } from './components/alluser/alluser.component';
import { SingleuserComponent } from './components/singleuser/singleuser.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomepageComponent,
    AllclubComponent,
    SingleclubComponent,
    NavbarComponent,
    ClubrequestComponent,
    AlluserComponent,
    SingleuserComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
