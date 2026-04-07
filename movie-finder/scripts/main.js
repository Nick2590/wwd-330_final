import { searchMovies } from "./api.js";
import { displayMovies, showStatus, setupMovieClicks } from "./display.js";
import { filterMoviesByRating, sortMovies } from "./filters.js";

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const minRatingSelect = document.querySelector("#min-rating");
const sortBySelect = document.querySelector("#sort-by");
const modal = document.querySelector("#movie-modal");
const closeModalBtn = document.querySelector("#close-modal");

let currentMovies = [];

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    showStatus("Please enter a movie name.");
    return;
  }

  showStatus("Loading movies...");

  try {
    currentMovies = await searchMovies(query);
    updateDisplayedMovies();
    showStatus(`Found ${currentMovies.length} movie(s).`);
  } catch (error) {
    console.error(error);
    showStatus("There was a problem loading movie data.");
  }
});

minRatingSelect.addEventListener("change", updateDisplayedMovies);
sortBySelect.addEventListener("change", updateDisplayedMovies);

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("click", (event) => {
  const dialogDimensions = modal.getBoundingClientRect();

  const clickedInside =
    event.clientX >= dialogDimensions.left &&
    event.clientX <= dialogDimensions.right &&
    event.clientY >= dialogDimensions.top &&
    event.clientY <= dialogDimensions.bottom;

  if (!clickedInside) {
    modal.close();
  }
});

function updateDisplayedMovies() {
  const minRating = Number(minRatingSelect.value);
  const sortBy = sortBySelect.value;

  let updatedMovies = filterMoviesByRating(currentMovies, minRating);
  updatedMovies = sortMovies(updatedMovies, sortBy);

  displayMovies(updatedMovies);
  setupMovieClicks();
}