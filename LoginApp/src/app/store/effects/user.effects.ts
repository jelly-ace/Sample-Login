import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { AppState } from '../../shared/app.state';
import { UserLogin, UserProfile } from '../../models/user.model';
import { UsersQuery } from '../reducers/user.reducer';

import * as userActions from '../actions/user.action';
import { CommonService } from '../../services/common.service';
import { createEffect, Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
type userActions = userActions.Actions;

@Injectable()
export class UserEffects {
  user$ = this.store.select(UsersQuery.getUser);

  constructor(
    private actions$: Actions, //effects
    private store: Store<AppState>,
    private service: CommonService,
    private http: HttpClient
  ) { }

  @Effect()
  getProfile$ = this.actions$.pipe(
    ofType<userActions>(userActions.GET_USER),
    map(action => action["payload"]),
    switchMap(payload => this.service.getUser(payload['email'], payload['password'])),
    map(response => {
      if (response.length > 0)
        return new userActions.LoginUser(response)
      else return new userActions.AuthError();
    }
    ));

  login(payload: UserLogin) {
    this.store.dispatch(new userActions.GetUser(payload));
    return this.user$;
  }


  //new
  //@Effect()
  //getProfile$ = this.actions$.pipe(
  //  ofType(userActions.GetUser),
  //  map(action => action["payload"]),
  //  switchMap(payload => this.service.getUser(payload['email'], payload['password'])),
  //  map(data => {
  //    if (data.length > 0)
  //      return userActions.LoginUser({ data })
  //    else return userActions.AuthError();
  //  }
  //  ));


  //login(data: UserLogin) {
  //  this.store.dispatch(userActions.GetUser({ data }));
  //  return this.user$;
  //}

}
