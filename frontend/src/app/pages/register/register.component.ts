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
    firstName: new FormControl('',  [
      Validators.required,
      Validators.minLength(2)
    ]),
    lastName: new FormControl('',  [
      Validators.required,
      Validators.minLength(2)
    ]),
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
    this.authService.logout()
  }

  get username() { return this.registerForm.get('username') }

  get password() { return this.registerForm.get('password') }

  get firstName() { return this.registerForm.get('firstName') }

  get lastName() { return this.registerForm.get('lastName') }

  onSubmit() {
    const user: User = {
      firstName: this.registerForm.value.firstName || "", 
      lastName: this.registerForm.value.lastName || "", 
      username: this.registerForm.value.username || "", 
      password: this.registerForm.value.password || ""
    }
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
          this.authService.recheckLoggedIn()
          await this.router.navigateByUrl("/home")
        }
      )
  }

}
