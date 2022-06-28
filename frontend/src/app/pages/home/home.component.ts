import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  doLogout() {
    this.authService.logout()
  }

  testReq() {
    this.userService.getProfile()
      .subscribe(
        user => {
          alert(JSON.stringify(user))
        }
      )
  }

}
