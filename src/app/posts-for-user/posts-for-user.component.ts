import { Component, OnInit } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostService } from '../posts/post.service';

@Component({
  templateUrl: './posts-for-user.component.html',
  styleUrls: ['./posts-for-user.component.css']
})
export class PostsForUserComponent implements OnInit {
  title = 'Posts for User';
  userName = '';

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  postsForUser$ = this.postService.postsForUser$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  getPosts(): void {
    this.postService.selectedUserChanged(this.userName);
  }
}
