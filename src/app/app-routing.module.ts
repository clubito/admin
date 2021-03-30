import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllclubComponent } from './components/allclub/allclub.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SingleclubComponent } from './components/singleclub/singleclub.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "", component: HomepageComponent, canActivate: [AuthGuard]},
  {path: "login", component: AuthComponent},
  {path: "clubs", component: AllclubComponent, canActivate: [AuthGuard]},
  {path: "clubs/:name", component: SingleclubComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
