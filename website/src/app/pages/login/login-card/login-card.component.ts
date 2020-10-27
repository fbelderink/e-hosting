import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {

  @Input() public title : string;
  @Input() public inputLabel1 : string;
  @Input() public inputLabel2 : string;

  public showError = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.showError = true;
  }

  onCloseErrorBox(){
    this.showError = false;
  }

}
