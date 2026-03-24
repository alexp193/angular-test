import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { OrderService } from '../../core/services/order.service';
import * as OrderActions from './orders.actions';

@Injectable()
export class OrdersEffects {
  private actions$ = inject(Actions);
  private orderService = inject(OrderService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => OrderActions.loadOrders())
    )
  );

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      switchMap(() =>
        this.orderService.getOrders().pipe(
          map((orders) => OrderActions.loadOrdersSuccess({ orders })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
