import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-navigation',
  templateUrl: './settings-navigation.component.html',
  styleUrls: ['./settings-navigation.component.css']
})
export class SettingsNavigationComponent implements OnInit {

  public items = [
    { iconName: "dns", displayName: "Profil" },
    { iconName: "dns", displayName: "Konto" },
    { iconName: "dns", displayName: "Sicherheit" }, 
    { iconName: "dns", displayName: "Adressen" },
    { iconName: "dns", displayName: "Zahlungen" }, 
    { iconName: "dns", displayName: "Sicherheitsprotokoll" }
  ];
  
  constructor() {

    for(let item of this.items){
      console.log(item.displayName);
    }
  }

  ngOnInit(): void {
  }

}
