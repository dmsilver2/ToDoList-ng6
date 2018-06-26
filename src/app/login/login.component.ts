import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault()
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;

    return this.auth.userDetails(username, password).subscribe(
      res => {
        if(res.success) {
          this.auth.setLoginStatus(true);
          this.router.navigate(['/'])
        }
        else {
          window.alert(res.message);
        }
      }
    );
  }

}
