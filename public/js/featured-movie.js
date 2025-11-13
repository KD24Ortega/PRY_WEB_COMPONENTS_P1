import { movies } from "./data/movies.js";

export class FeaturedMovie extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  getRandomMovie() {
    return movies[Math.floor(Math.random() * movies.length)];
  }

  getRatingValue(rating) {
    return (rating.match(/★/g) || []).length;
  }

  render() {
    const movie = this.getRandomMovie();
    const ratingValue = this.getRatingValue(movie.rating);
    const points = ratingValue * 20; // 5 estrellas = 100 pts

    this.innerHTML = `
      <div class="hero-poster slide-item">
        <div class="poster-header">PELÍCULA DESTACADA</div>
        <div class="poster-main">
          <div class="poster-popcorn">★<br>${points}<br>PTS</div>
          <div class="poster-text">
            <span class="poster-title">${movie.title.toUpperCase()}</span>
            <span class="poster-subtitle">${movie.genre}</span>
            <span class="poster-line"></span>
            <span class="poster-extra">${movie.duration} · ${movie.rating}</span>
          </div>
        </div>
        <div class="poster-footer">
          <span class="poster-tag">${ratingValue}/5 ⭐</span>
          <span class="poster-year">2025</span>
        </div>
      </div>
    `;
  }
}

customElements.define("featured-movie", FeaturedMovie);