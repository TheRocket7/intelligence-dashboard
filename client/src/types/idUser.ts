export interface IDUser {
  id: number;
  fullName: string;
  username: string;
  password?: string;
  role: string;
}

export interface IDLogInUser {
  username: string;
  password: string;
}
