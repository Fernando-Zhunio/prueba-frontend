import { Component, OnInit } from '@angular/core';
import { MethodsHttpService } from 'src/app/services/methods-http.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  constructor(private methodsHttp: MethodsHttpService) { }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments() {
    this.methodsHttp.methodGet('appointments').subscribe(
      {
        next: (data) => {
          console.log(data);
        }
      }
    );
  }

}
