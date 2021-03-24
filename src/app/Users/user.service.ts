import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { switchMap } from "rxjs/operators";

import { User } from "./user";

// OR the functionality can be in its own User Service
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'api/users';

  selectedUserSubject = new Subject<string>();
  selectedUser$ = this.selectedUserSubject.asObservable();

  user$ = this.selectedUser$.pipe(
    switchMap(userName => this.http.get<User>(`${this.usersUrl}?userName=${userName}`))
  );

  constructor(private http: HttpClient) { }

  selectedUserChanged(userName: string): void {
    this.selectedUserSubject.next(userName);
  }
}
