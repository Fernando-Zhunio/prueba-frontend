import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './Authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AuthenticationComponent, LoginComponent, RegisterComponent]
})
export class AuthenticationModule { }
