import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { authInterceptorProviders } from './inceptor/http.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogManagementComponent } from './blog-management/blog-management.component';
import {MatIconModule} from '@angular/material/icon';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostViewComponent } from './post-view/post-view.component';
import { DatePipe } from '@angular/common';
const appRoutes: Routes = [

  {path: 'postview/:id',
  component: PostViewComponent,},
  {path: 'signup',
  component: SignupComponent,},
  {path: 'login',
  component: LoginComponent,},
  {path: 'allpost',
  component: BlogManagementComponent,},
  {path: 'createpost',
  component: CreatePostComponent,},
  {path: 'updatepost/:id',
  component: CreatePostComponent,},
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    BlogManagementComponent,
    CreatePostComponent,
    PostViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forRoot([
      {path: '**', component: LoginComponent}  //first page
    ]),
  ],
  providers: [authInterceptorProviders,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
