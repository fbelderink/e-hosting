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

  @Output() public clickedEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
