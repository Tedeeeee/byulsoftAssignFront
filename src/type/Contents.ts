export const regionOptions = ['서울', '부산', '대구', '광주', '인천'];

export interface TotalContents {
  title: string;
  content: string;
  region: string;
  difficulty: string;
  difficultyRating: number;
  horror: string;
  horrorRating: number;
  story: string;
  storyRating: number;
  activity: string;
  activityRating: number;
  interior: string;
  interiorRating: number;
}

export interface ContentDetail extends TotalContents {
  view: number;
  likes: number;
  createDate: string;
}
