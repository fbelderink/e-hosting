import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-server',
  templateUrl: './v-server.component.html',
  styleUrls: ['./v-server.component.css']
})
export class VServerComponent implements OnInit {

  offers = [
    {
      "name": "Basic",
      "price": "0€",
      "features": [
        "2 CPU V-Cores",
        "2 GB RAM",
        "120 GB Speicher",
        "Anbindung mit bis zu 500 Mbit/s",
      ]
    },
    {
      "name": "Premium",
      "price": "0€",
      "features": [
        "4 CPU V-Cores",
        "4 GB RAM",
        "250 GB Speicher",
        "Anbindung mit bis zu 500 Mbit/s",
      ]
    },
    {
      "name": "Deluxe",
      "price": "0€",
      "features": [
        "6 CPU V-Cores",
        "6 GB RAM",
        "350 GB Speicher",
        "Anbindung mit bis zu 500 Mbit/s",
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
