export type MovieType = {
  id?: string;
  name: string;
  coverUrl: string;
  releaseDate: Date;
};

export type Movie = {
  id: string;
  name: string;
  coverUrl: string;
  releaseDate: Date;
  comments: CommentType[];
};

export type TagEntriesType = {
  tagId: number;
  name: string;
  entries?: number;
};

export type TagType = {
  id: string;
  name: string;
};

export type CastType = {
  id?: string;
  name: string;
  role: string;
};

export type CastEntryType = {
  personId: string;
  name: string;
  role: string;
};

export type PersonType = {
  id?: string;
  name: string;
  profileImageUrl: string;
};

export type AllMovieInfoType = {
  movie: Movie;
  favorites: number;
  tags: TagEntriesType[];
  castMembers: CastEntryType[];
};

//Account types
export type UserLoginType = {
  email: string;
  password: string;
};

export type UserInfoType = {
  id: string;
  email: string;
  token: string;
  username: string;
  profileImageUrl: string;
};
export type UserRegisterType = {
  password: string;
  username: string;
  email: string;
};

export type ProfileType = {
  id: string;
  isLogedIn: boolean;
  imageUrl: string;
  name: string;
  creationDate: Date;
  recentFavorites: MovieType[];
  bio?: string;
};

export type MoviePageType = {
  movies: MovieType[];
  count: number;
};

export type MessageType = {
  code: string;
  text: string;
  error: boolean;
};

export type CommentType = {
  creator: CreatorType;
  message: string;
  postDate: Date;
};

export type CreatorType = {
  id: string;
  name: string;
  profileImageUrl: string;
};
