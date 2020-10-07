export interface UserData {
  id: number,
  email: string,
  name: string,
  avatar: string
}

export interface Film {
  id: number,
  title: string,
  cover: string,
  previewVideo: string,
  posterImage: string,
  backgroundImage: string,
  genre: string,
  released: number,
  rating: number,
  ratingsCount: number,
  description: string,
  director: string,
  starring: string[],
  runTime: number,
  previewImage: string,
  backgroundColor: string,
  videoMain: string,
  isFavorite: boolean
}

export interface Comment {
  id: number,
  text: string,
  rating: number,
  userName: string,
  date: Date
}
