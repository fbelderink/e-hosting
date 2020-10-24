import { Component, OnInit, NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {

  email;
  password;
  hash;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private cookieService : CookieService) { 
  }

  ngOnInit(): void {
  }

  async onSignup(){
    console.log(this.email);
    console.log(this.password);
    //!!!DEBUG
    //if(this.isValidEmail(this.email) && this.isValidPassword(this.password)){
      const salt = bcrypt.genSaltSync(12);
      this.hash = bcrypt.hashSync(this.password, salt);
      var payload = {
        "email": this.email,
        "password": this.hash
      }
      try {
        var res = await this.http.post('http://127.0.0.1:5000/signup', payload, this.httpOptions).toPromise();
        this.cookieService.set('rt', res["refresh_token"]);
        localStorage.setItem('at', res["access_token"]);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    //}
  }

  async onUserLogin() {
    
  }

  isValidEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isValidPassword(password){
    var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return re.test(String(password));
  }

}
