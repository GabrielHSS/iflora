import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.scss'],
})
export class ListaEventosComponent implements OnInit {
  public data: any[];
  public comentarios: any[];
  constructor(private http: HttpClient) {
    this.getEventsTable();
  }
  panelOpenState = false;

  ngOnInit(): void {}
  getEventsTable() {
    try {
      this.http
        .get('https://5e7b6dc60e0463001633336d.mockapi.io/iflora/api/v1/events')
        .subscribe((result) => {
          this.data = result['events_list'];
          console.log(this.data);
        });
    } catch (error) {
      console.error(error);
    }
  }
}
