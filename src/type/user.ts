export interface UserData {
  email: string;
  password: string;
  username: string;
  nickname: string;
  phoneNum: number;
}

export interface UserRegistData extends UserData {
  confirmPassword: string;
  emailCheck: boolean;
  nicknameCheck: boolean;
}
