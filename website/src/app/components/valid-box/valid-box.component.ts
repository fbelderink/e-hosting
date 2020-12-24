import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-valid-box',
  templateUrl: './valid-box.component.html',
  styleUrls: ['./valid-box.component.css']
})
export class ValidBoxComponent implements OnInit {

  @Input() public showValid : boolean;
  @Input() public valid_text : string;
  @Input() public bright_color_scheme : boolean
  @Output() public showValidChange = new EventEmitter<boolean>();
  
  constructor() { 
  }

  ngOnInit(): void {
  }

  onCloseValidBox(){
    this.showValid = false;
    this.showValidChange.emit(this.showValid);
  }

}
