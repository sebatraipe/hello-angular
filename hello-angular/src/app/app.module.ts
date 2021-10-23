import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonModule } from './person/person.module';
import { PersonsAdministrationModule } from './persons-administration/persons-administration.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthenticationService } from './security/service/authentication.service';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { TokenInterceptor } from './security/interceptor/token-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { InicioModule } from './inicio/inicio.module';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginFormComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PersonsAdministrationModule,
    PersonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    InicioModule
  ],
  providers: [AuthenticationService,
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }