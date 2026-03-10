import { ApiResponse, DisneyCharacter } from "../types";
import { apiClient } from "./api";

interface GetCharactersParams {
  page?: number;
  name?: string;
}

export const getCharacters = async (
  params: GetCharactersParams = {}
): Promise<ApiResponse<DisneyCharacter>> => {
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

