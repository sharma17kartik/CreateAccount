import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}
  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(
    lastName: string,
    firstName: string,
    email: string,
    password: string
  ) {
    const post: Post = {
      id: null,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/accounts',
        post
      )
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPost = this.posts.filter((post) => post.id != postId);
        this.posts = updatedPost;
        this.postUpdated.next([...this.posts]);
      });
  }
}
