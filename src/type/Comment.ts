export interface Comment {
  username: string;
  date: string;
  text: string;
  replies: Reply[];
  newReply: string;
  showReplyForm: boolean;
}

export interface Reply {
  username: string;
  date: string;
  text: string;
}
