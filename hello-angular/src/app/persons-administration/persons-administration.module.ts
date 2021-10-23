import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { FormsModule } from '@angular/forms';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonService } from './person.service';



@NgModule({
  declarations: [
    PersonDetailComponent,
    PersonListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ /* Para hacer visible el componente hacia el exterior y lo usamos en app.component.html */
    
    //PersonDetailComponent
    PersonListComponent
  ],
  providers: [PersonService]
})
export class PersonsAdministrationModule { }
