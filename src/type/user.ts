export interface UserData {
  email: string;
  password: string;
  name: string;
  nickname: string;
  phoneNumber: string;
}

export interface UserRegistData extends UserData {
  confirmPassword: string;
  emailCheck: boolean;
  nicknameCheck: boolean;
}
