import { getYear, formatRating, truncateText } from "./utils.mjs";
import { getMovieDetails, getMovieProviders } from "./api.js";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export function displayMovies(movies) {
  const resultsContainer = document.querySelector("#movie-results");
  resultsContainer.innerHTML = "";

  if (!movies.length) {
    resultsContainer.innerHTML = "<p>No movies found.</p>";
    return;
  }

  const html = movies
    .map((movie) => {
      const poster = movie.poster_path
        ? `${IMAGE_BASE}${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

      return `
        <article class="movie-card" data-id="${movie.id}">
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
    })
    .join("");

  resultsContainer.innerHTML = html;
}

export function showStatus(message) {
  document.querySelector("#status-message").textContent = message;
}

export function setupMovieClicks() {
  const cards = document.querySelectorAll(".movie-card");

  cards.forEach((card) => {
    card.addEventListener("click", async () => {
      const movieId = card.dataset.id;
      await showMovieDetails(movieId);
    });
  });
}

async function showMovieDetails(movieId) {
  const modal = document.querySelector("#movie-modal");
  const modalContent = document.querySelector("#modal-content");

  modal.showModal();
  modalContent.innerHTML = "<p>Loading movie details...</p>";

  try {
    const details = await getMovieDetails(movieId);
    const providers = await getMovieProviders(movieId);

    const poster = details.poster_path
      ? `${IMAGE_BASE}${details.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image";

    let streamingHTML = "<p>No streaming info available.</p>";

    if (providers) {
      const allProviders = [
        ...(providers.flatrate || []),
        ...(providers.rent || []),
        ...(providers.buy || [])
      ];

      const uniqueProviders = [];
      const seen = new Set();

      allProviders.forEach((provider) => {
        if (!seen.has(provider.provider_name)) {
          seen.add(provider.provider_name);
          uniqueProviders.push(provider);
        }
      });

      if (uniqueProviders.length > 0) {
        streamingHTML = `
          <div class="providers">
            ${uniqueProviders
              .map(
                (provider) => `
                  <span class="provider">${provider.provider_name}</span>
                `
              )
              .join("")}
          </div>
        `;
      }
    }

    modalContent.innerHTML = `
      <img src="${poster}" alt="${details.title} poster">
      <h2>${details.title}</h2>

      <div class="modal-meta">
        <p><strong>Year:</strong> ${getYear(details.release_date)}</p>
        <p><strong>Rating:</strong> ${formatRating(details.vote_average)}</p>
        <p><strong>Runtime:</strong> ${details.runtime ? `${details.runtime} minutes` : "N/A"}</p>
        <p><strong>Genres:</strong> ${
          details.genres && details.genres.length
            ? details.genres.map((genre) => genre.name).join(", ")
            : "N/A"
        }</p>
      </div>

      <p>${details.overview || "No description available."}</p>

      <h3>Streaming Platforms</h3>
      ${streamingHTML}
    `;
  } catch (error) {
    console.error(error);
    modalContent.innerHTML = "<p>Error loading movie details.</p>";
  }
}