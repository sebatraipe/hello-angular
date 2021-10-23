import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/security/service/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn())
      this.router.navigate(['home']);
    this.loading = false;
  }

  login() {
    this.loading = true;
    this.authService.login(
      this.loginForm?.value.username,
      this.loginForm?.value.password
    ).subscribe(token => {
      this.router.navigate(['home']);
    }, error => {
      this.snackBar.open(error, "Error..", {duration: 2000});
      this.loading = false;
    })
  }

  public get fc() {
    return this.loginForm.controls;
  }
}