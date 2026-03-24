import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { adapter as usersAdapter, UsersState } from '../users/users.reducer';
import { adapter as ordersAdapter, OrdersState } from './orders.reducer';
import { AppState } from '../app.state';
import {
  selectOrdersForSelectedUser,
  selectOrdersTotalForSelectedUser,
} from './orders.selectors';

const mockUsersState: UsersState = usersAdapter.setAll(
  [{ id: 1, name: 'Alice' }],
  usersAdapter.getInitialState({ selectedUserId: 1 })
);

const mockOrdersState: OrdersState = ordersAdapter.setAll(
  [
    { id: 1, userId: 1, total: 100 },
    { id: 2, userId: 1, total: 200 },
    { id: 3, userId: 2, total: 50 },
  ],
  ordersAdapter.getInitialState()
);

const initialState: AppState = {
  users: mockUsersState,
  orders: mockOrdersState,
};

describe('Orders Selectors', () => {
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
  });

  it('selectOrdersForSelectedUser should return only orders for user 1', (done) => {
    store.select(selectOrdersForSelectedUser).subscribe((orders) => {
      expect(orders.length).toBe(2);
      expect(orders.every((o) => o.userId === 1)).toBeTrue();
      done();
    });
  });

  it('selectOrdersTotalForSelectedUser should sum orders for user 1', (done) => {
    store.select(selectOrdersTotalForSelectedUser).subscribe((total) => {
      expect(total).toBe(300);
      done();
    });
  });

  it('selectOrdersForSelectedUser should return empty array when no user selected', (done) => {
    store.setState({
      ...initialState,
      users: { ...mockUsersState, selectedUserId: null },
    });
    store.select(selectOrdersForSelectedUser).subscribe((orders) => {
      expect(orders.length).toBe(0);
      done();
    });
  });
});
