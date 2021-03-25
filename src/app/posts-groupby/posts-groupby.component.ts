import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts/post.service';

@Component({
  templateUrl: './posts-groupby.component.html',
  styleUrls: ['./posts-groupby.component.css']
})
export class PostsGroupbyComponent implements OnInit {
  title = 'All Posts Grouped by Category';

  postsGroupedByCategory$ = this.postService.postsGroupedByCategory$;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

}
