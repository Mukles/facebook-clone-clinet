export interface userType {
  displayName: string | null;
  email: string | null;
  providerId: string | null;
  token: string;
}

export interface registerUser {
  userName: string | null;
  email: string | null;
  provider: string | null;
}

export interface userInputTypes {
  userName: string;
  email: string;
  dateOfBrith: string;
  password: string;
  gender: string;
  provider: string | null;
}

export interface loginType {
  email: string;
  password: string;
}
