import { Component, OnInit, NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router : Router
    ) {}

  async ngOnInit() {
    if(this.authenticationService.isLoggedIn) {
      this.router.navigate(['account']);
    }
    /*this.authenticationService.refreshAccessToken()
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem("accessToken", res["accessToken"]);
          this.router.navigate(['account']);
        },
        error => {
          console.log(error);
          this.loaded = true;
        }
      );*/
  }

  isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isValidPassword(password) {
    var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return re.test(String(password));
  }

}
