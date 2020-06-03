import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Comments {
  text: string,
  posted_by: string,
  like: number
}

export interface EventosTableItem {
  title: string,
  posted_by: string,
  text: string,
  thumb: string,
  like: number,
  denunciations: number,
  denunciation_media: number,
  events_date: string,
  events_place: string,
  events_time: string,
  confirmed: number,
  categories_list: [string],
  comments: Comments[]
}

/**
 * Data source for the EventosTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EventosTableDataSource extends DataSource<EventosTableItem>{

  data: EventosTableItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private http: HttpClient) {
    super();
    this.getEventsTable();
  }

  getEventsTable() {
    try {
      this.http
        .get<EventosTableItem[]>('https://5e7b6dc60e0463001633336d.mockapi.io/iflora/api/v1/events')
        .subscribe((result) => {
            this.data = result['events_list']
        });
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<EventosTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: EventosTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: EventosTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'posted_by': return compare(a.posted_by, b.posted_by, isAsc);
        case 'text': return compare(a.text, b.text, isAsc);
        case 'thumb': return compare(a.thumb, b.thumb, isAsc);
        case 'like': return compare(+a.like, +b.like, isAsc);
        case 'denunciations': return compare(+a.denunciations, +b.denunciations, isAsc);
        case 'denunciation_media': return compare(+a.denunciation_media, +b.denunciation_media, isAsc);
        case 'events_date': return compare(a.events_date, b.events_date, isAsc);
        case 'events_place': return compare(a.events_place, b.events_place, isAsc);
        case 'events_time': return compare(a.events_time, b.events_time, isAsc);
        case 'confirmed': return compare(+a.confirmed, +b.confirmed, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
