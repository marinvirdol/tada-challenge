import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DestinationsService } from 'src/app/core/destinations.service';
import { Observable, combineLatest } from 'rxjs';
import { Destination } from 'src/app/models/destination.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

interface DestinationState {
  destination: Destination;
}

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationComponent {
  state$: Observable<DestinationState> = combineLatest(
    this.route.paramMap.pipe(
      switchMap((param: ParamMap) => this.destinationsService.destination$(param.get('uuid')))
    )
  ).pipe(
    map(([destination]) => ({destination}))
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destinationsService: DestinationsService,
  ) { }

  saveDestinationHandler(updatedDestination: Destination, destination: Destination) {
    this.destinationsService.updateDestination({...destination, ...updatedDestination});
    this.router.navigate(['/']);
  }
}
