import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

export const addUser = createAction(
  '[Users] Add User',
  props<{ user: User }>()
);

export const updateUser = createAction(
  '[Users] Update User',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ id: number }>()
);

export const setSelectedUser = createAction(
  '[Users] Set Selected User',
  props<{ userId: number | null }>()
);

export const loadUserDetailsSuccess = createAction(
  '[Users] Load User Details Success',
  props<{ user: User }>()
);
