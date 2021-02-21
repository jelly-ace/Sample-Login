import { UserLogin, UserProfile } from '../models/user.model';

export interface AppState {
  userLogin: UserLogin[];
  userProfile: UserProfile[];
}
