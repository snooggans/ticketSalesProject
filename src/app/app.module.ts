import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import {TourListComponent} from "./components/tour-list/tour-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TourService} from "./services/tour.service";
import { OrderFormComponent } from './components/order-form/order-form.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {RestInterceptorsService} from "./services/rest-interceptors.service";
import { EditTourComponent } from './components/edit-tour/edit-tour.component';
import {InputTextareaModule} from "primeng/inputtextarea";


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    UserInfoComponent,
    ChangePasswordComponent,
    EditTourComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    MessagesModule,
    InputTextareaModule
  ],
  providers: [TourService,
    {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi: true}
  ],
	exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
