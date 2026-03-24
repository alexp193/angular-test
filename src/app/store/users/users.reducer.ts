import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../core/models/user.model';
import * as UserActions from './users.actions';

export interface UsersState extends EntityState<User> {
  selectedUserId: number | null;
}

export const adapter = createEntityAdapter<User>();

const initialState: UsersState = adapter.getInitialState({
  selectedUserId: null,
});

export const usersFeature = createFeature({
  name: 'users' as const,
  reducer: createReducer(
    initialState,

    on(UserActions.loadUsersSuccess, (state, { users }) =>
      adapter.setAll(users, state)
    ),

    on(UserActions.addUser, (state, { user }) =>
      adapter.upsertOne(user, state)
    ),

    on(UserActions.updateUser, (state, { user }) =>
      adapter.upsertOne(user, state)
    ),

    on(UserActions.loadUserDetailsSuccess, (state, { user }) =>
      adapter.upsertOne(user, state)
    ),

    on(UserActions.deleteUser, (state, { id }) =>
      adapter.removeOne(id, state)
    ),

    on(UserActions.setSelectedUser, (state, { userId }) => ({
      ...state,
      selectedUserId: userId,
    }))
  ),
  extraSelectors: ({ selectUsersState }) => adapter.getSelectors(selectUsersState),
});

export const usersReducer = usersFeature.reducer;
