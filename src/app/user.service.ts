import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface isLoggedIn {
  status: boolean
}

interface logoutStatus {
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('/api/isloggedin');
  }

  logout() {
    return this.http.get<logoutStatus>('/api/logout');
  }
}
