import { NgModule } from "@angular/core";
import { Routes } from '@angular/router';
import { RouterModule } from "@angular/router";

import { HomeComponent } from './home/HomeComponent';

import { LoginComponent} from "./account/login.component";

import { RegisterComponent }from "./account/register.component";

import { AuthGuard } from './__helper/auth.guard';
import { NgModel } from "@angular/forms";

const routes : Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    {path: '', component: HomeComponent},
    {path: 'account/login', component:LoginComponent},
    {path: 'account/register', component:RegisterComponent},
    {path: '**', redirectTo: ''}
 ];

 @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
 })
export class AppRoutingModule{}
