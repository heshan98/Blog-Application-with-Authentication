import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


import { TokenStorageService } from '../services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
currenUser:any
content?: string;
  loginForm:any

  roles: string[] = [];

  constructor(

      private _formBuilder: FormBuilder,
      private matSnackBar: MatSnackBar,
      private authService:AuthService,
      private storageService: TokenStorageService,
      private router:Router,

  ){}

  ngOnInit(): void
  {
    this.currenUser = this.storageService.getUser();

          this.loginForm = this._formBuilder.group({
          username   : ['', [Validators.required]],
          password: ['', Validators.required]
      });
      if (this.storageService.getToken()) {
          this.roles = this.storageService.getUser().roles;

      }
}
  submit(){
    const username=this.loginForm.get(['username']).value
    const password=this.loginForm.get(['password']).value
    this.authService.login(username, password).subscribe({
      next: data => {
        this.matSnackBar.open(
          "Login Succesful", 'OK', {
          verticalPosition: 'top',
          duration: 4000,
          panelClass: ['warning']
        });
        this.storageService.saveToken(data.accessToken);
        this.storageService.saveUser(data);


        this.roles = this.storageService.getUser().roles;

        this.router.navigate(['/allpost' ]);
      },
      error: err => {
          this.matSnackBar.open(
          err.error.message, 'OK', {
          verticalPosition: 'top',
          duration: 4000,
          panelClass: ['warning']
        })
      }
    });
  }


  }

