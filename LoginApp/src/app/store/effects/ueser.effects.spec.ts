import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';
import { CommonService } from '../../services/common.service';
import { Statuses } from '../../shared/app.constants';
import { UserEffects } from './user.effects';
import { GetUser, LoginUser } from '../actions/user.action';
import { UserLogin, UserProfile } from '../../models/user.model';
import { HttpClientModule } from '@angular/common/http';


describe('UserEffects', () => {
  const initialState = { data: null, state: Statuses.EMPTY };

  const commonService = jasmine.createSpyObj('commonService', [
    'getUser'
  ]);
  let effects: UserEffects;
  let actions: Observable<any>;
  let store: MockStore<any>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UserEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: CommonService, useValue: commonService }
      ]
    });

    effects = TestBed.inject(UserEffects);
    store = TestBed.inject(MockStore);
    store.setState({});

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getProfile$', () => {
    it('should handle appLoaded and return a getAllSuccess action', () => {
      
      var payload: UserLogin = { email: 'sample@domain.com', password: '123456' }
      const user: UserProfile[] = [{
        id: 1,
        login: payload,
        firstName: '',
        lastName: ''
      }];
      const action = new GetUser(payload);
      const outcome = new LoginUser(user);

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: user });
        commonService.getUser.and.returnValue(response);

        expectObservable(effects.getProfile$).toBe('--b', { b: outcome });
      });
    });
  });

});
