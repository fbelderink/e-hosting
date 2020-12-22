import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.css']
})
export class SecuritySettingsComponent implements OnInit {

  public changePasswordForm : FormGroup;
  public changePasswordInputsValid : boolean[];
  
  constructor(
    private readonly formBuilder : FormBuilder
  ) { 
    this.changePasswordInputsValid = [true, true, true];
  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
      confirmNewPassword: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmitPasswordForm(){
    this.changePasswordInputsValid = [true, true, true];
    if(this.changePasswordForm.invalid){
      Object.keys(this.changePasswordForm.controls).forEach((key,index) => {
        console.log(this.changePasswordForm.get(key).value);
        console.log(this.changePasswordForm.get(key).errors);
        this.changePasswordInputsValid[index] = this.changePasswordForm.get(key).errors == null;
      })
    }
    console.log(this.changePasswordInputsValid);
  }

}
