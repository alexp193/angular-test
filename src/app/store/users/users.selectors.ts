import { createSelector } from '@ngrx/store';
import { usersFeature } from './users.reducer';

export const {
  selectUsersState,
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
  selectSelectedUserId,
} = usersFeature;

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (entities, selectedId) => (selectedId != null ? entities[selectedId] : null)
);

export const selectSelectedUserName = createSelector(
  selectSelectedUser,
  (user) => user?.name ?? ''
);
