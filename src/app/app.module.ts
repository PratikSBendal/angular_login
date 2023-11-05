import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { JwtInterceptor, ErrorInterceptor } from './__helper/index_barrel';
import { HomeComponent } from './home/HomeComponent';
import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account/register.component';
import { AppRoutingModule } from './app-routing.module';
import { fakeBackendProvider } from './__helper/fakebackend';
import { AlertComponent } from './__componnet/alert.component';



@NgModule({
    imports: [BrowserModule,
             AppRoutingModule,
             HttpClientModule,
             AppRoutingModule,ReactiveFormsModule],
    declarations: [AppComponent, 
                  HomeComponent, 
                  LoginComponent, 
                  RegisterComponent,
                  AlertComponent],
    providers:[ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        fakeBackendProvider],
    bootstrap: [AppComponent],
})
export class AppModule { }  