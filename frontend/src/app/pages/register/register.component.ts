import { Component, OnInit } from '@angular/core';

import { catchError, retry, tap, shareReplay } from 'rxjs/operators';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
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

  get username() { return this.registerForm.get('username') }

  get password() { return this.registerForm.get('password') }

  onSubmit() {
    const user: User = {username: this.registerForm.value.username || "", password: this.registerForm.value.password || ""}
    this.authService.register(user)
        .pipe(
        catchError(
          error => {
            console.error(error)
            window.alert(JSON.stringify(error))
            this.router.navigateByUrl("/register")
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
