export type TUserRole = 'admin' | 'user';
export type TPasswordHistory = {
  password: string;
  changedAt: Date;
};

export type TUserRegister = {
  username: string;
  email: string;
  password: string;
  role: TUserRole;
  passwordHistory: TPasswordHistory[];
};

export type TUserLogin = {
  username: string;
  password: string;
};

export type TChangePassword = {
  currentPassword: string;
  newPassword: string;
};
