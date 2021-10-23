import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusInfoComponent } from './bus-info/bus-info.component';
import { BusListComponent } from './bus-list/bus-list.component';

const routes: Routes = [
  {path: '', component: BusListComponent},
  {path: 'list', component: BusListComponent},
  {path: 'detail', component: BusInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusRoutingModule { }