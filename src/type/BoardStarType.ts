export interface BoardStar {
  id: number;
  boardId: number;
  starType: string;
  starShortReview: string;
  starRating: number;
}

export interface Post {
  id: number;
  title: string;
  contents: string;
  region: string;
  nickname: string;
  createdAt: string;
  boardStars: BoardStar[];
  view: 0;
  likes: 0;
}
