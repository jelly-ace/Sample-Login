import { Action, createReducer, on } from '@ngrx/store';
import { UserLogin, UserProfile } from '../../models/user.model';
import { Statuses } from '../../shared/app.constants';
import { AppState } from '../../shared/app.state';
import * as userActions from "../actions/user.action";


export interface UserState {
  data: UserProfile[];
  status: Statuses
}

export const initialState: UserState = {
  data: null,
  status: Statuses.EMPTY
};

export namespace UsersQuery {
  export const getUser = (state: AppState) => state.userProfile;
}

export function userReducer(state: UserState = initialState, action: userActions.Actions) {
  switch (action.type) {
    case userActions.GET_USER:
      return { state, status: Statuses.LOADING }

    case userActions.LOGIN_USER:
      var arr = { ...state, data: action.payload, status: Statuses.SUCCESS } 
      console.log('reducer', arr.data, state)
      return arr
    case userActions.AUTH_ERROR:
      return { ...state, status: Statuses.ERROR }
    case userActions.NOT_AUTHENTICATED:
      return { ...state, status: Statuses.NOTAUTHENTICATED }
    default:
      return state;

  } 

}

//const user = createReducer(
//  initialState,
//  on(userActions.GetUser, (state) => {
//    return { state, status: Statuses.LOADING };
//  }),
//);

//export function userReducer(state: UserState | undefined, action: Action) {
//  return user(state, action);
//}

