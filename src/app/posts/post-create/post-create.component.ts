import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.less'],
})
export class PostCreateComponent {
  hide = true;
  constructor(public postService: PostService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.addPost(
      form.value.firstName,
      form.value.lastName,
      form.value.email,
      form.value.password
    );
    form.resetForm();
  }
}
