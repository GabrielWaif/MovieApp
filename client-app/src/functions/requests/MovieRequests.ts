import { uri } from "../../App";
import {
  AllMovieInfoType,
  Cast,
  CommentType,
  MoviePage,
  NewMovieInfo,
  NewPerson,
  PersonResponse,
  ProfileInfo,
  Tag,
  TagInfo,
} from "../../types/Types";
import {
  connectionFailString,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "./CreateRequest";

export const getMoviesAtPage = async (page: number) => {
  try {
    const response: MoviePage = await getRequest(`${uri}/Movies/page/${page}`);
    return response;
  } catch (ex) {
    throw ex;
  }
};

export const addMovie = async (movie: NewMovieInfo, token: string) => {
  try {
    const response = await postRequest(`${uri}/Movies/create`, movie, token);
    return response;
  } catch (ex: any) {
    throw ex;
  }
};

export const listMovieComments = async (movieId: string) => {
  try {
    const response: CommentType[] = await getRequest(
      `${uri}/Movies/${movieId}/comments`
    );
    const data = response.map((ct) => {
      return { ...ct, postDate: new Date(ct.postDate) };
    });
    return data;
  } catch (ex: any) {
    throw ex;
  }
};

export const addComment = async (
  message: string,
  movieId: string,
  token: string
) => {
  try {
    const response = await postRequest(
      `${uri}/Account/comment/${movieId}`,
      { message: message },
      token
    );
    return response;
  } catch (ex: any) {
    throw ex;
  }
};

export const updateMovie = async (movie: NewMovieInfo, token: string) => {
  try {
    const response: Response = await fetch(`${uri}/Movies/update`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    switch (response.status) {
      case 500:
        throw new Error("Error updating movie!");
    }
  } catch (ex: any) {
    if (ex.message === "Failed to fetch") {
      throw new Error(connectionFailString);
    }
    throw ex;
  }
};

export const addTag = async (tag: string, token: string) => {
  try {
    const response = await postRequest(
      `${uri}/Tags/create`,
      { name: tag },
      token
    );
    return response;
  } catch (ex: any) {
    throw ex;
  }
};

export const addPerson = async (person: NewPerson, token: string) => {
  try {
    const response: any = await postRequest(
      `${uri}/Cast/create`,
      person,
      token
    );
    return response;
  } catch (ex: any) {
    if (ex.message === "500") {
      throw new Error("Invalid name or url! Try again.");
    }
    throw ex;
  }
};

export const getMovie = async (id: string) => {
  try {
    const response: AllMovieInfoType = await getRequest(`${uri}/Movies/${id}`);
    return response;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};

export const getMoviesFromTagAtPage = async (page: number, id: string) => {
  try {
    const response: MoviePage = await getRequest(
      `${uri}/Tags/${id}/movies/${page}`
    );
    return response;
  } catch (ex) {
    throw ex;
  }
};

export const getMoviesFromPersonAtPage = async (page: number, id: string) => {
  try {
    const response: MoviePage = await getRequest(
      `${uri}/Cast/${id}/movies/${page}`
    );
    return response;
  } catch (ex) {
    throw connectionFailString;
  }
};

export const getMoviesFromSearchAtPage = async (
  page: number,
  search: string
) => {
  try {
    const response: MoviePage = await getRequest(
      `${uri}/Movies/search/${search}/${page}`
    );
    return response;
  } catch (ex) {
    throw ex;
  }
};

export const getPerson = async (id: string) => {
  try {
    const response: PersonResponse = await getRequest(
      `${uri}/Cast/person/${id}`
    );
    response.birthday = new Date(response.birthday);
    return response;
  } catch (ex: any) {
    throw ex;
  }
};

export const getTag = async (id: string) => {
  try {
    const response: Tag = await getRequest(`${uri}/Tags/${id}`);
    return response;
  } catch (ex) {
    throw ex;
  }
};

export const getTags = async () => {
  try {
    const response: TagInfo[] = await getRequest(`${uri}/Tags`);
    return response;
  } catch (ex) {
    throw ex;
  }
};

export const deleteMovie = async (movieId: string, token: string) => {
  const response: Response = await deleteRequest(
    `${uri}/Movies/${movieId}`,
    undefined
  );
};

export const deletePerson = async (personId: string, token: string) => {
  const response: Response = await deleteRequest(
    `${uri}/Cast/${personId}`,
    token
  );
  return response;
};

export const updatePerson = async (person: PersonResponse, token: string) => {
  const response: Response = await putRequest(
    `${uri}/Cast/update/`,
    person,
    token
  );
  return response;
};

export const deleteComment = async (commentId: string, token: string) => {
  const response: Response = await deleteRequest(
    `${uri}/Account/comment/${commentId}`,
    token
  );
  return response;
};

export const updateComment = async (comment: CommentType, token: string) => {
  const response: Response = await putRequest(
    `${uri}/Account/comment`,
    comment,
    token
  );
  return response;
};

export const getCast = async () => {
  try {
    const response: Cast[] = await getRequest(`${uri}/Cast`);
    return response;
  } catch (ex) {
    throw ex;
  }
};

export const addFavorite = async (
  movieId: string,
  desiredBool: boolean,
  token: string
) => {
  try {
    const response = await postRequest(
      `${uri}/Account/favorite`,
      { movieId, desiredBool },
      token
    );
    return response;
  } catch (ex) {
    throw ex;
  }
};

export const getIsFavorite = async (movieId: string, token: string) => {
  try {
    const response = await getRequest(
      `${uri}/Account/favorite/${movieId}`,
      token
    );
    return response;
  } catch (ex) {
    throw ex;
  }
};

export const getUserFavorites = async (
  page: number,
  userId: string,
  token: string
) => {
  try {
    const response: Response = await getRequest(
      `${uri}/Account/favorites/${userId}/${page}`,
      token
    );
    return response;
  } catch (ex) {
    throw ex;
  }
};

export const getProfile = async (userId: string, token?: string) => {
  try {
    let response: ProfileInfo = await getRequest(
      `${uri}/Account/profile/${userId}`,
      token
    );
    response = { ...response, creationDate: new Date(response.creationDate) };
    return response;
  } catch (ex) {
    throw ex;
  }
};
