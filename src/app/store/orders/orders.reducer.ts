import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Order } from '../../core/models/order.model';
import * as OrderActions from './orders.actions';

export interface OrdersState extends EntityState<Order> {}

export const adapter = createEntityAdapter<Order>();

const initialState: OrdersState = adapter.getInitialState();

export const ordersFeature = createFeature({
  name: 'orders' as const,
  reducer: createReducer(
    initialState,

    on(OrderActions.loadOrdersSuccess, (state, { orders }) =>
      adapter.setAll(orders, state)
    ),

    on(OrderActions.upsertOrder, (state, { order }) =>
      adapter.upsertOne(order, state)
    ),

    on(OrderActions.removeOrder, (state, { id }) =>
      adapter.removeOne(id, state)
    )
  ),
  extraSelectors: ({ selectOrdersState }) => adapter.getSelectors(selectOrdersState),
});

export const ordersReducer = ordersFeature.reducer;
