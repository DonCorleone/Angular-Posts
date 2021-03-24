import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { switchMap } from "rxjs/operators";

import { Post } from "./post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'api/posts';

  selectedCategorySubject = new BehaviorSubject<number>(0);
  selectedCategory$ = this.selectedCategorySubject.asObservable();
  
  allPosts$ = this.http.get<Post[]>(this.postsUrl);

  postsForCategory$ = this.selectedCategory$.pipe(
    switchMap(categoryId => this.http.get<Post[]>(this.postsUrl + (categoryId===0 ? '' : `?categoryId=${categoryId}`)))
  )

  constructor(private http: HttpClient) { }

  selectedCategoryChanged(categoryId: number): void {
    this.selectedCategorySubject.next(categoryId);
  }
}