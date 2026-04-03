export function filterMoviesByRating(movies, minRating) {
  return movies.filter((movie) => movie.vote_average >= minRating);
}

export function sortMovies(movies, sortBy) {
  const copiedMovies = [...movies];

  if (sortBy === "rating") {
    return copiedMovies.sort((a, b) => b.vote_average - a.vote_average);
  }

  if (sortBy === "year") {
    return copiedMovies.sort(
      (a, b) => Number((b.release_date || "0").slice(0, 4)) - Number((a.release_date || "0").slice(0, 4))
    );
  }

  return copiedMovies.sort((a, b) => b.popularity - a.popularity);
}