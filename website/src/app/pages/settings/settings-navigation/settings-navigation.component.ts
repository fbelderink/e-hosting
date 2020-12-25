import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-navigation',
  templateUrl: './settings-navigation.component.html',
  styleUrls: ['./settings-navigation.component.css']
})
export class SettingsNavigationComponent implements OnInit {

  public items = [
    { iconName: "account_circle", displayName: "Konto", routerLink: "/settings/account"},
    { iconName: "vpn_key", displayName: "Sicherheit", routerLink: "/settings/security"}, 
    { iconName: "home", displayName: "Adressen", routerLink: "/settings/addresses"},
    { iconName: "payment", displayName: "Zahlungen", routerLink: "/settings/billing"}, 
    { iconName: "text_snippet", displayName: "Sicherheitsprotokoll", routerLink: "/settings/security-log"}
  ];
  
  constructor() {
  }

  ngOnInit(): void {
  }

}
