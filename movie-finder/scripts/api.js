const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBlZjI1YzUzZWEwYTMxMmI2ZTA5YTA5NmVhNDdmMyIsIm5iZiI6MTc3NTE3MzA2NS42NDcsInN1YiI6IjY5Y2VmZGM5Nzk0Y2EzODQ0NjBiOGQ2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nPRd7dALWzT_2-mKKtCDRwV208ekZmbtC0k3EAnIpzI";
const BASE_URL = "https://api.themoviedb.org/3";


async function fetchData(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return await response.json();
}

export async function searchMovies(query) {
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;
  const data = await fetchData(url);
  return data.results || [];
}

export async function getMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}`;
  return await fetchData(url);
}

export async function getMovieProviders(movieId) {
  const url = `${BASE_URL}/movie/${movieId}/watch/providers`;
  const data = await fetchData(url);
  return data.results?.US || null;
}