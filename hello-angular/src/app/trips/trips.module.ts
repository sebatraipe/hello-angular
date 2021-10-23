import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsRoutingModule } from './trips-routing.module';
import { TripsInfoComponent } from './trips-info/trips-info.component';
import { TripsListComponent } from './trips-list/trips-list.component';
import { PassengersListComponent } from './passengers-list/passengers-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DialogModule } from '../dialog/dialog.module';

@NgModule({
  declarations: [
    TripsInfoComponent,
    TripsListComponent,
    PassengersListComponent
  ],
  imports: [
    CommonModule,
    TripsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    DialogModule
  ]
})
export class TripsModule { }