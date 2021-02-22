import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, mergeMap, concatMap } from 'rxjs/operators';

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
    map(action => action["payload"])
    ,switchMap(payload => this.service.getUser(payload['email'], payload['password']).pipe(
      map((response) => {
        return new userActions.LoginUser(response);
      })
      ,catchError((err: Error) => {
        return throwError(err)
      })
      , catchError((err: Error) => {
        if (err.message === 'Incorrect password') return of(new userActions.NotAuthenticated());
        if (err.message === 'No user found') return of(new userActions.AuthError());
      })
    ))
    
  );

  login(payload: UserLogin) {
    this.store.dispatch(new userActions.GetUser(payload));
    return this.user$;
  }

}
