import { createSelector } from '@ngrx/store';
import { ordersFeature } from './orders.reducer';
import { selectSelectedUserId } from '../users/users.selectors';

export const {
  selectOrdersState,
  selectAll: selectAllOrders,
} = ordersFeature;

export const selectOrdersForSelectedUser = createSelector(
  selectAllOrders,
  selectSelectedUserId,
  (orders, selectedId) =>
    selectedId != null ? orders.filter((o) => o.userId === selectedId) : []
);

export const selectOrdersTotalForSelectedUser = createSelector(
  selectOrdersForSelectedUser,
  (orders) => orders.reduce((sum, o) => sum + o.total, 0)
);
