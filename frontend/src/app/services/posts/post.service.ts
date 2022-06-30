import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share, shareReplay } from 'rxjs';
import { Post } from 'src/app/models/post';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  BACKEND_BASE_URL = "http://localhost:3000"
  URL_ADDITION = this.authService.isLoggedIn$() ? "/A" : ""

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPosts() {
    return this.http.get<Post[]>(`${this.BACKEND_BASE_URL}/posts${this.URL_ADDITION}`)
  }

  getPost(id: number) {
    return this.http.get<Post>(`${this.BACKEND_BASE_URL}/posts/${id}`)
  }

  createPost(post: Post) {
    return this.http.post<Post>(`${this.BACKEND_BASE_URL}/posts`, post)
  }

  deletePost(id: any) {
    return this.http.delete<void>(`${this.BACKEND_BASE_URL}/posts/${id}`)
  }
}
