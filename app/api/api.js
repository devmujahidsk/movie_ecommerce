import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const videoTrailor = process.env.NEXT_PUBLIC_API_VIDEO_URL;
const fakeApiKey = process.env.NEXT_PUBLIC_API;

// FETCH FAKE API STORE
export const fakeStoreApi = async () => {
  try {
    const resp = await axios.get(`${fakeApiKey}/products`);
    return resp.data;
  } catch (error) {
    console.error(
      "Error fetching popular movies",
      error.response?.data || error
    );
    return [];
  }
};

// FETCH MOVIE API LISTING
export const getPopularMovies = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`);
    return resp.data.results;
  } catch (error) {
    console.error(
      "Error fetching popular movies",
      error.response?.data || error
    );
    return [];
  }
};

// FETCH MOVIE API DETAILS PAGE

export const getMovieDetails = async (movieId) => {
  try {
    const resp = await axios.get(
      `${apiUrl}/movie/${movieId}?api_key=${apiKey}`
    );
    return resp.data;
  } catch (error) {
    console.error(
      "Error fetching movie details",
      error.response?.data || error
    );
    return null;
  }
};

// FETCH MOVIE API
export const getTrailorVideos = async () => {
  try {
    const resp = await axios.get(`${videoTrailor}/${id}`);
    return resp.data.results;
  } catch (error) {
    console.error(
      "Error fetching popular movies",
      error.response?.data || error
    );
    return [];
  }
};
