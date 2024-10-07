export interface BoardStar {
  boardStarId: number;
  boardId: number;
  boardStarType: string;
  boardStarShortReview: string;
  boardStarRating: number;
}

export interface Post {
  boardId: number;
  boardTitle: string;
  boardContent: string;
  memberNickname: string;
  boardRegion: string;
  boardCreatedAt: string;
  boardStars: BoardStar[];
  boardView: 0;
  boardLikes: 0;
}
