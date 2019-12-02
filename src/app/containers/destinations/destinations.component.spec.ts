import { DestinationsComponent } from './destinations.component';
import { Destination } from 'src/app/models/destination.model';

describe('DestinationsComponent', () => {
  let comp: DestinationsComponent;

  let routerSpy, destinationsSpy;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    destinationsSpy = jasmine.createSpyObj('DestinationsService', ['addDestination', 'clearDestinations']);
    comp = new DestinationsComponent(routerSpy, destinationsSpy);
  });

  it('submitHandler should insert the new destination', () => {
    const destination: Destination = {
      name: 'Hawai',
      description: 'Beautiful'
    };

    comp.submitHandler(destination);

    expect(destinationsSpy.addDestination).toHaveBeenCalledWith(destination);
  });

  it('clearDestinationsHandler should clear the list of destinations', () => {
    comp.clearDestinationsHandler();

    expect(destinationsSpy.clearDestinations).toHaveBeenCalled();
  });

  it('editHandler should navigate to the destination edit view', () => {
    comp.editHandler('123');

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/destinations', '123']);
  });
});
