import { Component } from '@angular/core';
import { TokenStorageService } from '../services/storage.service';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent {
  currenUser:any;
  formattedDate: any;
  blogPost:any

  constructor(

private blogService:BlogService,
private storageService: TokenStorageService,
private router:Router,
private datePipe: DatePipe,

){}

ngOnInit(): void
{
  this.currenUser = this.storageService.getUser();
  console.log(this.storageService.getUser())
  if(this.storageService.getUser()===null){
    this.router.navigate(['/login/']);
  }
  //search by current logged id posts
  this.blogService.findByUserId(this.currenUser.id).subscribe((res:any)=>{
  this.blogPost=res
})

}
postView(id:any){
  this.router.navigate(['/postview/'+id ]);
}

formatDate(dateString: string): string {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date(dateString);
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}
logOut(){
  this.storageService.signOut();
  this.router.navigate(['/login/']);
}
}
