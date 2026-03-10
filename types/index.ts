export interface ApiInfo {
  totalPages: number;
  count: number;
  previousPage: string | null;
  nextPage: string | null;
}

export interface DisneyCharacter {
  _id: number;
  name: string;

  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];

  allies: string[];
  enemies: string[];

  sourceUrl: string;
  imageUrl: string;

  createdAt: string;
  updatedAt: string;

  url: string;

  __v: number;
}

export interface ApiResponse<T> {
  info: ApiInfo;
  data: T[];
}

export interface GetCharactersParams {
  page?: number;
  name?: string;
}