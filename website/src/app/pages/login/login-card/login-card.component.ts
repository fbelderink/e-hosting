import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationRequest, AuthenticationResponse } from '@app/models/Authentication';
import { AuthenticationService } from '@app/services/authentication.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {

  @Input() public title: string;
  @Input() public inputLabel1: string;
  @Input() public inputLabel2: string;

  public error: string;
  public showError = false;
  public loginForm: FormGroup;

  constructor(private readonly authenticationService: AuthenticationService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  onSubmit() {
    console.log("submit");
    if (this.loginForm.invalid) {
      this.error = "Email oder Passwort ist falsch!"
      this.showError = true;
      return;
    }
    this.showError = false;

    let req : AuthenticationRequest = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }

    this.authenticationService.login(req)
      .subscribe(
        res => {
          console.log(res)
          this.loginForm.reset()
          localStorage.setItem('accessToken', res.accessToken);
          this.router.navigate(['/account']);
        },
        error => {
          this.error = error["error"]["Message"];
          this.showError = true;
          this.loginForm.get('password').setValue('');
        }
      );
  }

  onCloseErrorBox() {
    this.showError = false;
  }

}
