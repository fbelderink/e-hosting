import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-cloud-offer',
  templateUrl: './cloud-offer.component.html',
  styleUrls: ['./cloud-offer.component.css']
})
export class CloudOfferComponent implements OnInit {

  @Input() storage: string;
  @Input() text: string;
  @Input() features: string[];
  @Input() price: string;

  constructor() { }

  ngOnInit(): void {
  }

}
