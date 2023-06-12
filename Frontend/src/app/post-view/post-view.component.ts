import { Component } from '@angular/core';
import { TokenStorageService } from '../services/storage.service';
import { BlogService } from '../services/blog.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent {
  blogId:any;
  formattedDate: any;
  currenUser:any
  blogForm = this.form.group({
    title           : [],
    author          : [],
    content       : [],
    userId:[],
});
  constructor(

    private form: FormBuilder,
    private matSnackBar: MatSnackBar,
    private datePipe: DatePipe,
    private storageService: TokenStorageService,
    private blogService:BlogService,
    protected activatedRoute: ActivatedRoute,
    private router:Router,

){}
ngOnInit(): void
{

  this.activatedRoute.params.subscribe(response => {
    this.blogId= (response['id'])

    this.blogService.get(this.blogId).subscribe((res:any)=>{
    this.blogForm.get(['title'])!.patchValue(res.title);
    this.blogForm.get(['author'])!.patchValue(res.author);
    this.blogForm.get(['content'])!.patchValue(res.content);
    this.formattedDate = this.datePipe.transform(res.createdAt, 'MMM dd, yyyy');

      // alert(this.formattedDate)
    })
  })


}
deletePost(){
  this.blogService.delete(this.blogId).subscribe(res=>{

    this.router.navigate(['/allpost' ]);
    this.matSnackBar.open(
      "Deleted Successfully", 'OK', {
      verticalPosition: 'top',
      duration: 4000,
      panelClass: ['warning']
    })
  })
}


postEdit(){
  this.router.navigate(['/updatepost/'+this.blogId ]);
}


}
