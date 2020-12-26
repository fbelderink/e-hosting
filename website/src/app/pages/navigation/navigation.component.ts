import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';
import { NavigationItem } from './navigation-item/navigation-item.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() public serverItems: NavigationItem[];
  @Input() public bsItems: NavigationItem[];

  @ViewChild('serverdd', { read: ElementRef }) serverdd: ElementRef;
  @ViewChild('bsdd', { read: ElementRef }) bsdd: ElementRef;

  public serverItemIsExpanded: boolean;
  public bsItemIsExpanded: boolean;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    public readonly authenticationService : AuthenticationService) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe('(min-width: 1200px)')
      .subscribe(_ => {
        this.serverItemIsExpanded = false;
        this.bsItemIsExpanded = false;
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
}
