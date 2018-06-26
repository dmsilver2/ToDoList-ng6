import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'To Do List';
  loggedIn: boolean;
  constructor(private auth: AuthService) { }

  ngAfterViewChecked() {
    this.loggedIn = this.auth.getloggedInStatus()
  }
}
