import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { usersFeature } from './store/users/users.reducer';
import { ordersFeature } from './store/orders/orders.reducer';
import { UsersEffects } from './store/users/users.effects';
import { OrdersEffects } from './store/orders/orders.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState(usersFeature),
    provideState(ordersFeature),
    provideEffects([UsersEffects, OrdersEffects]),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
