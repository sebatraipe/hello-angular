import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from 'src/app/bus/bus.service';
import { Bus } from 'src/app/domain/bus';
import { Person } from 'src/app/domain/person';
import { Trip } from 'src/app/domain/trip';
import { PersonService } from 'src/app/person/person.service';
import { TripsService } from '../trips.service';

@Component({
  selector: 'app-trips-info',
  templateUrl: './trips-info.component.html',
  styleUrls: ['./trips-info.component.css']
})
export class TripsInfoComponent implements OnInit {

  pasajeros: Person[] = [];
  
  formTrips: FormGroup = this.fb.group({
    id: ['', []],
    departure: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    bus: ['', [Validators.required]],
    passenger: [this.pasajeros, [Validators.required]]
  })

  loading: boolean = false;
  buses: Bus[] = [];
  passengers: Person[] = [];
  passengerSelected: Person[] = [];
  paramId: string | any;

  constructor(private router: ActivatedRoute,
              private fb: FormBuilder,
              private busService: BusService,
              private personService: PersonService,
              private tripService: TripsService,
              private route: Router,
              private snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(param => {
      this.paramId = param.get("id");
      this.loading = true;
      this.findAllBus();
      this.findAllPersons();
      if (this.paramId != null) {
        let id = parseInt(this.paramId);
        this.tripService.findOne(id).subscribe(t => {
          this.builForm(t);
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

  private findAllBus() {
    this.busService.findAll().subscribe(list => {
      this.buses = list;
    })
  }

  private findAllPersons() {
    this.personService.findAll().subscribe(list => {
      this.passengers = list;
    })
  }

  goToBack() {
    this.route.navigate(['trips', 'list']);
  }

  builForm(trip: Trip | null) {
    if (trip != null) { 
      this.pasajeros = trip.passengers;      
      this.formTrips.patchValue({
        id: trip.id,
        departure: trip.departure,
        destination: trip.destination,
        bus: trip.bus.licensePlate,
        passenger: trip.passengers,
        startDate: new Date(trip.startDate * 1000).toISOString(),
        endDate: new Date(trip.endDate * 1000).toISOString(),
        startTime: new Date(trip.startDate * 1000).toLocaleTimeString(),
        endTime: new Date(trip.endDate * 1000).toLocaleTimeString()
      })
    }
  }

  get fc(){
    return this.formTrips.controls;
  }

  save() {
    let bus: Bus | any;
    let startDate = this.getStartDate();
    let endDate = this.getEndDate()
   
    try {
      if(this.validateDate(startDate, endDate)) {
        this.passengerSelected = this.formTrips.get(['passenger'])?.value;
        bus = this.buses.find(b => b.licensePlate == this.formTrips.get(['bus'])?.value);
        bus?.validatedSeats(this.passengerSelected.length);
        
        const trip = new Trip(this.formTrips.get(['id'])?.value,
        this.formTrips.get(['departure'])?.value,
        this.formTrips.get(['destination'])?.value,
        bus, 
        this.passengerSelected,
        this.convertUnix(startDate),
        this.convertUnix(endDate))

        if (this.paramId == null) {
          this.createTrip(trip);
        } else {
          this.updateTrip(trip);
        }
      }
    } catch(error) {
      this.snackBar.open(error, "Error", {duration: 2000});
    } 
  }
  
  private getStartDate(): Date {
    let startDate: Date = new Date(this.formTrips.get(['startDate'])?.value);
    let time: string = this.formTrips.get(['startTime'])?.value;
    let split = time.split(':');
    let hours = parseInt(split[0]);
    let min = parseInt(split[1]);
    startDate.setHours(hours, min);
    return startDate;
  }

  private getEndDate(): Date {
    let endDate: Date = new Date(this.formTrips.get(['endDate'])?.value);
    let time: string = this.formTrips.get(['endTime'])?.value;
    let split = time.split(':');
    let hours = parseInt(split[0]);
    let min = parseInt(split[1]);
    endDate.setHours(hours, min);
    return endDate;
  }
  
  private validateDate(startDate: Date, endDate: Date) {
    if (startDate < endDate){
      return true;
    } else {
      throw 'La fecha de llegada tiene que ser posterior a la fecha de salida.';      
    }
  }

  private convertUnix(date: Date) {
    return date.getTime() / 1000;
  }

  private createTrip(trip: Trip) {
    this.tripService.create(trip).subscribe(t => {
      this.snackBar.open("El viaje se creó con éxito.", "Éxito", {duration: 2000});
      this.goToBack();
    }, error => {
      this.snackBar.open(error, "Error", {duration: 2000});
      console.log(error);
    })
  }

  private updateTrip(trip: Trip) {
    this.tripService.update(trip).subscribe(t => {
      this.snackBar.open("El viaje se actualizó con éxito.", "Éxito", {duration: 2000});
      this.goToBack();
    }, error => {
      this.snackBar.open(error, "Error", {duration: 2000});
      console.log(error);
    })
  }

  compare(person1: Person, person2: Person): boolean {
    return person1 && person2 ? person1.id === person2.id : person1 === person2;
  }
}