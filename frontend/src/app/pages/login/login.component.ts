import { Component, OnInit } from '@angular/core';
import { catchError, retry, tap, shareReplay } from 'rxjs/operators';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('',  [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  })

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  get username() { return this.loginForm.get('username') }

  get password() { return this.loginForm.get('password') }

  onSubmit() {
    const user: User = {username: this.loginForm.value.username || "", password: this.loginForm.value.password || ""}
    this.authService.login(user)
        .pipe(
        catchError(
          error => {
            console.error(error)
            this.router.navigateByUrl("/login")
            return of([])
          }
        )
        
      )
      .subscribe(
        async () => {          
          await this.router.navigateByUrl("/home")
        }
      )
  }

}
