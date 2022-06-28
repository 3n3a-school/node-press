import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, shareReplay } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Jwt } from '../models/jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BACKEND_BASE_URL = "http://localhost:3000"
  token?: Jwt

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  isLoggedIn() {
    const authKey = localStorage.getItem("nodepress-auth")
    return authKey != null && authKey != ""
  }

  login(user: User) {
    return this.http.post<Jwt>(`${this.BACKEND_BASE_URL}/auth/login`, user)
      .pipe(
        tap(this.setSession),
        shareReplay()
      )
    }

  register(user: User) {
    return this.http.post<Jwt>(`${this.BACKEND_BASE_URL}/auth/register`, user)
      .pipe(
        tap(this.setSession),
        shareReplay()
      )
  }

  logout() {
    localStorage.removeItem("nodepress-auth")
    this.router.navigateByUrl("/login")
  }

  private setSession(authRes: Jwt) {    
    localStorage.setItem("nodepress-auth", authRes.access_token)
  }
}
