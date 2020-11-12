import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {

  @Input() public title : string;
  @Input() public inputLabel1 : string;
  @Input() public inputLabel2 : string;

  public error = 'Email oder Passwort ist falsch!';
  public showError = false;
  public loginForm : FormGroup;

  constructor(private readonly authenticationService : AuthenticationService,
              private readonly formBuilder : FormBuilder,
              private readonly router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    
  }

  onSubmit(){
    console.log("submit");
    if(this.loginForm.invalid){
      this.error = "Email oder Passwort ist falsch!"
      this.showError = true;
      return;
    }
    this.showError = false;

    this.authenticationService.login({ email : this.loginForm.get('email').value, password: this.loginForm.get('password').value })
    .subscribe(
      data => {
        this.loginForm.reset();
        localStorage.setItem('accessToken', data['accessToken']);
        this.router.navigate(['/account']);
      },
      error => {
        this.error = error["error"]["Message"]; //Email oder Passwort ist falsch!
        this.showError = true;
        this.loginForm.get('password').setValue('');
      } 
    )
  }

  onCloseErrorBox(){
    this.showError = false;
  }

}
