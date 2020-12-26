import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationItem } from '../../navigation-item/navigation-item.component';

@Component({
  selector: 'app-navigation-account-item',
  templateUrl: './navigation-account-item.component.html',
  styleUrls: ['./navigation-account-item.component.css']
})
export class NavigationAccountItemComponent implements OnInit {

  @Input() public navigationItems : NavigationItem[];
  @Input() public isExpanded;

  @Output() public isExpandedChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleExpand(){
    this.isExpanded = !this.isExpanded;
    this.isExpandedChange.emit(this.isExpanded);
  }

}
