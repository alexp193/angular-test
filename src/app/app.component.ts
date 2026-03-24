import { Component } from '@angular/core';
import { UserOrdersComponent } from './features/user-orders/user-orders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserOrdersComponent],
  template: `
    <h1>User orders</h1>
    <app-user-orders />
  `,
})
export class AppComponent {}
