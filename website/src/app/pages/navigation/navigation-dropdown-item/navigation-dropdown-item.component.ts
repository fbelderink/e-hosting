import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem } from '../navigation-item/navigation-item.component';

@Component({
  selector: 'app-navigation-dropdown-item',
  templateUrl: './navigation-dropdown-item.component.html',
  styleUrls: ['./navigation-dropdown-item.component.css']
})
export class NavigationDropdownItemComponent implements OnInit {

  @Input() public displayName : string;
  @Input() public iconName : string;
  @Input() public navigationItems : NavigationItem[];

  public isExpanded : boolean;

  constructor() { }

  ngOnInit(): void {
  }

  toggleExpand(){
    this.isExpanded = !this.isExpanded;
  }

}
