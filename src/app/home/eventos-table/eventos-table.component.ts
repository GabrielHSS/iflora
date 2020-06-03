import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EventosTableDataSource, EventosTableItem } from './eventos-table-datasource';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos-table',
  templateUrl: './eventos-table.component.html',
  styleUrls: ['./eventos-table.component.scss']
})
export class EventosTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<EventosTableItem>;
  dataSource: EventosTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    "thumb",
    "title",
    "posted_by",
    "text",
    "like",
    "denunciations",
    "denunciation_media",
    "events_date",
    "events_place",
    "events_time",
    "confirmed",
    "categories_list"
  ];


  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.dataSource = new EventosTableDataSource(this.http);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
