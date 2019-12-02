export interface Destination {
  uuid?: string;
  name: string;
  description: string;
}

export const enum DestinationActions {
  InsertDestination = 'InsertDestination',
  ClearDestinations = 'ClearDestinations',
  UpdateDestination = 'UpdateDestination',
}
