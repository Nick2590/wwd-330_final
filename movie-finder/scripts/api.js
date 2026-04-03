const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBlZjI1YzUzZWEwYTMxMmI2ZTA5YTA5NmVhNDdmMyIsIm5iZiI6MTc3NTE3MzA2NS42NDcsInN1YiI6IjY5Y2VmZGM5Nzk0Y2EzODQ0NjBiOGQ2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nPRd7dALWzT_2-mKKtCDRwV208ekZmbtC0k3EAnIpzI";
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query) {
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movies.");
  }

  const data = await response.json();
  return data.results || [];
}