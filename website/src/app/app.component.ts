import { Component, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Router, RouterEvent } from '@angular/router';
import { NavigationItem } from './pages/navigation/navigation-item/navigation-item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'e-hosting';

  public expandBs = "expand_more"
  public expandServer = "expand_more"

  public sideNavOpen : boolean;

  public serverItems : NavigationItem[];
  public bsItems : NavigationItem[];

  @ViewChild('servernav') servernav: ElementRef;
  @ViewChild('serverdd') serverdd: ElementRef;
  @ViewChild('bsnav') bsnav: ElementRef;
  @ViewChild('bsdd') bsdd: ElementRef;

  constructor(private breakpointObserver: BreakpointObserver, private renderer: Renderer2, private router: Router) {
  }

  ngOnInit() {
    this.serverItems = [
      {displayName: "V-Server", iconName: "dns", routerLink: "/v-server"},
      {displayName: "Game Server", iconName: "sports_esports", routerLink: "/game-server"},
      {displayName: "Dedizierte Server", iconName: "corporate_fare", routerLink: "/dedicated-server"},
    ];

    this.bsItems = [
      {displayName: "Cloud", iconName: "cloud", routerLink: null},
      {displayName: "Dedizierte Server", iconName: "corporate_fare", routerLink: null},
    ]

    /*this.breakpointObserver
      .observe(['(min-width: 1200px'])
      .subscribe((state: BreakpointState) => {
        this.closeMenuBS();
        this.closeMenuServer();
      })

    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.servernav.nativeElement.contains(e.target) && this.expandServer == "expand_more") {
        this.openMenuServer();
      }
      else if (!this.serverdd.nativeElement.contains(e.target) && this.expandServer == "expand_less") {
        if (window.innerWidth >= 1200) {
          this.closeMenuServer();
        } else if (this.servernav.nativeElement.contains(e.target)) {
          this.closeMenuServer();
        }
      }

      if (this.bsnav.nativeElement.contains(e.target) && this.expandBs == "expand_more") {
        this.openMenuBS();
      }
      else if (!this.bsdd.nativeElement.contains(e.target) && this.expandBs == "expand_less") {
        if (window.innerWidth >= 1200) {
          this.closeMenuBS();
        } else if (this.bsnav.nativeElement.contains(e.target)) {
          this.closeMenuBS();
        }
      }
    });

    this.renderer.listen('window', 'scroll', (e : Event) => {
      var header = document.getElementById("header");
      var boundary = window.innerWidth > 1280 ? 130 : 60;
      if (document.body.scrollTop > boundary || document.documentElement.scrollTop > boundary){
        header.classList.replace("bg-header-transparent", "bg-header-colored");
      } else {
        header.classList.replace("bg-header-colored", "bg-header-transparent");
      }
    });

    this.router.events.subscribe((e: RouterEvent) => {
      this.closeSideNav();
      this.closeMenuServer();
      this.closeMenuBS();
    }); */
  }

  openSideNav() {
    document.getElementById("nav-menu").classList.add("d-block")
    this.sideNavOpen = true;
  }

  closeSideNav() {
    document.getElementById("nav-menu").classList.remove("d-block")
    this.sideNavOpen = false;
  }

 /*  openMenuBS() {
    document.getElementById("dropdown-bs").classList.remove("d-none")
    this.expandBs = "expand_less"
  }

  closeMenuBS() {
    document.getElementById("dropdown-bs").classList.add("d-none")
    this.expandBs = "expand_more"
  }

  openMenuServer() {
    document.getElementById("dropdown-server").classList.remove("d-none")
    this.expandServer = "expand_less"
  }

  closeMenuServer() {
    document.getElementById("dropdown-server").classList.add("d-none")
    this.expandServer = "expand_more"
  } */

}
