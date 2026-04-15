export function getYear(dateString) {
  if (!dateString) return "N/A";
  return dateString.split("-")[0];
}

export function formatRating(rating) {
  if (rating === null || rating === undefined || Number.isNaN(Number(rating))) {
    return "N/A";
  }
  return Number(rating).toFixed(1);
}

export function truncateText(text, maxLength = 160) {
  if (!text) return "No description available.";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}