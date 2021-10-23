import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  home() {
    this.route.navigate(['home']);
  }

  persons() {
    this.route.navigate(['persons']);
  }

  buses() {
    this.route.navigate(['buses']);
  }

  trips() {
    this.route.navigate(['trips']);
  }
}