import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  STORE_KEY = "nodepress-auth"

  constructor() { }

  isLoggedIn() {
    const authKey = localStorage.getItem(this.STORE_KEY)
    return authKey != null && authKey != ""
  }

  login(user: User) {
    // TODO: implement login function
    const success = true
    const token = "ldjfdskfjdlfj"
    if (success && user.username != "" && user.password != "") {
      localStorage.setItem(this.STORE_KEY, token)
    } else {
      localStorage.setItem(this.STORE_KEY, "")
    }
    return success
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
