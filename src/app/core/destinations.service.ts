import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { Observable, merge, Subject } from 'rxjs';
import { startWith, scan, map, tap, shareReplay } from 'rxjs/operators';
import { Destination, DestinationActions } from '../models/destination.model';

@Injectable({ providedIn: CoreModule })
export class DestinationsService {

  private destionationInsertedSource = new Subject<Destination>();
  private destinationInsertedAction$ = this.destionationInsertedSource.asObservable();

  private clearDestinationsSource = new Subject<void>();
  private clearDestinationsAction$ = this.clearDestinationsSource.asObservable();

  private updateDestinationSource = new Subject<Destination>();
  private updateDestinationAction$ = this.updateDestinationSource.asObservable();

  destinations$: Observable<Destination[]> = merge(
    this.destinationInsertedAction$.pipe(
      map(destination => ({type: DestinationActions.InsertDestination, payload: {destination}}))
    ),
    this.clearDestinationsAction$.pipe(
      map(() => ({type: DestinationActions.ClearDestinations}))
    ),
    this.updateDestinationAction$.pipe(
      map(destination => ({type: DestinationActions.UpdateDestination, payload: {destination}}))
    )
  ).pipe(
    startWith(JSON.parse(window.localStorage.getItem('destinations')) || []),
    scan((destinations: Destination[], action: {type: DestinationActions, payload: any}) => {
      switch (action.type) {
        case DestinationActions.InsertDestination:
          return [...destinations, {...action.payload.destination, uuid: `id${new Date().getTime()}`}];
        case DestinationActions.UpdateDestination:
          return destinations.map(destination =>
            destination.uuid === action.payload.destination.uuid ?
              {...destination, ...action.payload.destination} :
              destination
            );
          case DestinationActions.ClearDestinations:
          return [];
        default:
          return destinations;
      }
    }),
    tap(destinations => window.localStorage.setItem('destinations', JSON.stringify(destinations))),
    shareReplay(1)
  );

  destination$(uuid: string): Observable<Destination> {
    return this.destinations$.pipe(
      map(destinations => destinations.find(destination => uuid === destination.uuid))
    );
  }

  addDestination(destination: Destination) {
    this.destionationInsertedSource.next(destination);
  }

  clearDestinations() {
    this.clearDestinationsSource.next();
  }

  updateDestination(destination: Destination) {
    this.updateDestinationSource.next(destination);
  }
}
