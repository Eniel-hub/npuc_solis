import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BackgroundComponent } from './components/background/background.component';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { SchoolComponent } from './components/school/school.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ArrowComponent } from './components/arrow/arrow.component';
import { SchoolModalComponent } from './components/school-modal/school-modal.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { Page404Component } from './components/page404/page404.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PolicyComponent } from './components/policy/policy.component';
import { RegistrationComponent } from './components/registration/registration.component';

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
    SchoolModalComponent,
    AboutUsComponent,
    Page404Component,
    DashboardComponent,
    LogoutComponent,
    PolicyComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
