import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteConfirmDialogComponent } from 'src/app/dialog/delete-confirm-dialog/delete-confirm-dialog.component';
import { DialogData } from 'src/app/dialog/dialog-data';
import { Person } from 'src/app/domain/person';
import { PersonService } from 'src/app/person/person.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit {

  persons: Person[] = [];

  displayedColumns: string[] = ['id', 'name', 'age', 'option'];

  loading: boolean = false;

  constructor(private route: Router, 
              private personService: PersonService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.loading = true;
    this.personService.findAll().subscribe(list => {
      this.persons = list;
      this.loading = false;
    })
  }

  goToDetail(person: Person | null) {
    if (person == null)
      this.route.navigate(['persons', 'detail']);
    else
      this.route.navigate(['persons', 'detail', {id: person.id}]);
  }

  delete(id: number) {
    let dialogData = new DialogData(null,
      "¿Está seguro que desea eliminar la persona?", "Confirmación para eliminar");
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      height: 'auto',
      minHeight: 200,
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'delete') {
        this.loading = true;
        this.personService.delete(id).subscribe(p => {
            this.persons = this.persons.filter(person => person.id !== id);
            this.loading = false;
            this.snackBar.open("La persona se eliminó con éxito.", 'Éxito', {duration: 2000});
          },
          error => {
            this.snackBar.open(error, "Error", {duration: 2000});
            this.loading = false;
          });
      }
    });
  }
}