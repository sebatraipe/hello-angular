import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Brand } from '../domain/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private resourceUrl: string = environment.backendUrl + "brand";

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(this.resourceUrl).pipe(
      map(brands => 
        brands.map(b => new Brand(b.id, b.name, b.models))
      )
    )
  }
}