import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SocketioService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent implements OnInit {
  form: FormGroup;
  users$: Observable<{username: string, socketId: string}[]>;
  constructor(
    private fb: FormBuilder,
    private socketService: SocketioService
  ) {
    this.form =  this.fb.group({
      username: [''],
      password: [''],
    });

    this.users$ = this.socketService.getUsers();

  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(console.log);
  }

  register() {
    console.log(this.form.value);
    console.log(this.socketService.socketId);
    this.socketService.emit('register', {...this.form.value, socketId: this.socketService.socketId});
  }

  login() {
    console.log(this.form.value);
    this.socketService.emit('login', this.form.value);
  }

  getUsers() {
    return this.socketService.getUsers();
  }

}
