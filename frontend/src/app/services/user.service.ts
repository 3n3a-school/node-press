import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, tap, shareReplay } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  BACKEND_BASE_URL = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get<User>(`${this.BACKEND_BASE_URL}/users/profile`)
    .pipe(
      shareReplay()
    )
  }
}
