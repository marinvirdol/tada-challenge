import { NgModule } from '@angular/core';
import { DestinationsRoutingModule } from './destinations-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { DestinationsComponent } from './destinations.component';

@NgModule({
  declarations: [
    DestinationsComponent
  ],
  imports: [
    SharedModule,
    DestinationsRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatPaginatorModule,
    MatIconModule,
  ],
})
export class DestinationsModule {}
