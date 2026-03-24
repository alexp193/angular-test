import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from '../models/user.model';

const MOCK_USERS: User[] = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Brown' },
];

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(): Observable<User[]> {
    return of(MOCK_USERS).pipe(delay(500));
  }

  getUserDetails(id: number): Observable<User> {
    const user = MOCK_USERS.find((u) => u.id === id) ?? MOCK_USERS[0];
    return of(user).pipe(delay(300));
  }
}
