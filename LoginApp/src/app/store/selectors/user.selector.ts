import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../reducers/user.reducer";
import { Statuses } from "../../shared/app.constants";

export const userState = createFeatureSelector<UserState>('user');

export const isLoading = createSelector(
  userState,
  (state: UserState) => state.status === Statuses.LOADING
);

export const isSuccess = createSelector(
  userState,
  (state: UserState) => state.status === Statuses.SUCCESS
);

export const isError = createSelector(
  userState,
  (state: UserState) => state.status === Statuses.ERROR
);

export const isNotAuthenticated = createSelector(
  userState,
  (state: UserState) => state.status === Statuses.NOTAUTHENTICATED
);
