import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Bus } from '../domain/bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private resourceUrl: string = environment.backendUrl + "buses";
  
  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Bus[]> {
    return this.httpClient.get<Bus[]>(this.resourceUrl).pipe(
      map(buses => 
        buses.map(b => new Bus(b.id, b.licensePlate, b.model, b.numberOfSeats))
      )
    )
  }

  public findOne(id: number): Observable<Bus | null> {
    return this.httpClient.get<Bus>(this.resourceUrl + "/" + id).pipe(
      catchError(error => {
        console.log("Error..", error);
        return throwError("El colectivo no existe.");
      }),
      map(b => new Bus(b.id, b.licensePlate, b.model, b.numberOfSeats))
    )
  }

  public create(bus: Bus): Observable<any> {
    return this.httpClient.post<any>(this.resourceUrl, bus).pipe(
      catchError(error => {
        console.log("Error", error);
      return throwError("El colectivo no pudo ser creado.");
    }))
  }

  public update(bus: Bus): Observable<any> {
    return this.httpClient.put<any>(this.resourceUrl, bus).pipe(
      catchError(error => {
        console.log("Error", error);
        return throwError("El colectivo no pudo ser actualizado.");
      })
    )
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.resourceUrl + "/" + id).pipe(
      catchError(error => {
        console.log("Error", error);
        return throwError("El colectivo contiene información asociada.");
      })
    )
  }
}