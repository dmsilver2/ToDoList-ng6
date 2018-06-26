import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'To Do List';
  loginStatus: boolean;
  constructor(private auth: AuthService) {
    this.auth.getLoginStatus().subscribe( val => this.loginStatus = val);
  }
}
