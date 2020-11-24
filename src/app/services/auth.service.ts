import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(user: any) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }

    return this.http.post(
      `${environment.apiFb}signInWithPassword?key=sukey`,
      authData
    );
  }

  signIn(user: any) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }

    return this.http.post(
      `${environment.apiFb}signUp?key=sukey`,
      authData
    );
  }


}
