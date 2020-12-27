import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ElementRef, Host, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';
import { NavigationItem } from './navigation-item/navigation-item.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public serverItems: NavigationItem[];
  public bsItems: NavigationItem[];
  public accountItems : NavigationItem[];

  //@ViewChild('serverdd', { read: ElementRef }) serverdd: ElementRef;
  //@ViewChild('bsdd', { read: ElementRef }) bsdd: ElementRef;

  public serverItemIsExpanded: boolean;
  public bsItemIsExpanded: boolean;
  public accountIsExpanded : boolean;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    public readonly authenticationService : AuthenticationService) 
    { 
      this.serverItems = [
        { displayName: "V-Server", iconName: "dns", routerLink: "/v-server" },
        { displayName: "Game Server", iconName: "sports_esports", routerLink: "/game-server" },
        { displayName: "Dedizierte Server", iconName: "corporate_fare", routerLink: "/dedicated-server" },
      ];
  
      this.bsItems = [
        { displayName: "Cloud", iconName: "cloud", routerLink: null },
        { displayName: "Dedizierte Server", iconName: "corporate_fare", routerLink: null },
      ]

      this.accountItems = [
        { displayName: "Konto", iconName: "account_circle", routerLink: "/account"},
        { displayName: "Einstellungen", iconName: "settings", routerLink:"/settings/account"},
      ]
    }

  ngOnInit(): void {
    this.breakpointObserver
      .observe('(min-width: 1200px)')
      .subscribe(_ => {
        this.closeAllDropdownMenus();
      });
  }

  onResize(event) {
    console.log(event.target.innerWidth);
  }

  onClickOutsideServer() {
    this.serverItemIsExpanded = false;
  }

  onClickOutsideBs() {
    this.bsItemIsExpanded = false;
  }

  onClickOutsideAccount(){
    this.accountIsExpanded = false;
  }

  closeAllDropdownMenus(){
    this.serverItemIsExpanded = false;
    this.bsItemIsExpanded = false;
    this.accountIsExpanded = false;
  }

  @HostListener('document:keydown.escape', ['$event']) 
  onKeydownHandler(event : KeyboardEvent){
      this.closeAllDropdownMenus();
  }
}
