import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { UsersEffects } from './users.effects';
import { UserService } from '../../core/services/user.service';
import * as UserActions from './users.actions';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';

describe('UsersEffects', () => {
  let actions$: Observable<Action>;
  let effects: UsersEffects;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserService', [
      'getUsers',
      'getUserDetails',
    ]);

    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
        provideMockActions(() => actions$),
        { provide: UserService, useValue: spy },
      ],
    });

    effects = TestBed.inject(UsersEffects);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('init$ should dispatch loadUsers on ROOT_EFFECTS_INIT', (done) => {
    actions$ = of({ type: ROOT_EFFECTS_INIT });
    effects.init$.subscribe((action) => {
      expect(action).toEqual(UserActions.loadUsers());
      done();
    });
  });

  it('loadUsers$ should dispatch loadUsersSuccess', (done) => {
    const users = [{ id: 1, name: 'Alice' }];
    userService.getUsers.and.returnValue(of(users));
    actions$ = of(UserActions.loadUsers());
    effects.loadUsers$.subscribe((action) => {
      expect(action).toEqual(UserActions.loadUsersSuccess({ users }));
      done();
    });
  });

  it('loadUserDetails$ should dispatch loadUserDetailsSuccess on setSelectedUser', (done) => {
    const user = { id: 1, name: 'Alice' };
    userService.getUserDetails.and.returnValue(of(user));
    actions$ = of(UserActions.setSelectedUser({ userId: 1 }));
    effects.loadUserDetails$.subscribe((action) => {
      expect(action).toEqual(UserActions.loadUserDetailsSuccess({ user }));
      done();
    });
  });

  it('loadUserDetails$ should not emit when userId is null', () => {
    actions$ = of(UserActions.setSelectedUser({ userId: null }));
    let emitted = false;
    effects.loadUserDetails$.subscribe(() => (emitted = true));
    expect(emitted).toBeFalse();
  });
});
