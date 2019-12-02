import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Destination } from 'src/app/models/destination.model';
import { DestinationsService } from 'src/app/core/destinations.service';
import { Observable, combineLatest, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

interface DestinationsState {
  destinations: Destination[];
  pagination: {
    length: number;
    pageSize: number;
  };
  busy: boolean;
}

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationsComponent {
  private pageEventSource = new Subject<PageEvent>();
  private pageEvent$ = this.pageEventSource.asObservable();

  state$: Observable<DestinationsState> = combineLatest(
    this.destinationsService.destinations$,
    of(10),
    this.pageEvent$.pipe(
      startWith({pageIndex: 0}),
      map((pageEvent: PageEvent) => pageEvent.pageIndex)
    )
  ).pipe(
    map(([destinations, pageSize, page]) => {
      const paginatedDestination = destinations.slice(pageSize * page, (page + 1) * pageSize);
      return {
        destinations: paginatedDestination,
        pagination: {
          length: destinations.length,
          pageSize,
        },
        busy: false
      };
    })
  );

  constructor(
    private router: Router,
    private destinationsService: DestinationsService,
  ) { }

  submitHandler(destination: Destination) {
    this.destinationsService.addDestination(destination);
  }

  clearDestinationsHandler() {
    this.destinationsService.clearDestinations();
  }

  editHandler(uuid: string) {
    this.router.navigate(['/destinations', uuid]);
  }

  pageChangeHandler($event: PageEvent) {
    this.pageEventSource.next($event);
  }

}
