import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { catchError, EMPTY, forkJoin, Observable, of } from 'rxjs';
import { MethodsHttpService } from '../services/methods-http.service';
import { StorageService } from '../services/storage.service';
import { SwalService } from '../services/swal.service';

@Injectable({
  providedIn: 'root'
})
export class MainResolver implements Resolve<boolean> {
  constructor(
    private methodsHttp: MethodsHttpService,
    // private spinner: NgxSpinnerService,
    private route: Router,
    private storage: StorageService,
    private active_route: ActivatedRoute
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> {
    return forkJoin(
      {
        permissionsRolesAndVersion: this.methodsHttp.methodGet('user/permissions-roles'),
        preferences: this.methodsHttp.methodGet('user/preferences/ajax'),
        notifications: this.methodsHttp.methodGet('notifications/ajax'),
      }
    ).pipe(
      catchError((err) => {
        console.log(err);
        SwalService.swalFire({
          position: 'center',
          title: 'Error al cargar datos',
          text: 'Recargué la pagina o vuelva a iniciar sesión, en caso de no funcionar contacte al administrador del sistema',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'Recargar',
          showCancelButton: true,
          cancelButtonText: 'Cerrar sesión',
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed){
            window.location.reload()
          } else {
            this.storage.logout();
          }
        })
        return EMPTY;
      })
    );
  }
}
