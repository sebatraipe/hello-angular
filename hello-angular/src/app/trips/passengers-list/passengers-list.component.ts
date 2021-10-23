import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/domain/person';
import { Trip } from 'src/app/domain/trip';
import { TripsService } from '../trips.service';

@Component({
  selector: 'app-passengers-list',
  templateUrl: './passengers-list.component.html',
  styleUrls: ['./passengers-list.component.css']
})
export class PassengersListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'lastname', 'age'];
  loading: boolean = false;
  passenger: Person[] = [];

  constructor(private router: ActivatedRoute,
              private tripService: TripsService,
              private snackBar: MatSnackBar,
              private route: Router) { 
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(param => {
      let p = param.get("id");
      this.loading = true;
      if (p != null) {
        let id = parseInt(p);
        this.tripService.findOne(id).subscribe(t => {
          this.createPerson(t);
          this.loading = false;
        }, error => {
          this.loading = false;
          this.snackBar.open(error, "Error", {duration: 2000});
          this.goToBack();
        })
      } else {
        this.loading = false;
      }
    })
  }

  private createPerson(trip: Trip | null) {
    if(trip != null) {
      trip.passengers.forEach(p => {
        this.passenger.push(new Person(p.id, p.firstName, p.lastName, p.age));
      })
    }
  }

  goToBack() {
    this.route.navigate(['trips', 'list']);
  }
}