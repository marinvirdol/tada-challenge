import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationComponent } from './destination.component';

const routes: Routes = [
  { path: ':uuid', component: DestinationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {}
