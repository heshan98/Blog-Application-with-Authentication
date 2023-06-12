import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm = this.form.group({
    userName: [],
    email: [],
    password: [],
  });

  constructor(

    private form: FormBuilder,
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private router: Router

  ) { }
  submit() {
    const username = this.signUpForm.get(['userName'])!.value
    const email = this.signUpForm.get(['email'])!.value
    const password = this.signUpForm.get(['password'])!.value

    this.authService.register(username, email, password).subscribe({
      next: data => {
        this.matSnackBar.open(
          'Successfully Registered', 'OK', {
          verticalPosition: 'top',
          duration: 4000,
          panelClass: ['warning']
        })
        this.router.navigate(['/login']);
      },
      error: err => {

        this.matSnackBar.open(
          err.error.message, 'OK', {
          verticalPosition: 'top',
          duration: 4000,
          panelClass: ['warning']
        })
      }
    })
  }
}
