import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share, shareReplay } from 'rxjs';
import { Post } from 'src/app/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  BACKEND_BASE_URL = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>(`${this.BACKEND_BASE_URL}/posts`)
  }

  getPost(id: number) {
    return this.http.get<Post>(`${this.BACKEND_BASE_URL}/posts/${id}`)
  }

  createPost(post: Post) {
    return this.http.post<Post>(`${this.BACKEND_BASE_URL}/posts`, post)
  }
}
