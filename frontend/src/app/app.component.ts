import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncSubject, BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { Route } from './models/route';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NodePress';
  isLoggedIn = this.authService.isLoggedIn

  loginPageRoutes: Route[] = [
    { path: 'login', title: 'Login' },
    { path: 'register', title: 'Register' },
  ]

  loggedInRoutes: Route[] = [
    { path: 'home', title: 'Home' },
    { path: 'profile', title: 'Profile' },
    { path: 'posts', title: 'Posts' },
  ]

  routes = new BehaviorSubject(this.loginPageRoutes)


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService,) {
  }
  
  ngOnInit(): void {
    const me = this
    this.isLoggedIn.subscribe({
      next(value) {
        console.log(`New Login ${value}`);
        
        me.routes.next(value ? me.loggedInRoutes : me.loginPageRoutes)
      }
    })
    this.authService.recheckLoggedIn()
  }

  logout() {
    this.authService.logout()
  }
}
