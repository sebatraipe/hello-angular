import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeleteConfirmDialogComponent } from 'src/app/dialog/delete-confirm-dialog/delete-confirm-dialog.component';
import { DialogData } from 'src/app/dialog/dialog-data';
import { Person } from 'src/app/domain/person';
import { Trip } from 'src/app/domain/trip';
import { TripsService } from '../trips.service';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css']
})
export class TripsListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'bus', 'departure', 'destination', 'startDate', 'endDate', 'option'];
  trips: Trip[] = [];
  loading: boolean = false;
  fecha: number = 0;
  persons: Person[] = [];

  constructor(private route: Router,
              private tripService: TripsService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.tripService.findAll().subscribe(list => {
      this.trips = list;
      this.loading = false;
    })
  }

  goToDetail(trip: Trip | null) {
    if (trip == null)
      this.route.navigate(['trips', 'detail']);
    else
      this.route.navigate(['trips', 'detail', {id: trip.id}])
  }

  delete(id: number) {
    let dialogData = new DialogData(null,
      "¿Está seguro que desea eliminar el viaje?", "Confirmación para eliminar");
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      height: 'auto',
      minHeight: 200,
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'delete') {
        this.loading = true;
        this.tripService.delete(id).subscribe(p => {
          this.trips = this.trips.filter(trip => trip.id !== id);
          this.loading = false;
          this.snackBar.open("El viaje se eliminó con éxito", 'Éxito', {duration: 2000});
        }, error => {
          this.snackBar.open(error, "Error", {duration: 2000});
          this.loading = false;
        })
      }
    })
  }

  passengers(trip: Trip | null) {
    if(trip != null) {
      this.route.navigate(['trips', 'passengers', {id: trip.id}]);
    }
  }
}