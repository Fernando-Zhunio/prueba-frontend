import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { MainResolver } from './guards/main.resolver';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/Authentication/Authentication.module').then(m => m.AuthenticationModule),
    data: {
      guard: 'guest'
    },
    canActivate: [GuestGuard]
  },
  {
    path: 'admin',
    data: {
      guard: 'auth'
    },
    children: [
      {
        path: 'appointments',
        loadChildren: () => import('./pages/appointments/appointments.module').then(m => m.AppointmentsModule),
        data: {
          guard: 'api'
        },
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ],
    canActivate: [AuthGuard],
    resolve: { response: MainResolver }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
