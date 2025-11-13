import { movies } from "./data/movies.js";

export class MovieList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.renderMovies();
  }

  renderMovies() {
    const cards = movies
      .map(
        m => `
        <movie-card
          id="${m.id}"
          title="${m.title}"
          year="${m.year}"
          image="${m.image}"
          rating="${m.rating}">
        </movie-card>
      `
      )
      .join("");

    this.shadowRoot.innerHTML = `
      <style>
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          padding: 20px;
        }
      </style>
      <div class="grid">${cards}</div>
    `;
  }
}

customElements.define("movie-list", MovieList);
