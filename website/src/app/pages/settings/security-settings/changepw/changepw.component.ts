import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/services/authentication.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-changepw',
  templateUrl: './changepw.component.html',
  styleUrls: ['./changepw.component.css']
})
export class ChangepwComponent implements OnInit {
  @ViewChild("currentPassword") currentPasswordInput: ElementRef;
  @ViewChild("newPassword") newPasswordInput: ElementRef;
  @ViewChild("confirmNewPassword") confirmNewPasswordInput: ElementRef;

  public changePasswordForm: FormGroup;
  public changePasswordInputsValid: boolean[];

  public showValid = false;
  public valid_text = "test";

  public showError = false;
  public error = "test";

  public visibilityCurrentPassword = false;
  public visibilityNewPassword = false;
  public visibilityConfirmNewPassword = false;

  public passwordFifteen = null

  public passwordEight = null;
  public passwordNumber = null;
  public passwordUpperCase = null;

  public timerNewPassword;
  public timerConfirmNewPassword;

  public submitPasswordButtonDisabled = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService,
  ) {
    this.changePasswordInputsValid = [null, null, null];
  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
      confirmNewPassword: ['', Validators.compose([Validators.required])],
    });
  }

  onChangeVisibilityCurrentPassword() {
    this.visibilityCurrentPassword = !this.visibilityCurrentPassword;
    if (this.visibilityCurrentPassword) {
      this.currentPasswordInput.nativeElement.setAttribute('type', 'text');
    } else {
      this.currentPasswordInput.nativeElement.setAttribute('type', 'password');
    }
  }

  onChangeVisibilityNewPassword() {
    this.visibilityNewPassword = !this.visibilityNewPassword;
    if (this.visibilityNewPassword) {
      this.newPasswordInput.nativeElement.setAttribute('type', 'text');
    } else {
      this.newPasswordInput.nativeElement.setAttribute('type', 'password');
    }
  }

  onChangeVisibilityConfirmNewPassword() {
    this.visibilityConfirmNewPassword = !this.visibilityConfirmNewPassword;
    if (this.visibilityConfirmNewPassword) {
      this.confirmNewPasswordInput.nativeElement.setAttribute('type', 'text');
    } else {
      this.confirmNewPasswordInput.nativeElement.setAttribute('type', 'password');
    }
  }

  onChangeCurrentPassword(password: string) {
    if (password.length > 0 && this.changePasswordForm.valid) {
      this.submitPasswordButtonDisabled = false;
    }
  }

  onCheckNewPassword() {
    this.changePasswordInputsValid[1] = null;

    let regexEightLetters = new RegExp("^[0-9a-zA-Z]{8,}");
    let regexNumber = new RegExp("^(?=.*[0-9])");
    let regexUpperCase = new RegExp("^(?=.*[A-Z])");

    clearTimeout(this.timerNewPassword);
    this.timerNewPassword = setTimeout(() => {
      let password = this.newPasswordInput.nativeElement.value;
      if (password.length > 0) {
        this.passwordFifteen = password.length >= 15;
        this.passwordEight = regexEightLetters.test(password);
        this.passwordNumber = regexNumber.test(password);
        this.passwordUpperCase = regexUpperCase.test(password);

        if ((this.passwordEight && this.passwordNumber && this.passwordUpperCase) || this.passwordFifteen) {
          if (this.passwordFifteen) {
            this.resetPasswordNote();
            this.passwordFifteen = true;
          } else {
            this.resetPasswordNote();
            this.passwordEight = true;
            this.passwordNumber = true;
            this.passwordUpperCase = true;
          }
          this.changePasswordInputsValid[1] = true;
          if (this.changePasswordForm.valid) {
            this.submitPasswordButtonDisabled = false;
          }
        } else {
          this.changePasswordInputsValid[1] = false;
        }

      } else {
        this.resetPasswordNote();
      }

      this.onCheckConfirmNewPassword(0);
    }, 600);
  }

  onCheckConfirmNewPassword(ms: number) {
    this.changePasswordInputsValid[2] = null;
    clearTimeout(this.timerConfirmNewPassword);
    this.timerConfirmNewPassword = setTimeout(() => {
      let password = this.newPasswordInput.nativeElement.value;
      let passwordConfirm = this.confirmNewPasswordInput.nativeElement.value;
      if (passwordConfirm.length > 0) {
        if (password === passwordConfirm) {
          this.changePasswordInputsValid[2] = true;
          if (this.changePasswordForm.valid) {
            this.submitPasswordButtonDisabled = false;
          }
        } else {
          this.changePasswordInputsValid[2] = false;
        }
      }
    }, ms);
  }

  resetPasswordNote() {
    this.passwordFifteen = null;
    this.passwordEight = null;
    this.passwordNumber = null;
    this.passwordUpperCase = null;
  }

  onSubmitPasswordForm() {
    this.changePasswordInputsValid = [null, null, null];
    this.submitPasswordButtonDisabled = true;
    if (this.changePasswordForm.invalid) {
      Object.keys(this.changePasswordForm.controls).forEach((key, index) => {
        this.changePasswordInputsValid[index] = this.changePasswordForm.get(key).errors == null;
      });
      this.error = "Füllen Sie bitte alle Felder aus!"
      this.showError = true;
      return;
    }
    //TODO
    let req = {
      oldPassword: this.currentPasswordInput.nativeElement.value,
      newPassword: this.newPasswordInput.nativeElement.value,
      accessToken: localStorage.getItem('accessToken')
    }
    
    this.resetUI();

    this.authenticationService.changePassword(req)
      .subscribe(
        data => {
          this.valid_text = "Ihr Passwort wurde erfolgreich geändert!";
          this.showValid = true;
        },
        error => {
          this.error = error["error"]["Message"];
          this.showError = true;
        }
      );
  }

  resetUI(){
    this.changePasswordForm.get('currentPassword').setValue('')
    this.changePasswordForm.get('newPassword').setValue('')
    this.changePasswordForm.get('confirmNewPassword').setValue('')

    this.visibilityCurrentPassword = false;
    this.visibilityNewPassword = false;
    this.visibilityConfirmNewPassword = false;
  }

}
