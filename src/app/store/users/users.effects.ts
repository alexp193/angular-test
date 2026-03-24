import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { catchError, EMPTY, filter, map, switchMap } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import * as UserActions from './users.actions';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => UserActions.loadUsers())
    )
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.setSelectedUser),
      filter(({ userId }) => userId != null),
      switchMap(({ userId }) =>
        this.userService.getUserDetails(userId as number).pipe(
          map((user) => UserActions.loadUserDetailsSuccess({ user })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
