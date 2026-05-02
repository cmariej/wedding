import { Component } from '@angular/core';

interface AgendaItem {
  time: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-agenda',
  imports: [],
  templateUrl: './agenda.html',
  styleUrl: './agenda.scss',
})
export class Agenda {
  items: AgendaItem[] = [
    { time: '11:00 Uhr',    title: 'Trauung',                        icon: '/assets/img/ringe.png'  },
    { time: '12:00 Uhr',    title: 'Fotos im Kurpark',               icon: '/assets/img/kamera.png' },
    { time: '13:00 Uhr',    title: 'Locationwechsel & Sektempfang',  icon: '/assets/img/sekt.png'   },
    { time: '15:00 Uhr',    title: 'Kaffee & Kuchen',                icon: '/assets/img/kuchen.png' },
    { time: '18:00 Uhr',    title: 'Abendessen',                     icon: '/assets/img/essen.png'  },
    { time: '20:00 Uhr',    title: 'Hochzeitstanz',                  icon: '/assets/img/musik.png'  },
    { time: 'Ab 20:30 Uhr', title: 'Party Open End',                 icon: '/assets/img/party.png' },
  ];
}
