import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.css']
})
export class SecuritySettingsComponent implements OnInit {

  constructor(){}

  ngOnInit() : void {}
}
