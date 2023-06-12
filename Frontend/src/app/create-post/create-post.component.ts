import { Component } from '@angular/core';
import { TokenStorageService } from '../services/storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Blog, IBlog } from '../services/model/blog-model';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  blogId: any;
  blogObject: any
  currenUser: any;
  blogForm = this.form.group({
    title: [],
    author: [],
    content: [],
    userId: [],
  });
  constructor(

    private form: FormBuilder,
    private matSnackBar: MatSnackBar,
    protected activatedRoute: ActivatedRoute,
    private storageService: TokenStorageService,
    private blogService: BlogService,
    private router: Router,

  ) { }
  ngOnInit(): void {
    //checks logged user exist
    if(this.storageService.getUser()===null){
      this.router.navigate(['/login/']);
    }
    this.currenUser = this.storageService.getUser();
    // console.log(this.currenUser.id)
    this.blogForm.get(['userId'])!.patchValue(this.currenUser.id);
    this.blogForm.get(['author'])!.patchValue(this.currenUser.username);

    this.activatedRoute.params.subscribe((response: any) => {
      this.blogId = (response['id'])
      // console.log(this.blogId)
      this.blogService.get(this.blogId).subscribe((res: any) => {

        this.blogForm.get(['title'])!.patchValue(res.title);
        this.blogForm.get(['content'])!.patchValue(res.content);

      })
    })

  }
  private createForm(): IBlog {
    return {

      ...new Blog(),

      title: this.blogForm.get(['title'])!.value,
      author: this.blogForm.get(['author'])!.value,
      content: this.blogForm.get(['content'])!.value,
      userId: this.blogForm.get(['userId'])!.value
    };
  }
  submit() {
    const submit = this.createForm();

    this.blogService.create(submit).subscribe({
      next: data => {
        this.matSnackBar.open(
          "Succesfully Created", 'OK', {
          verticalPosition: 'top',
          duration: 4000,
          panelClass: ['warning']
        });
        this.router.navigate(['/allpost']);
      },
      error: err => {

        this.matSnackBar.open(
          'Missing Fields', 'OK', {
          verticalPosition: 'top',
          duration: 4000,
          panelClass: ['warning']
        })
      }
    });


  }
  updatePost() {
    const submit = this.createForm();

    this.blogService.update(this.blogId, submit).subscribe(res => {
      this.router.navigate(['/allpost']);
      this.matSnackBar.open(
        "Updated Succesfully", 'OK', {
        verticalPosition: 'top',
        duration: 4000,
        panelClass: ['warning']
      })
    })
  }
  logOut(){
    this.storageService.signOut();
    this.router.navigate(['/login/']);
  }
}
