import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusRoutingModule } from './bus-routing.module';
import { BusInfoComponent } from './bus-info/bus-info.component';
import { BusListComponent } from './bus-list/bus-list.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BusService } from './bus.service';

@NgModule({
  declarations: [
    BusInfoComponent,
    BusListComponent
  ],
  imports: [
    CommonModule,
    BusRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [BusService]
})
export class BusModule { }