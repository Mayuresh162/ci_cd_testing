import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getPost() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}

export class Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
