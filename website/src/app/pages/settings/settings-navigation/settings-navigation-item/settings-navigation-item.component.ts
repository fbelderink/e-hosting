import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-navigation-item',
  templateUrl: './settings-navigation-item.component.html',
  styleUrls: ['./settings-navigation-item.component.css']
})
export class SettingsNavigationItemComponent implements OnInit {

  @Input() iconName : string;
  @Input() displayName : string;
  @Input() routerLink : string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.iconName);
    console.log(this.displayName);
    console.log(this.routerLink);
  }

}
