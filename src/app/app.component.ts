import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'To Do List';
  loginStatus: boolean;
  constructor(private auth: AuthService, private user: UserService) {
    this.auth.getLoginStatus().subscribe( val => this.loginStatus = val);
  }

  ngOnInit() {
    this.user.isLoggedIn().subscribe( res => {
      if(res.status){
        this.auth.setLoginStatus(true);
      }
    });
  }
}
