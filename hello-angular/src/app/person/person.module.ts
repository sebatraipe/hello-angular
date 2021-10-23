import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonInfoComponent } from './person-info/person-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonService } from './person.service';
import { MaterialModule } from '../material/material.module';
import { DialogModule } from '../dialog/dialog.module';


@NgModule({
  declarations: [
    PersonsListComponent,
    PersonInfoComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    DialogModule
  ],
  providers: [PersonService]
})
export class PersonModule { }