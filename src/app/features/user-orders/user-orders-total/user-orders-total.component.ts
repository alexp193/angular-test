import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOrdersForSelectedUser } from '../../../store/orders/orders.selectors';

@Component({
  selector: 'app-user-orders-total',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="card">
      <h3>Orders Total</h3>
      <p>{{ total() | currency }}</p>
      <p>{{ orderCount() }} order(s)</p>
    </div>
  `,
})
export class UserOrdersTotalComponent {
  private store = inject(Store);
  private orders = this.store.selectSignal(selectOrdersForSelectedUser);

  protected total = computed(() => this.orders().reduce((sum, o) => sum + o.total, 0));
  protected orderCount = computed(() => this.orders().length);
}
