import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { PostCategory } from '../post-categories/post-category';
import { PostCategoryService } from '../post-categories/post-category.service';
import { PostService } from './post.service';

@Component({
  selector: 'pm-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  title = 'Posts by Category';
  selectedCategory!: PostCategory;

  categories$ = this.postCategoryService.filteredCategories$;

  postsForCategory$ = this.postService.postsForCategory$;

  constructor(private postService: PostService,
    private postCategoryService: PostCategoryService) { }

  ngOnInit(): void {
  }

  processText(text: string): void {
    console.log('Processed text', text);
    this.postCategoryService.processEnteredText(text);
  }

  categorySelected(category: any): void {
    console.log(category);
    this.postService.selectedCategoryChanged(category.id);
  }

  displayWith(category: PostCategory): string {
    return category?.name;
  }

  search: OperatorFunction<string, readonly PostCategory[]> = (text$: Observable<string>) =>
    combineLatest([text$, this.postCategoryService.filteredCategories$]).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      map(([text, categories]) => categories.filter(c => new RegExp(`^${text}`, 'i').test(c.name)))
    );

  formatter = (category: PostCategory) => category.name;
}
