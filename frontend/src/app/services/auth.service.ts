import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, retry, tap, shareReplay } from 'rxjs/operators';

import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Jwt } from '../models/jwt';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  BACKEND_BASE_URL = "http://localhost:3000"
  token?: Jwt

  isLoggedIn = new BehaviorSubject<boolean>(false)

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn.next(this.isLoggedIn$())
  }

  isLoggedIn$() {
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
    this.recheckLoggedIn()
  }
  
  recheckLoggedIn() {
    this.isLoggedIn.next(this.isLoggedIn$())
  }

  private setSession(authRes: Jwt) {    
    localStorage.setItem("nodepress-auth", authRes.access_token)
    localStorage.setItem("nodepress-expires", authRes.expires)
  }
}
