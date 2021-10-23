import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { __values } from 'tslib';
import { User } from 'src/app/domain/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /* Variable local que me dice si el usuario está logeado: false, no está logeado y true, si está logeado... */
  private _loggedIn: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private resourceUrl: string = environment.backendUrl + "login";
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient,
    private router: Router) {
  }


  /* Metodo que me dice si está logeado o no */
  get loggedIn(): Observable<User | null> {
    return this._loggedIn.asObservable().pipe(filter(user => user !== null));
  }

  login(username: string, password: string): Observable<any> {
    /* Declaracion de objeto */
    const login = {
      username: username,
      password: password
    }
    return this.httpClient.post<any>(this.resourceUrl, login).pipe(
      catchError(err => {
        let errorMsg: string;
        switch (err.status) {
          case 401:
            errorMsg = "Usuario y/o contraseña invalido.";
            break;
          default:
            errorMsg = "Error interno del servidor."
        }
        return throwError(errorMsg);        
      }), 
      tap(response => {
        localStorage.setItem(environment.tokenName, response.token);
        let decodeToken = this.jwtHelper.decodeToken(response.token);
        let user: User = new User(decodeToken.username);
        this._loggedIn.next(user);        
      })
    )
  }

  logout() {
    this._loggedIn.next(null);
    localStorage.removeItem(environment.tokenName);
    return this.router.navigate(['login']);
  }

  get token(): string | null {
    return localStorage.getItem(environment.tokenName);
  }

  isLoggedIn(): boolean {
    const token = this.token;
    if (token !== null && !this.jwtHelper.isTokenExpired(token)) {
      if (this._loggedIn.value === null) {
        let user: User = new User(this.jwtHelper.decodeToken(token));
        this._loggedIn.next(user);
      }
      return true;
    }
    return false;
  }
}