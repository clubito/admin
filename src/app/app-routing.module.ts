import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllclubComponent } from './components/allclub/allclub.component';
import { AlluserComponent } from './components/alluser/alluser.component';
import { AuthComponent } from './components/auth/auth.component';
import { ClubrequestComponent } from './components/clubrequest/clubrequest.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SingleclubComponent } from './components/singleclub/singleclub.component';
import { SingleuserComponent } from './components/singleuser/singleuser.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "", component: HomepageComponent, canActivate: [AuthGuard]},
  {path: "login", component: AuthComponent},
  {path: "clubs", component: AllclubComponent, canActivate: [AuthGuard]},
  {path: "clubs/requests", component: ClubrequestComponent, canActivate: [AuthGuard]},
  {path: "clubs/:name", component: SingleclubComponent, canActivate: [AuthGuard]},
  {path: "users", component: AlluserComponent, canActivate: [AuthGuard]},
  {path: "users/:id", component: SingleuserComponent, canActivate: [AuthGuard]},
  {path: "settings", component: SettingsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
