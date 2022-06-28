import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Jwt } from '../models/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  STORE_KEY = "nodepress-auth"
  BACKEND_BASE_URL = "https://3000-3n3aschool-nodepress-honugtyedg2.ws-eu47.gitpod.io"
  token?: Jwt

  constructor(
    private http: HttpClient
  ) { }

  isLoggedIn() {
    const authKey = localStorage.getItem(this.STORE_KEY)
    return authKey != null && authKey != ""
  }

  login(user: User) {
    
    this.http.post<Jwt>(`${this.BACKEND_BASE_URL}/auth/login`, user)
      .subscribe((token: Jwt) => this.token = {...token})

    if (this.token?.access_token && user.username != "" && user.password != "") {
      localStorage.setItem(this.STORE_KEY, this.token.access_token)
    } else {
      localStorage.setItem(this.STORE_KEY, "")
    }
    return this.token?.access_token != undefined
  }

  register(user: User) {
    // TODO: implement register function
    const success = true
    const token = "ldfjdlfk"
    if (success && user.username != "" && user.password != "") {
      localStorage.setItem(this.STORE_KEY, token)
    } else {
      localStorage.setItem(this.STORE_KEY, "")
    }
    return success
  }

  logout() {
    localStorage.removeItem(this.STORE_KEY)
  }
}
