import * as fromReducer from "./user.reducer";
import { createAction } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { UserProfile, UserLogin } from '../../models/user.model';
import { LoginUser, AuthError, GetUser } from '../actions/user.action';
import { Statuses } from '../../shared/app.constants';


describe('UserReducer', () => {
  //describe('unknown action', () => {
  //  it('should return the default state', () => {
  //    const { initialState } = fromReducer;
  //    const action = {
  //      type: "[Auth] Error"
  //    };
  //    const state = fromReducer.userReducer(initialState, action);

  //    expect(state).toBe(initialState);
  //  });
  //});

  describe('LOGIN_USER action', () => {
    it('should welcome user', () => {
      const { initialState } = fromReducer;
      const newState: Array<UserProfile> = [
        {
          id: 1,
          login: { email: 'sample@domain.com', password: '123456' },
          firstName: 'Sample',
          lastName: 'Domain'
        },
      ];
      const action = new LoginUser(newState);
      const state = fromReducer.userReducer(initialState, action);
      expect(state["data"][0]).toEqual(newState[0]);
    });

    it('should not welcome user on error', () => {
      const { initialState } = fromReducer;
      const newState: Array<UserProfile> = [];
      const action = new AuthError();
      const state = fromReducer.userReducer(initialState, action);
      expect(state["status"]).toEqual(Statuses.ERROR);
    });

    it('should get user profile and start loading', () => {
      const { initialState } = fromReducer;
      const login:  UserLogin = { email: 'sample@domain.com', password: '123456' }
      const action = new GetUser(login);
      const state = fromReducer.userReducer(initialState, action);
      expect(state["status"]).toEqual(Statuses.LOADING);
    });
  });

});
