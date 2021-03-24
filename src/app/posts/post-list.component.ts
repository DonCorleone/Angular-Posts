import { Component, OnInit } from '@angular/core';
import { PostCategory } from '../post-categories/post-category';
import { PostCategoryService } from '../post-categories/post-category.service';
import { PostService } from './post.service';

@Component({
  selector: 'pm-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  title = 'All Posts';
  selectedCategory: string = '';

  categories$ = this.postCategoryService.filteredCategories$;

  postsForCategory$ = this.postService.postsForCategory$;
  
  constructor(private postService: PostService, 
              private postCategoryService: PostCategoryService) { }

  ngOnInit(): void {
  }

  processText(text: string): void {
    this.postCategoryService.processEnteredText(text);
  }

  categorySelected(category: PostCategory): void {
    console.log('Category', category);
    this.postService.selectedCategoryChanged(category.id);
  }

  displayWith(category: PostCategory): string {
    return category?.name;
  }
}
