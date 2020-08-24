import axios from "axios";
import qs from "util/qs";
const baseUrl = "https://www.balldontlie.io/api/v1";

export interface Player {
  id: number;
  height_feet: number | null;
  height_inches: number | null;
  weight_pounds: number | null;
  first_name: string;
  last_name: string;
  position: string;
  team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
}

export interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface Meta {
  total_pages: number;
  current_page: number;
  next_page: null | number;
  per_page: number;
  total_count: number;
}

export const isLastPage = (next_page: null | number) => next_page === null;

export interface GetAllPlayersParams {
  search?: string;
  page?: number;
  per_page?: number;
}

export interface GetAllPlayersResult {
  data: Player[];
  meta: Meta;
}
export async function getAllPlayers(params: GetAllPlayersParams) {
  const url = `${baseUrl}/players?${qs(params)}`;

  const { data } = await axios.get<GetAllPlayersResult>(url);

  return data;
}

export async function getPlayer(id: number) {
  const url = `${baseUrl}/players/${id}`;

  const { data } = await axios.get<Player>(url);

  return data;
}

export interface GetAllTeamsParams {
  page?: number;
  per_page?: number;
}

export interface GetAllTeamsResult {
  data: Team[];
  meta: Meta;
}

export async function getAllTeams(params: GetAllTeamsParams) {
  const url = `${baseUrl}/teams?${qs(params)}`;

  const { data } = await axios.get<GetAllTeamsResult>(url);

  return data;
}

export async function getTeam(id: number) {
  const url = `${baseUrl}/teams/${id}`;

  const { data } = await axios.get<Player>(url);

  return data;
}

//////////#################################################/////////////////
// instead of axios i could have used a custom fetch if needed

export enum HttpType {
  POST,
  GET,
  DELETE,
  PATCH,
  PUT,
}
export interface Loader<T> {
  start: () => void;
  end: (res: T) => void;
}

//example: call(
//   HttpType.POST,
//   "/login",
//   {
//     start: () => {
//
//     },
//     end: (res) => {
//
//     },
//   },
//   {
//     login: "loginValue",
//     password: "passwordValue",
//   }
// );

export const call = async <T>(
  type: HttpType,
  url: string,
  loader?: Loader<T>,
  payload?: any,
  signal?: AbortSignal
) => {
  try {
    const localToken = "##";

    loader && loader.start();

    const response = await fetch(url, {
      method: HttpType[type],
      body: payload ? JSON.stringify(payload) : null,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
      signal,
    });

    if (!response.ok || response.status === 202) throw response;

    let result = await response.json();

    loader && loader.end(result);
    return result;
  } catch (error) {
    loader && loader.end(error);
    throw error;
  }
};
