import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedUser } from '../../../store/users/users.selectors';

@Component({
  selector: 'app-user-name',
  standalone: true,
  template: `
    <div class="card">
      <h3>Selected User</h3>
      <p>{{ displayName() }}</p>
    </div>
  `,
})
export class UserNameComponent {
  private store = inject(Store);
  private selectedUser = this.store.selectSignal(selectSelectedUser);
  protected displayName = computed(() => this.selectedUser()?.name ?? 'None selected');
}
