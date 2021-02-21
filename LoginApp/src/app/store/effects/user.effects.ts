import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Action } from '@ngrx/store';

import { Observable, pipe, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  //@Effect()
  //getClusterInfo = this.actions$
  //    .pipe(
  //      ofType(userActions.GET_USER),
  //    switchMap((action) => {
  //      return this.service.getUser(action.email, action.payload.password).pipe(
  //        map((data: UserProfile) => new userActions.LoginUser(data)),
  //        catchError((err: Error) => of(new userActions.AuthError(err))),
  //      );
  //    })
  //);

  getProfile$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.GET_USER),
    switchMap((action) => {
      var payload = action["payload"];
      return this.service.getUser(payload['email'], payload['password']).pipe(
        map((data: UserProfile[]) => new userActions.LoginUser(data)),
        catchError((err: Error) => of(new userActions.AuthError(err))) //make authError!
      );
    })
  ));


  //@Effect()
  //getProfiles$ = this.actions$.pipe(
  //  ofType(userActions.GET_USER),
  //  switchMap((action) => {
  //    var payload = action["payload"];
  //    return this.http.get<UserProfile[]>('/assets/users.json')
  //      .pipe(
  //        map((items) => {
  //          var profile = items.filter(item => item.login.email === payload['email'] && item.login.password === payload['password']);
  //          if (profile.length > 0)
  //            new userActions.LoginUser(profile);
  //          else
  //            new userActions.NotAuthenticated();
  //        })
  //      )
  //  })
  //);

  //@Effect() getUser$: Observable<userActions> = this.actions$.pipe(
  //  ofType(userActions.GET_USER),
  //  mergeMap(() => this.service.getUser('','').pipe(
  //    map(user => {
  //      var data: UserProfile = user;
  //      new userActions.LoginUser(data)
  //    }),
  //    catchError(error => throwError(error))
  //  ))
  //)

  login(payload: UserLogin) {
    this.store.dispatch(new userActions.GetUser(payload));
    return this.user$;
  }

}
