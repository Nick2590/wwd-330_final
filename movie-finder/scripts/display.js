import { getYear, formatRating, truncateText } from "./utils.mjs";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export function displayMovies(movies) {
  const resultsContainer = document.querySelector("#movie-results");
  resultsContainer.innerHTML = "";

  if (!movies.length) {
    resultsContainer.innerHTML = "<p>No movies found.</p>";
    return;
  }

  const html = movies.map((movie) => {
    const poster = movie.poster_path
      ? `${IMAGE_BASE}${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image";

    return `
      <article class="movie-card">
        <img src="${poster}" alt="${movie.title} poster">
        <div class="movie-info">
          <h2>${movie.title}</h2>
          <div class="movie-meta">
            <p><strong>Year:</strong> ${getYear(movie.release_date)}</p>
            <p><strong>Rating:</strong> ${formatRating(movie.vote_average)}</p>
          </div>
          <p class="movie-overview">${truncateText(movie.overview)}</p>
        </div>
      </article>
    `;
  }).join("");

  resultsContainer.innerHTML = html;
}

export function showStatus(message) {
  document.querySelector("#status-message").textContent = message;
}