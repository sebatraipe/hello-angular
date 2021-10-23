import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeleteConfirmDialogComponent } from 'src/app/dialog/delete-confirm-dialog/delete-confirm-dialog.component';
import { DialogData } from 'src/app/dialog/dialog-data';
import { Bus } from 'src/app/domain/bus';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit {

  bus: Bus[] = [];
  displayedColumns: string[] = ['id', 'brand', 'model', 'licensePlate', 
  'numberOfSeats', 'option'];

  loading: boolean = false;

  constructor(private route: Router, 
              private busService: BusService, 
              public snackBar: MatSnackBar, 
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading = true;
    this.busService.findAll().subscribe(list => {
      this.bus = list;
      this.loading = false;
    })
  }

  goToDetail(bus: Bus | null) {
    if (bus == null)
      this.route.navigate(['buses', 'detail']);
    else
      this.route.navigate(['buses', 'detail', {id: bus.id}]);
  }

  delete(id: number) {
    let dialogData = new DialogData(null, "¿Está seguro que desea eliminar el colectivo?", "Confirmación para eliminar");
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      height: 'auto',
      minHeight: 200,
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'delete') {
        this.loading = true;
        this.busService.delete(id).subscribe(b => {
          this.bus = this.bus.filter(buses => buses.id !== id);
          this.loading = false;
          this.snackBar.open("El colectivo se eliminó con éxito", 'Éxito', {duration: 2000})
        }, 
        error => {
          this.snackBar.open(error, "Error", {duration: 2000});
          this.loading = false;
        });
      }
    })
  }
}