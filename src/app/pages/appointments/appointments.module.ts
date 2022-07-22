import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentsRoutingRoutes } from './appointments.routing';

@NgModule({
  imports: [
    CommonModule,
    AppointmentsRoutingRoutes
  ],
  declarations: [AppointmentsComponent]
})
export class AppointmentsModule { }
