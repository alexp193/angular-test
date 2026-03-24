import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setSelectedUser } from '../../store/users/users.actions';
import { selectAllUsers, selectSelectedUserId } from '../../store/users/users.selectors';
import { UserNameComponent } from './user-name/user-name.component';
import { UserOrdersTotalComponent } from './user-orders-total/user-orders-total.component';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [UserNameComponent, UserOrdersTotalComponent],
  template: `
    <div class="card">
      <h2>Select a User</h2>
      @for (user of users(); track user.id) {
        <button
          [class.active]="user.id === selectedUserId()"
          (click)="selectUser(user.id)"
        >
          {{ user.name }}
        </button>
      }
    </div>

    @if (selectedUserId()) {
      <app-user-name />
      <app-user-orders-total />
    } @else {
      <div class="card"><p>Select a user to see their orders.</p></div>
    }
  `,
})
export class UserOrdersComponent {
  private store = inject(Store);

  protected users = this.store.selectSignal(selectAllUsers);
  protected selectedUserId = this.store.selectSignal(selectSelectedUserId);

  selectUser(id: number): void {
    this.store.dispatch(setSelectedUser({ userId: id }));
  }
}
