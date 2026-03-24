import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { adapter, UsersState } from './users.reducer';
import {
  selectSelectedUser,
  selectSelectedUserId,
  selectSelectedUserName,
  selectAllUsers,
} from './users.selectors';
import { AppState } from '../app.state';
import { OrdersState } from '../orders/orders.reducer';

const mockUsersState: UsersState = adapter.setAll(
  [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ],
  adapter.getInitialState({ selectedUserId: 1 })
);

const mockOrdersState: OrdersState = {
  ids: [],
  entities: {},
};

const initialState: AppState = {
  users: mockUsersState,
  orders: mockOrdersState,
};

describe('Users Selectors', () => {
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
  });

  it('selectAllUsers should return all users', (done) => {
    store.select(selectAllUsers).subscribe((users) => {
      expect(users.length).toBe(2);
      done();
    });
  });

  it('selectSelectedUserId should return 1', (done) => {
    store.select(selectSelectedUserId).subscribe((id) => {
      expect(id).toBe(1);
      done();
    });
  });

  it('selectSelectedUser should return Alice', (done) => {
    store.select(selectSelectedUser).subscribe((user) => {
      expect(user?.name).toBe('Alice');
      done();
    });
  });

  it('selectSelectedUserName should return "Alice"', (done) => {
    store.select(selectSelectedUserName).subscribe((name) => {
      expect(name).toBe('Alice');
      done();
    });
  });

  it('selectSelectedUser should return null when no user selected', (done) => {
    store.setState({
      ...initialState,
      users: { ...mockUsersState, selectedUserId: null },
    });
    store.select(selectSelectedUser).subscribe((user) => {
      expect(user).toBeNull();
      done();
    });
  });
});
