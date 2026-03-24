import { adapter, usersReducer, UsersState } from './users.reducer';
import * as UserActions from './users.actions';

describe('usersReducer', () => {
  const initialState: UsersState = adapter.getInitialState({
    selectedUserId: null,
  });

  it('should return the initial state', () => {
    const state = usersReducer(undefined, { type: '@@INIT' });
    expect(state.selectedUserId).toBeNull();
    expect(state.ids).toEqual([]);
  });

  it('should set all users on loadUsersSuccess', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const state = usersReducer(
      initialState,
      UserActions.loadUsersSuccess({ users })
    );
    expect(state.ids).toEqual([1, 2]);
    expect(state.entities[1]?.name).toBe('Alice');
  });

  it('should upsert a user on addUser (no duplicates)', () => {
    const user = { id: 1, name: 'Alice' };
    let state = usersReducer(initialState, UserActions.addUser({ user }));
    state = usersReducer(state, UserActions.addUser({ user: { ...user, name: 'Alice Updated' } }));
    expect(state.ids.length).toBe(1);
    expect(state.entities[1]?.name).toBe('Alice Updated');
  });

  it('should remove a user on deleteUser', () => {
    const users = [{ id: 1, name: 'Alice' }];
    let state = usersReducer(
      initialState,
      UserActions.loadUsersSuccess({ users })
    );
    state = usersReducer(state, UserActions.deleteUser({ id: 1 }));
    expect(state.ids.length).toBe(0);
  });

  it('should set selectedUserId on setSelectedUser', () => {
    const state = usersReducer(
      initialState,
      UserActions.setSelectedUser({ userId: 2 })
    );
    expect(state.selectedUserId).toBe(2);
  });

  it('should clear selectedUserId when set to null', () => {
    let state = usersReducer(
      initialState,
      UserActions.setSelectedUser({ userId: 2 })
    );
    state = usersReducer(state, UserActions.setSelectedUser({ userId: null }));
    expect(state.selectedUserId).toBeNull();
  });
});
