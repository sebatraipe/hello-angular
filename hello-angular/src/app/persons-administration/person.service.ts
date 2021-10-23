import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from '../domain/person';
import {mergeMap, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  public findAll(): Observable<Person[]> {
    return of(persons);
  }

  public findOne(id: number): Observable<Person | null> {
    return of(persons).pipe(mergeMap(p => p),
    first(person => person.id == id, null))
  }
}

export const persons: Person[] = [
  new Person(1, "Pepe", "Mostacho", 27),
  new Person(2, "Juan", "Lala", 17),
  new Person(3, "Sebastian", "Traipe", 23),
]