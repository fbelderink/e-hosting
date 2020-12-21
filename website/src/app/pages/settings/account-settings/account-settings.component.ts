import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  public changeNameForm: FormGroup;
  public identificationForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.changeNameForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.identificationForm = this.formBuilder.group({
      email: ['', Validators.email],
      mobile_number: ['']
    })
  }

  onSubmitNameForm() {
    console.log("submit");
    if (this.changeNameForm.valid) {
      console.log("valid")
    }
  }

  onSubmitIdentification() {
    console.log("submit");
    if (this.identificationForm.value.email !== null || this.identificationForm.value.mobile_number !== null) {
      if (this.identificationForm.valid) {
        console.log("valid")
      }
    }
  }

}
