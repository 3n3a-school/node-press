import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, shareReplay } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Jwt } from '../models/jwt';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';

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
    const authExpiry = localStorage.getItem("nodepress-expires")
    console.log(`Token expires in ${dayjs(authExpiry).diff(dayjs(), 'minutes')}m`);
    
    return authKey != null && authKey != "" && dayjs(authExpiry).isAfter(dayjs())
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
    localStorage.removeItem("nodepress-expires")
    this.router.navigateByUrl("/login")
  }

  private setSession(authRes: Jwt) {    
    localStorage.setItem("nodepress-auth", authRes.access_token)
    localStorage.setItem("nodepress-expires", authRes.expires)
  }
}
