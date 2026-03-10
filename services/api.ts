import axios from 'axios';
import { DisneyCharacter } from '../types';

const API_BASE_URL = 'https://api.disneyapi.dev/character';


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


export const fetchDisneyCharacters = async (): Promise<DisneyCharacter[]> => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}`);
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