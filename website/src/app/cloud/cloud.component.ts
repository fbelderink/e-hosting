import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {

  offers = [
    {
      "storage": "25 GB",
      "text": "Ideal zum Speichern von <br>Fotos, Videos und Musik",
      "features": ["1 Website", "Limitierte Bandbreite (100GB)", "100% Sicher", "24/7 Online", "1X Zugewiesene Ressourcen"],
      "price": "0‎€",
    },
    {
      "storage": "50 GB",
      "text": "Ideal um alle ihre Dokumente <br>digital zu speichern.",
      "features": ["1 Website", "Limitierte Bandbreite (100GB)", "100% Sicher", "24/7 Online", "1X Zugewiesene Ressourcen"],
      "price": "0‎€",
    },
    {
      "storage": "100 GB",
      "text": "Ideal für Familien <br>und Freunde.",
      "features": ["1 Website", "Limitierte Bandbreite (100GB)", "100% Sicher", "24/7 Online", "1X Zugewiesene Ressourcen"],
      "price": "0‎€",
    },
    {
      "storage": "250 GB",
      "text": "Ideal als Archiv für <br>jede Art von Dateien.",
      "features": ["1 Website", "Limitierte Bandbreite (100GB)", "100% Sicher", "24/7 Online", "1X Zugewiesene Ressourcen"],
      "price": "0‎€",
    },
    {
      "storage": "500 GB",
      "text": "Ideal für kleine Firmen <br>und Vereine.",
      "features": ["5 Nutzer", "RAID Storage", "Limitierte Bandbreite (100GB)", "100% Sicher", "24/7 Online"],
      "price": "0‎€",
    },
    {
      "storage": "1000 GB",
      "text": "Ideal um auch große Dateien <br>Online bereit zu halten",
      "features": ["8 Nutzer", "RAID Storage", "Limitierte Bandbreite (100GB)", "100% Sicher", "24/7 Online"],
      "price": "0‎€",
    }
  ]

  constructor() { 
    console.log(this.offers[this.offers.length - 1]["text"].length)
  }

  ngOnInit(): void {
  }

}
