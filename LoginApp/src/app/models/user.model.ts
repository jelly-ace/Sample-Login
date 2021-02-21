export interface UserProfile {
  id: number;
  login: UserLogin;
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
