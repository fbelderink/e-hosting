import { Component, OnInit, NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {

  public loaded : boolean;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router : Router
    ) {}

  async ngOnInit() {
    var accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      this.authenticationService.refreshAccessToken()
        .subscribe(
          data => {
            localStorage.setItem("accessToken", data["accessToken"]);
            this.router.navigate(['account']);
          },
          _ => {
            this.loaded = true;
          }
        );
    }else{
      //TODO check if token is valid
      this.router.navigate(['account']);
    }
  }

  async onUserLogin() {

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
