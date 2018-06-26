import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface myData {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInStatus = false;

  constructor(private http: HttpClient) { }

  userDetails(username, password) {
    return this.http.post<myData>('api/login', {
      username,
      password
    },{
      withCredentials: true
    });
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  getloggedInStatus() {
    return this.loggedInStatus;
  }

}
