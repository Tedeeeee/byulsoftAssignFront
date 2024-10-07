export interface UserData {
  memberId: number;
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

export type LoginData = Pick<UserData, 'memberEmail' | 'memberPassword'>;
