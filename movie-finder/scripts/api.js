const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBlZjI1YzUzZWEwYTMxMmI2ZTA5YTA5NmVhNDdmMyIsIm5iZiI6MTc3NTE3MzA2NS42NDcsInN1YiI6IjY5Y2VmZGM5Nzk0Y2EzODQ0NjBiOGQ2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nPRd7dALWzT_2-mKKtCDRwV208ekZmbtC0k3EAnIpzI";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchTmdbData(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`TMDb request failed: ${response.status}`);
  }

  return response.json();
}

export async function searchMovies(query) {
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;
  const data = await fetchTmdbData(url);
  return data.results || [];
}

export async function getMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}`;
  return fetchTmdbData(url);
}

export async function getMovieProviders(movieId) {
  const url = `${BASE_URL}/movie/${movieId}/watch/providers`;
  const data = await fetchTmdbData(url);

  // US first, then fallback to any region if needed
  if (data.results?.US) return data.results.US;

  const firstRegion = Object.values(data.results || {})[0];
  return firstRegion || null;
}