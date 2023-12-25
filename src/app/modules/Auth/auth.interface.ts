export type TUserRole = 'admin' | 'user';

export type TUserRegister = {
  username: string;
  email: string;
  password: string;
  role: TUserRole;
};

export type TUserLogin = {
  username: string;
  password: string;
};