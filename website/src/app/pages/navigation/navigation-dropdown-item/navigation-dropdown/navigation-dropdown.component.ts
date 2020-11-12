import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem } from '../../navigation-item/navigation-item.component';

@Component({
  selector: 'app-navigation-dropdown',
  templateUrl: './navigation-dropdown.component.html',
  styleUrls: ['./navigation-dropdown.component.css']
})

export class NavigationDropdownComponent implements OnInit {

  @Input() public navigationItems : NavigationItem[];
  @Input() public isExpanded : boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
