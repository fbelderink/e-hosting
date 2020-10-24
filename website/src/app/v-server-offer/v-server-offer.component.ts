import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-v-server-offer',
  templateUrl: './v-server-offer.component.html',
  styleUrls: ['./v-server-offer.component.css']
})
export class VServerOfferComponent implements OnInit {

  @Input() name : string;
  @Input() price : string;
  @Input() features : string[];

  constructor() { }

  ngOnInit(): void {
    console.log(name)
  }

}
