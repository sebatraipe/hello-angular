import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Model } from '../domain/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private resourceUrl: string = environment.backendUrl + "model";

  constructor(private httpClient: HttpClient) { }

  public findAll(idBrand: number): Observable<Model[]> {
    return this.httpClient.get<Model[]>(this.resourceUrl + "/" + idBrand).pipe(
      catchError(error => {
        console.log("Error..", error);
        return throwError("No existe modelo");
      }),
      map(models => 
        models.map(m => new Model(m.id, m.name, m.brand))
      )
    )
  }
}