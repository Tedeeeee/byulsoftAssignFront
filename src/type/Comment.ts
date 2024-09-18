export interface Comment {
  commentId: number;
  memberId: number;
  memberNickname: string;
  commentUpdatedAt: string;
  commentContent: string;
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
