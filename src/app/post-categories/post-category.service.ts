import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable, throwError } from "rxjs";
import { debounceTime, map, shareReplay, switchMap, tap } from "rxjs/operators";
import { PostCategory } from "./post-category";

@Injectable({
  providedIn: 'root'
})
export class PostCategoryService {
  private postCategoriesUrl = 'api/postCategories';

  // Sort the categories for the type ahead display
  allCategories$ = this.http.get<PostCategory[]>(this.postCategoriesUrl).pipe(
    map(categories => categories.sort((a, b) => a.name < b.name ? -1 : 1)),
    shareReplay(1)
  );

  // Manual autocomplete the categories going to the server each time
  // Not currently used
  textEnteredSubject = new BehaviorSubject<string>('');
  textEntered$ = this.textEnteredSubject.asObservable();

  filteredCategories$ = this.textEntered$.pipe(
    debounceTime(250),
    switchMap(enteredText => this.getCategorySuggestions(enteredText)),
    map(categories => categories.sort((a, b) => a.name < b.name ? -1 : 1)),
    tap(result => console.log(JSON.stringify(result)))
  );

  // Manual autocomplete the categories going to the server one time
  // Not currently used
  filteredCategories2$ = combineLatest([
    this.allCategories$,
    this.textEntered$.pipe(
      debounceTime(250),
      tap(text => console.log('Entered', text))
    )
  ]).pipe(
    map(([categories, enteredText]) => categories.filter(category =>
      category.name.toLocaleLowerCase().indexOf(enteredText.toLocaleLowerCase()) === 0))
  );

  constructor(private http: HttpClient) { }

  private getCategorySuggestions(enteredText: string): Observable<PostCategory[]> {
    return this.http.get<PostCategory[]>(this.postCategoriesUrl + '?name=^' + enteredText);
  }

  processEnteredText(text: string): void {
    // Emit the entered text
    this.textEnteredSubject.next(text);
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}