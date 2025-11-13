export class MovieCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Crear el template una sola vez (fuera del constructor)
  static get template() {
    const template = document.createElement('template');
    template.innerHTML = `
      <link rel="stylesheet" href="public/css/styles.css">
      <style>
        :host {
          display: block;
        }
      </style>
      <article class="movie-card">
        <div class="movie-poster">
          <img id="poster" alt="">
          <button class="play-btn" id="playBtn">▶</button>
        </div>
        <div class="movie-body">
          <h3 class="movie-title" id="title"></h3>
          <p class="movie-meta" id="meta"></p>
          <div class="rating-container" id="ratingContainer"></div>
          <button id="favBtn" class="btn-favorite">Agregar a favoritos</button>
        </div>
      </article>
    `;
    return template;
  }

  connectedCallback() {
    // Clonar el template
    this.shadowRoot.appendChild(MovieCard.template.content.cloneNode(true));

    // Obtener atributos
    const title = this.getAttribute("title");
    const genre = this.getAttribute("genre");
    const duration = this.getAttribute("duration");
    const poster = this.getAttribute("poster");
    const rating = this.getAttribute("rating");
    const id = this.getAttribute("id");
    const trailer = this.getAttribute("trailer");

    // Llenar datos en el template
    this.shadowRoot.getElementById('poster').src = poster;
    this.shadowRoot.getElementById('poster').alt = title;
    this.shadowRoot.getElementById('title').textContent = title;
    this.shadowRoot.getElementById('meta').textContent = `${genre} · ${duration}`;
    
    // Agregar rating-star
    const ratingContainer = this.shadowRoot.getElementById('ratingContainer');
    const ratingStar = document.createElement('rating-star');
    ratingStar.setAttribute('value', rating);
    ratingContainer.appendChild(ratingStar);

    // Eventos
    const playBtn = this.shadowRoot.querySelector("#playBtn");
    const favBtn = this.shadowRoot.querySelector("#favBtn");

    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const modal = document.querySelector("trailer-modal");
      if (modal) modal.openModal(trailer);
    });

    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.addToFavorites({ id, title, genre, duration, poster, rating, trailer });
    });
  }

  addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favorites.find(m => m.id == movie.id);

    if (!exists) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${movie.title} agregada a favoritos 🎬`);
      
      const favList = document.querySelector("favorite-list");
      if (favList) favList.render();
    } else {
      alert("Esta película ya está en favoritos 💾");
    }
  }
}

customElements.define("movie-card", MovieCard);