import { Component, Input, OnInit } from '@angular/core';

export interface NavigationItem {
  displayName: string;
  iconName: string;
  routerLink : string;
}

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.css']
})

export class NavigationItemComponent implements OnInit {

  @Input() public displayName : string;
  @Input() public iconName : string;
  @Input() public routerLink: string; 

  constructor() { }

  ngOnInit(): void {
  }

}
