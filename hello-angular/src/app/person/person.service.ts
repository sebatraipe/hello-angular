import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Person } from '../domain/person';
import {map, catchError} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private resourceUrl: string = environment.backendUrl + "persons";

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.resourceUrl).pipe(
      map(persons => 
        persons.map(p => new Person(p.id, p.firstName, p.lastName, p.age))
      )
    )    
  }

  public findOne(id: number): Observable<Person | null> {
    return this.httpClient.get<Person>(this.resourceUrl + "/" + id).pipe(
      catchError(error => {
        console.log("Error..", error);
        return throwError("La persona no existe.");
      }),
      map(p => new Person(p.id, p.firstName, p.lastName, p.age))
    )  
  }

  public create(person: Person): Observable<any> {
    return this.httpClient.post<any>(this.resourceUrl, person).pipe(
      catchError(error => {
      console.log("Error.." + error);
      return throwError("La persona no pudo ser creada.");
    }))
  }

  public update(person: Person): Observable<any> {
    return this.httpClient.put<any>(this.resourceUrl, person).pipe(
      catchError(error => {
      console.log("Error..", error);
      return throwError("La persona no pudo ser actualizada.");
    }))
  }

  public delete(id:number) {
    return this.httpClient.delete<any>(this.resourceUrl + "/" + id)
      .pipe(
        catchError(error => {
          console.log("Error..", error);
          return throwError("La persona contiene información asociada.");
        })
      )
  }
}