import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonInfoComponent } from './person-info/person-info.component';
import { PersonsListComponent } from './persons-list/persons-list.component';

const routes: Routes = [
  {path: '', component: PersonsListComponent},
  {path: 'list', component: PersonsListComponent},
  {path: 'detail', component: PersonInfoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }