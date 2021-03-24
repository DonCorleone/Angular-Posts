import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { PostCategory } from "./post-category";

@Injectable({
  providedIn: 'root'
})
export class PostCategoryService {
  private postCategoriesUrl = 'api/postCategories';

  allCategories$ = this.http.get<PostCategory[]>(this.postCategoriesUrl);

  constructor(private http: HttpClient) { }

  getCategorySuggestions(enteredText: string): Observable<PostCategory[]> {
    return this.http.get<PostCategory[]>(this.postCategoriesUrl + '?name=^' + enteredText);
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