import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { Page404Component } from './components/page404/page404.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PolicyComponent } from './components/policy/policy.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'home', component : HomeComponent},
  {path: 'policy', component : PolicyComponent},
  {path: 'about-us', component : AboutUsComponent},
  {path: 'user/login', component : LoginComponent},
  {path: 'user/logout', component : LogoutComponent},
  {path: 'user/register', component : RegisterComponent},
  {path: 'student/dashboard', component : DashboardComponent},
  {path: '**', component : Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
