import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./containers/destinations/destinations.module').then(m => m.DestinationsModule)
  },
  {
    path: 'destinations',
    loadChildren: () => import('./containers/destination/destination.module').then(m => m.DestinationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
