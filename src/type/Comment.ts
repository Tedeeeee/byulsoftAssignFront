export interface Comment {
  id: number;
  memberId: number;
  username: string;
  date: string;
  text: string;
  replies: Reply[];
  newReply: string;
  showReplyForm: boolean;
  isEdit: boolean;
}

export interface Reply {
  username: string;
  date: string;
  text: string;
}
