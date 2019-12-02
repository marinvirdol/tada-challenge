import { DestinationComponent } from './destination.component';
import { of } from 'rxjs';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { Destination } from 'src/app/models/destination.model';

describe('Destination Component', () => {
  let comp: DestinationComponent;

  let routeSpy, routerSpy, destinationsSpy;

  beforeEach(() => {
    routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    routeSpy.paramMap = cold('--x-|', {x: {get: () => '123'}});
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    destinationsSpy = jasmine.createSpyObj('DestinationsService', ['updateDestination', 'destination$']);

    comp = new DestinationComponent(routeSpy, routerSpy, destinationsSpy);
  });

  it('saveDestinationHandler should navigate to the list of destinations', () => {
    const initialDestination = {
      uuid: '123',
      name: 'Wrong Name',
      description: 'Good Description'
    };

    const updatedDestination = {
      uuid: '123',
      name: 'Hawai',
      description: 'Good Description'
    };

    comp.saveDestinationHandler(updatedDestination, initialDestination);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('saveDestinationHandler should update the destination', () => {
    const initialDestination = {
      uuid: '123',
      name: 'Wrong Name',
      description: 'Good Description'
    };

    const updatedDestination = {
      uuid: '123',
      name: 'Hawai',
      description: 'Good Description'
    };

    comp.saveDestinationHandler(updatedDestination, initialDestination);

    expect(destinationsSpy.updateDestination).toHaveBeenCalledWith(updatedDestination);
  });
});
