import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MethodsHttpService } from 'src/app/services/methods-http.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

  constructor(private methodsHttp: MethodsHttpService) { }
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    name: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });
  hide = true;
  isLoading = false;

  saveInServer() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.isLoading = true;
      this.methodsHttp.methodPost('register', this.form.value).subscribe(
        {
          next: (data) => {
            this.isLoading = false;
            console.log(data);
            // SwalService.success('Login correcto');
          }, error: (err) => {
            this.isLoading = false;
            console.log(err);
            // SwalService.error(err.error.message);
          }
        }
      );
    } else {
      SwalService.swalFire({title: 'Error', text: 'Formulario invalido', icon: 'error'});
    }
  }

}
