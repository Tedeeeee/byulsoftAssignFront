export interface UserData {
  memberEmail: string;
  memberPassword: string;
  memberName: string;
  memberNickname: string;
  memberPhoneNumber: string;
}

export interface UserRegistData extends UserData {
  confirmPassword: string;
  emailCheck: boolean;
  nicknameCheck: boolean;
}
