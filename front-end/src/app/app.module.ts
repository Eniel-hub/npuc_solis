import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { ArrowComponent } from './components/arrow/arrow.component';
import { AlertComponent } from './components/alert/alert.component';
import { HeaderComponent } from './components/header/header.component';
import { SchoolComponent } from './components/school/school.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PolicyComponent } from './components/policy/policy.component';
import { Page404Component } from './components/page404/page404.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BackgroundComponent } from './components/background/background.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';

import { globalStudent } from './global.student';
import { LoaderComponent } from './components/loader/loader.component';
import { DeleteComponent } from './components/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BackgroundComponent,
    HeaderComponent,
    UserComponent,
    SchoolComponent,
    MenuComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ArrowComponent,
    AboutUsComponent,
    Page404Component,
    DashboardComponent,
    LogoutComponent,
    PolicyComponent,
    RegistrationComponent,
    UserProfileComponent,
    EnrollmentComponent,
    AlertComponent,
    StudentProfileComponent,
    UpdatePasswordComponent,
    ConfirmationComponent,
    LoaderComponent,
    DeleteComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
  ],
  providers: [globalStudent],
  bootstrap: [AppComponent],
})
export class AppModule {}
