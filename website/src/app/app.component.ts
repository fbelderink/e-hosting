import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { NavigationItem } from './pages/navigation/navigation-item/navigation-item.component';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'e-hosting';

  public loaded = false;

  public sideNavOpen: boolean;

  public serverItemIsExpanded: boolean;
  public bssItemIsExpanded: boolean;


  @ViewChild('toggleMenu', { read: ElementRef}) toggleMenu: ElementRef;

  constructor(private readonly authenticationService : AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.verifySession().
    subscribe(
      _ => {
        this.loaded = true;
      },
      _ => {
        this.loaded = true;
      }
    )
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
