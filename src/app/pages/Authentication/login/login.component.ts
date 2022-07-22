import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Session } from 'src/app/class/session';
import { User } from 'src/app/class/user';
import { MethodsHttpService } from 'src/app/services/methods-http.service';
import { StorageService } from 'src/app/services/storage.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private methodsHttp: MethodsHttpService, private storage: StorageService) { }
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });
  hide = true;
  isLoading = false;
  ngOnInit() {
  }

  saveInServer() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.isLoading = true;
      this.methodsHttp.methodPost<{accessToken: string,user: any}>('login', this.form.value).subscribe(
        {
          next: (res) => {
            this.isLoading = false;
            console.log(res);
            const {name, email, id} = res.data.user;
            const user = new User(id, name, email);
            const session = new Session(res.data.accessToken, user);
            this.storage.setCurrentSession(session);
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
