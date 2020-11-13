import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { NavigationItem } from './pages/navigation/navigation-item/navigation-item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'e-hosting';

  public sideNavOpen: boolean;

  public serverItems: NavigationItem[];
  public bsItems: NavigationItem[];

  public serverItemIsExpanded: boolean;
  public bssItemIsExpanded: boolean;


  @ViewChild('toggleMenu', { read: ElementRef}) toggleMenu: ElementRef;

  constructor() { }

  ngOnInit() {
    this.serverItems = [
      { displayName: "V-Server", iconName: "dns", routerLink: "/v-server" },
      { displayName: "Game Server", iconName: "sports_esports", routerLink: "/game-server" },
      { displayName: "Dedizierte Server", iconName: "corporate_fare", routerLink: "/dedicated-server" },
    ];

    this.bsItems = [
      { displayName: "Cloud", iconName: "cloud", routerLink: null },
      { displayName: "Dedizierte Server", iconName: "corporate_fare", routerLink: null },
    ]
  }
/*
this.renderer.listen('window', 'scroll', (e : Event) => {
  var header = document.getElementById("header");
  var boundary = window.innerWidth > 1280 ? 130 : 60;
  if (document.body.scrollTop > boundary || document.documentElement.scrollTop > boundary){
    header.classList.replace("bg-header-transparent", "bg-header-colored");
  } else {
    header.classList.replace("bg-header-colored", "bg-header-transparent");
  }
});
}*/

toggleSideNav(){
  this.sideNavOpen = !this.sideNavOpen;
}

onClickOutsideSideNav(target : EventTarget){
  if(!this.toggleMenu.nativeElement.contains(target)){
    this.sideNavOpen = false;
  }
}

}
