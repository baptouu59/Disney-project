import axios from 'axios';

const API_BASE_URL = 'https://api.disneyapi.dev/character';

export interface DisneyCharacter {
  _id: number;
  name: string;
  imageUrl: string;
  films?: string[];
  shortFilms?: string[];
  tvShows?: string[];
  videoGames?: string[];
  parkAttractions?: string[];
  allies?: string[];
  enemies?: string[];
  url: string;
}

export interface DisneyApiResponse {
  info?: {
    count?: number;
    totalPages?: number;
    previousPage?: string | null;
    nextPage?: string | null;
  };
  data: DisneyCharacter[];
}

export const fetchDisneyCharacters = async (
  page: number = 1,
  search: string = ''
): Promise<DisneyApiResponse> => {
  try {
    let url = `${API_BASE_URL}?page=${page}`;

    if (search.trim() !== '') {
      url += `&name=${encodeURIComponent(search)}`;
    }

    const response = await axios.get(url);

    return {
      info: response.data.info,
      data: response.data.data || [],
    };
  } catch (error) {
    console.error('Error fetching Disney characters:', error);
    return {
      info: undefined,
      data: [],
    };
  }
};

export const fetchDisneyCharacterById = async (id: number): Promise<DisneyCharacter | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Disney character:', error);
    return null;
  }
};