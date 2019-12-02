import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { DestinationComponent } from './destination.component';
import { FeatureRoutingModule } from './destination-routing.module';

@NgModule({
  declarations: [
    DestinationComponent
  ],
  imports: [
    SharedModule,
    FeatureRoutingModule,
    MatCardModule,
  ]
})
export class DestinationModule { }
