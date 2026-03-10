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

export const fetchDisneyCharacters = async (): Promise<DisneyCharacter[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Disney characters:', error);
    return [];
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