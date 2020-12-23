import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.css']
})
export class ErrorBoxComponent implements OnInit {

  @Input() public showError : boolean;
  @Input() public error : string;
  @Input() public bright_color_scheme : boolean
  @Output() public showErrorChange = new EventEmitter<boolean>();
  
  
  constructor() { 
  }

  ngOnInit(): void {
  }

  onCloseErrorBox(){
    this.showError = false;
    this.showErrorChange.emit(this.showError);
  }

}
