import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface Iswal {
  background?: string; // #fff
  grow?: 'row' | 'column' | 'fullscreen' | 'false';
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question';
  input?:
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'range'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'file'
  | 'url';
  position?:
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'center'
  | 'center-start'
  | 'center-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  timer?: number;
  title?: string;
  width?: string;
  text?: string;
  html?: string;
  confirmButtonText?: string;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  cancelButtonText?: string;
}
declare let Swal: any;

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor(private route: Router) { }

  /**
   *
   * @param allowEscapeKey  Si se establece en falso, el usuario no puede descartar la ventana emergente presionando la tecla Esc. También puede pasar una función personalizada que devuelva un valor booleano, p. si desea deshabilitar la tecla Esc para el estado de carga de una ventana emergente.
   *  @param allowOutsideClick Si se establece en false , el usuario no puede descartar la ventana emergente haciendo clic fuera de ella.
También puede pasar una función personalizada que devuelva un valor booleano, por ejemplo, si desea deshabilitar los clics externos para el estado de carga de una ventana emergente.
    * @param cancelButtonText Use esto para cambiar el texto en el botón "Denegar".
   * @returns
   */
  public static swalFire(
    // title,
    // icon = "success",
    // position:  "top-end",
    // timer = 1500
    iswal: Iswal = {
      title: 'Falta titulo',
      icon: 'success',
      position: 'top-end',
      timer: 1500,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }
  ): Promise<{ isConfirmed: boolean, isDenied: boolean }> {
    return Swal.fire(iswal);
  }

  /**
   *
   * @param title
   * @param text
   * @param icon
   * @param confirmTexBtnt
   * @param cancelTextBtn
   * @returns retorna una promesa con isConfirmed como boolean
   */
  public static swalConfirmation(
    title: string,
    text: string,
    icon = 'success',
    confirmTexBtnt = 'Si, deseo eliminar',
    cancelTextBtn = 'No, cancelar'
  ): Promise<{ isConfirmed: boolean, dismiss: boolean }> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mr-1',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    return swalWithBootstrapButtons.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: confirmTexBtnt,
      cancelButtonText: cancelTextBtn,
      reverseButtons: false,
    });
  }

  public static swalFireWitButton(
    title: any,
    icon = 'success',
    position = 'top-end'
  ) {
    Swal.fire({
      position,
      icon,
      title,
      showConfirmButton: true,
    });
  }

  public static swalToast(title: string, icon = 'success', position = 'top-end', top = 50) {
    const title_html = `<div class="d-flex font-weight-bold">${title}</div>`;

    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: 'mt-5'
      },

      timerProgressBar: true,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon,
      title: title_html,
      customClass: {
        // container: "p-2",
        popup: 'p-2',
      },
    });
  }

}
