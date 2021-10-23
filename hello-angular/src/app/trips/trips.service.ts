import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Trip } from '../domain/trip';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private resourceUrl: string = environment.backendUrl + "trips";

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Trip[]> {
    return this.httpClient.get<Trip[]>(this.resourceUrl).pipe(
      map(trips => 
        trips.map(t => new Trip(t.id, t.departure, t.destination, t.bus, t.passengers,
          t.startDate, t.endDate)) 
      )
    )
  }

  public findOne(id: number): Observable<Trip | null> {
    return this.httpClient.get<Trip>(this.resourceUrl + "/" + id).pipe(
      catchError(error => {
        console.log("Error...", error);
        return throwError("El viaje no existe.");
      }),
      map(t => new Trip(t.id, t.departure, t.destination, t.bus, t.passengers, t.startDate, t.endDate))
    )
  }

  public create(trip: Trip): Observable<any> {
    return this.httpClient.post<any>(this.resourceUrl, trip).pipe(
      catchError(error => {
        console.log("Error...", error);
        return throwError("El viaje no pudo ser creado.");
      })
    )
  }

  public delete(id: number) {
    return this.httpClient.delete<any>(this.resourceUrl + "/" + id).pipe(
      catchError(error => {
        console.log("Error...", error);
        return throwError("El viaje contiene información asociada.");
      })
    )
  }

  public update(trip: Trip): Observable<any> {
    return this.httpClient.put<any>(this.resourceUrl, trip).pipe(
      catchError(error => {
        console.log("Error...", error);
        return throwError("La persona no pudo ser actualizada..");
      })
    )
  }
}