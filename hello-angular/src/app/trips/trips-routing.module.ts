import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengersListComponent } from './passengers-list/passengers-list.component';
import { TripsInfoComponent } from './trips-info/trips-info.component';
import { TripsListComponent } from './trips-list/trips-list.component';

const routes: Routes = [
  {path: '', component: TripsListComponent},
  {path: 'list', component: TripsListComponent},
  {path: 'detail', component: TripsInfoComponent},
  {path: 'passengers', component: PassengersListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }