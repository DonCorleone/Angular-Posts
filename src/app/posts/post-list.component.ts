import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { PostCategory } from '../post-categories/post-category';
import { PostCategoryService } from '../post-categories/post-category.service';

@Component({
  selector: 'pm-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  selectedCategory: string = '';
  textEnteredSubject = new BehaviorSubject('');
  textEntered$ = this.textEnteredSubject.asObservable();

  // Autocomplete the categories going to the server each time
  categories2$ = this.textEntered$.pipe(
    debounceTime(1000),
    switchMap(enteredText => this.postCategoryService.getCategorySuggestions(enteredText)),
    map(categories => categories.sort((a, b) => a.name < b.name ? -1 : 1)),
    tap(result => console.log(JSON.stringify(result)))
  );

  // Autocomplete the categories going to the server one time
  categories$ = combineLatest([
    this.postCategoryService.allCategories$.pipe(
      map(categories => categories.sort((a, b) => a.name < b.name ? -1 : 1)),
      tap(result => console.log('After retrieve', JSON.stringify(result)))
    ),
    this.textEntered$.pipe(
      debounceTime(1000)
    )
  ]).pipe(
    map(([categories, enteredText]) => categories.filter(category => 
      category.name.toLocaleLowerCase().indexOf(enteredText.toLocaleLowerCase()) === 0))
  );

  constructor(private postCategoryService: PostCategoryService) { }

  ngOnInit(): void {
  }

  processText(text: string): void {
    // Emit the entered text
    this.textEnteredSubject.next(text);
    console.log('Entered text', text);
  }
}
