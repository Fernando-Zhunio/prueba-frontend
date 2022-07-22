import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomInterceptor } from './class/interceptor';
import { StorageService } from './services/storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


function getPermissionAndVersionServer(st: StorageService) {
  return () => {
    return null;
  };
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot(),
    MatSnackBarModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: getPermissionAndVersionServer,
      multi: true,
      deps: [StorageService, HttpClientModule, NgxPermissionsService ]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true,
      deps: [StorageService, MatSnackBar, Router]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
