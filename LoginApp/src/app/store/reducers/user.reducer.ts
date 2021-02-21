import { Injectable } from '@angular/core';
import { Action, createReducer, on } from '@ngrx/store';
import * as LoginAction from '../actions/user.action';
import { UserLogin, UserProfile } from '../../models/user.model';
import { Statuses } from '../../shared/app.constants';
import { AppState } from '../../shared/app.state';

export interface UserState {
  data: UserProfile;
  status: Statuses
}

export const initialState: UserState = {
  data: null,
  status: Statuses.EMPTY
};

export namespace UsersQuery {
  export const getUser = (state: AppState) => state.userProfile;
}

export function userReducer(state: UserState[], action: LoginAction.Actions) {
  switch (action.type) {
    case LoginAction.GET_USER:
      return [state, action.payload, status = Statuses.LOADING]

    case LoginAction.LOGIN_USER:
      return { ...state, data: action.payload, status: Statuses.SUCCESS }

    default:
      return state;
  }
}

