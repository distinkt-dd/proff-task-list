export type TUserForRegister = {
  name: string;
  email: string;
  password: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type TPublicUser = Omit<TUser, 'password'>;

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserResponse = TPublicUser & Omit<TTokens, 'refreshToken'>;
