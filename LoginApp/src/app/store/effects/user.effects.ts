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

  //@Effect() getUser$: Observable<userActions> = this.actions$.ofType(userActions.GET_USER)
  //  .map((action: userActions.GetUser) => action.payload)
  //  .switchMap(payload => this.service.getUser())
  //  .delay(2000) // delay to show loading spinner, delete me!
  //  .map(data => {
  //    if (data) {
  //      /// User logged in
  //      const user = <UserProfile>data;
  //      return new userActions.LoginUser(data);
  //    } else {
  //      /// User not logged in
  //      return new userActions.NotAuthenticated();
  //    }

  //  })
  //  .catch(err => Observable.of(new userActions.AuthError()));

  //getProfile$ = createEffect(() => this.actions$.pipe(
  //  ofType(userActions.GET_USER),
  //  switchMap((action) => {
  //    var payload = action["payload"];
  //    var arr = this.service.getUser(payload['email'], payload['password']).pipe(
  //      mergeMap((data: UserProfile[]) => [new userActions.LoginUser(data)]),
  //      catchError((err: Error) => of(new userActions.AuthError(err))) //make authError!
  //    );

  //    return arr;
  //  })
  //));

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

}
