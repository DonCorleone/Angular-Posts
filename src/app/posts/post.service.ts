import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable, of, Subject, throwError, zip } from "rxjs";
import { catchError, groupBy, map, mergeMap, reduce, switchMap, tap, toArray } from "rxjs/operators";
import { PostCategoryService } from "../post-categories/post-category.service";
import { UserService } from "../users/user.service";

import { Post } from "./post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'api/posts';

  allPosts$ = this.http.get<Post[]>(this.postsUrl);

  // Match up posts with their category name and sort by the category name.
  postsWithCategorySorted$ = combineLatest([
    this.allPosts$,
    this.categoryService.allCategories$
  ]).pipe(
    // Match up each post's category id with the category name
    map(([posts, categories]) => posts.map(post => ({
      ...post,
      category: categories.find(c => post.categoryId === c.id)?.name
    }) as Post)),
    // Sort by category name
    map(posts => posts.sort((a, b) => (a.category || '') < (b.category || '') ? -1 : 1))
  );

  // Group all posts by category, sorted on the category name
  postsGroupedByCategory$ = this.postsWithCategorySorted$.pipe(
    // Emit the array elements one by one for the groupBy
    mergeMap(posts => posts),
    groupBy(post => post.categoryId, post => post),
    // Merge each grouped set of posts
    mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
    // Emit one array of the grouped results
    toArray()
  );

  // Group all posts by category and sorted on the category name
  // All in one pipeline
  postsGroupedByCategory2$ = combineLatest([
    this.allPosts$,
    this.categoryService.allCategories$
  ]).pipe(
    mergeMap(([posts, categories]) => {
      // Match up each post's category id with the category name
      const mappedPosts = posts.map(post => ({
        ...post,
        category: categories.find(c => post.categoryId === c.id)?.name
      }) as Post);
      // Sort by category name
      mappedPosts.sort((a, b) => (a.category || '') < (b.category || '') ? -1 : 1);
      return mappedPosts;
    }),
    groupBy(post => post.categoryId, post => post),
    mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
    toArray(),
  );

  selectedCategorySubject = new BehaviorSubject<number>(0);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  postsForCategory$ = combineLatest([
    this.selectedCategory$,
    this.categoryService.allCategoriesSorted$
  ]).pipe(
    switchMap(([categoryId, categories]) => (categoryId === 0) ? of([]) :
      this.http.get<Post[]>(`${this.postsUrl}?categoryId=${categoryId}`).pipe(
        map(posts => posts.map(post => ({
          ...post,
          category: categories.find(c => post.categoryId === c.id)?.name
        }) as Post))
      ))
  );

  selectedUserSubject = new Subject<string>();
  selectedUser$ = this.selectedUserSubject.asObservable();

  postsForUser$ = this.selectedUser$.pipe(
    switchMap(userName => this.userService.getUserId(userName)),
    switchMap(userId => this.getPostsForUser(userId))
  );

  constructor(private http: HttpClient,
    private userService: UserService,
    private categoryService: PostCategoryService) { }

  private getPostsForUser(userId: number): Observable<Post[]> {
    const posts$ = this.http.get<Post[]>(`${this.postsUrl}?userId=${userId}`).pipe(
      catchError(this.handleError)
    )
    return combineLatest([
      posts$,
      this.categoryService.allCategoriesSorted$
    ]).pipe(
      map(([posts, categories]) => posts.map(post => ({
        ...post,
        category: categories.find(c => post.categoryId === c.id)?.name
      }) as Post)),
    )
  }

  selectedCategoryChanged(categoryId: number): void {
    this.selectedCategorySubject.next(categoryId);
  }

  selectedUserChanged(userName: string): void {
    this.selectedUserSubject.next(userName);
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