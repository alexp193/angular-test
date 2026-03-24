import { createAction, props } from '@ngrx/store';
import { Order } from '../../core/models/order.model';

export const loadOrders = createAction('[Orders] Load Orders');

export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: Order[] }>()
);

export const upsertOrder = createAction(
  '[Orders] Upsert Order',
  props<{ order: Order }>()
);

export const removeOrder = createAction(
  '[Orders] Remove Order',
  props<{ id: number }>()
);
