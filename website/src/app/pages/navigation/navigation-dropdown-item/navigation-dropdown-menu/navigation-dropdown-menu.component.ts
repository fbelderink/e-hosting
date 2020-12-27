import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationItem } from '../../navigation-item/navigation-item.component';

@Component({
  selector: 'app-navigation-dropdown-menu',
  templateUrl: './navigation-dropdown-menu.component.html',
  styleUrls: ['./navigation-dropdown-menu.component.css']
})

export class NavigationDropdownMenuComponent implements OnInit {

  @Input() public navigationItems : NavigationItem[];
  @Input() public isExpanded : boolean;
  
  @Input() public boundRight = false;
  @Input() public headerText = false;

  @Output() public isExpandedChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {}

  onClose(){
    this.isExpanded = false;
    this.isExpandedChange.emit(this.isExpanded);
  }

}
