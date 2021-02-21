import { Injectable } from '@angular/core';
import { createAction, props, Action } from '@ngrx/store';
import { UserLogin, UserProfile } from '../../models/user.model';
import { CommonService } from '../../services/common.service';


export const GET_USER = '[Auth] Get User';
export const LOGIN_USER = '[Auth] Authenticated';
export const NOT_AUTHENTICATED = '[Auth] Not Authenticated';
export const AUTH_ERROR = '[Auth] Error';

//export const Login = createAction('${TYPE}', props<{ params: User }>());

export class GetUser implements Action {
  readonly type: string = GET_USER;
  constructor(public payload: UserLogin) {
    console.log('getUser', payload);
  }
}

export class LoginUser implements Action {
  readonly type: string = LOGIN_USER;
  constructor(public payload: UserProfile[]) {
    console.log('action login', payload);
    CommonService.setUserProfile(payload);
  }
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
  constructor(public payload?: any) { }
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload?: any) { console.log('error') }
}

export type Actions = GetUser | LoginUser | NotAuthenticated | AuthError;
