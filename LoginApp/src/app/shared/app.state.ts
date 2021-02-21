import { UserLogin, UserProfile } from '../models/user.model';

export interface AppState {
  readonly userLogin: UserLogin[];
  readonly userProfile: UserProfile[];
}
