import { movies } from "./data/movies.js";

export class MovieList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // ← AGREGAR
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="public/css/styles.css">
      <div class="movie-grid">
        ${movies.map(movie => {
          const ratingValue = (movie.rating.match(/★/g) || []).length;
          return `
            <movie-card
              id="${movie.id}"
              title="${movie.title}"
              genre="${movie.genre}"
              duration="${movie.duration}"
              poster="${movie.poster}"
              rating="${ratingValue}"
              trailer="${movie.trailer}"
            ></movie-card>
          `;
        }).join("")}
      </div>
    `;
  }
}

customElements.define("movie-list", MovieList);
