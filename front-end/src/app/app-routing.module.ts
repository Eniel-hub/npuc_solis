import { DashboardStaffComponent } from './components/dashboard-staff/dashboard-staff.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ManageLevelComponent } from './components/manage-level/manage-level.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
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

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AuthGuardAdminService as IsAdmin } from './services/auth-guard.service';
import { AuthGuardStaffService as IsStaff } from './services/auth-guard.service';
import { AuthGuardStudentService as IsStudent } from './services/auth-guard.service';
import { AuthGuardNotStudentService as NotStudent } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'policy',
    component: PolicyComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'user/login',
    component: LoginComponent,
  },
  {
    path: 'user/upsw',
    component: UpdatePasswordComponent,
  },
  {
    path: 'user/logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/register',
    component: RegisterComponent,
  },
  {
    path: 'user/profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, IsStudent],
  },
  {
    path: 'student/enrollment',
    component: EnrollmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student/profile',
    component: StudentProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student/application',
    component: RegistrationComponent,
    canActivate: [AuthGuard, NotStudent],
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'staff/dashboard',
    component: DashboardStaffComponent,
    canActivate: [AuthGuard, IsStaff],
  },
  {
    path: 'admin/manage-levels',
    component: ManageLevelComponent,
    canActivate: [AuthGuard, IsAdmin],
  },
  {
    path: '**',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard, IsStudent, NotStudent, IsAdmin],
  exports: [RouterModule],
})
export class AppRoutingModule {}
