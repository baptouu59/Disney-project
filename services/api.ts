import axios from 'axios';
import { ApiResponse, DisneyCharacter } from '../types';

const API_BASE_URL = 'https://api.disneyapi.dev/character';


export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


export const fetchDisneyCharacters = async (page: number = 1): Promise<DisneyCharacter[]> => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}`, {
      params: { page }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Disney characters:', error);
    return [];
  }
};

export const fetchDisneyCharacterById = async (id: number): Promise<DisneyCharacter | null> => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Disney character:', error);
    return null;
  }
};

interface GetCharactersParams {
  page?: number;
  name?: string;
}

export const getfiltredCharacters = async (params: GetCharactersParams = {}): Promise<ApiResponse<DisneyCharacter>> => {
  const { page = 1, name = "" } = params;

  const queryParams: Record<string, string | number> = {
    page,
  };

  if (name.trim().length > 0) {
    queryParams.name = name.trim();
  }

  const response = await apiClient.get<ApiResponse<DisneyCharacter>>("/character", {
    params: queryParams,
  });

  return response.data;
};