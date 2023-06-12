import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBlog } from './model/blog-model';

const baseUrl = 'http://localhost:8080/api/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id:any) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data:IBlog) {
    return this.http.post(baseUrl, data);
  }

  update(id:any, data:IBlog) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id:any) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByUserId(userId:any) {
    return this.http.get(`${baseUrl}?userId=${userId}`);
  }
}
