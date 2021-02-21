import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile, UserLogin } from '../models/user.model';
import { map, filter, tap } from 'rxjs/operators';

@Injectable()
export class CommonService {
  static userProfile: UserProfile;

  constructor(private http: HttpClient) { }

  getUser(email: string, password: string): Observable<UserProfile[]> {
    var login: UserLogin = { email: email, password: password };
    var userProfile = this.http.get<UserProfile[]>('/assets/users.json').pipe(
      map(items =>
        items.filter(item => item.login.email === login.email && item.login.password === login.password)));
    return userProfile;
  }

  public static setUserProfile(value) {
    this.userProfile = value;
  }

  public static getUserProfile(): UserProfile{
    return this.userProfile;
  }
}
