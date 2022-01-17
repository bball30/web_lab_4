import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { AuthComponent } from './routes/auth/auth.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './routes/register/register.component';
import { MainComponent } from './routes/main/main.component';
import {AppRoutingModule} from "./app-routing.module";
import { PointFormComponent } from './components/point-form/point-form.component';
import { PointTableComponent } from './components/point-table/point-table.component';
import { PointAreaComponent } from './components/point-area/point-area.component';
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthService} from "./services/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    MainComponent,
    PointFormComponent,
    PointTableComponent,
    PointAreaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
