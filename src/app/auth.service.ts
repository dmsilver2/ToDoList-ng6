import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ BehaviorSubject } from 'rxjs';


interface myData {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStatus =  new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) { }

  userDetails(username, password) {
    return this.http.post<myData>('api/login', {
      username,
      password
    },{
      withCredentials: true
    });
  }

  setLoginStatus(value: boolean) {
    this.loginStatus.next(value);
  }

  getLoginStatus() {
    return this.loginStatus.asObservable();
  }

}
