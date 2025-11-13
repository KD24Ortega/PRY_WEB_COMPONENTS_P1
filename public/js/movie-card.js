import "./rating-star.js";

export class MovieCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const title = this.getAttribute("title");
    const year = this.getAttribute("year");
    const image = this.getAttribute("image");
    const rating = this.getAttribute("rating");
    const id = this.getAttribute("id");

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: #1a1a1a;
          color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          text-align: center;
          transition: transform 0.3s;
        }
        .card:hover { transform: scale(1.05); }
        img {
          width: 100%;
          height: 260px;
          object-fit: cover;
        }
        button {
          background: #ffcc00;
          border: none;
          border-radius: 5px;
          padding: 6px 12px;
          margin: 10px;
          cursor: pointer;
          font-weight: bold;
        }
      </style>

      <div class="card">
        <img src="${image}" alt="${title}">
        <h3>${title}</h3>
        <p>${year}</p>
        <rating-star rating="${rating}"></rating-star>
        <button id="favBtn">⭐ Agregar a Favoritos</button>
      </div>
    `;

    // Esperar a que el botón exista antes de asignar evento
    const btn = this.shadowRoot.querySelector("#favBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        console.log("✅ Botón presionado en:", title);
        this.addToFavorites({ id, title, year, image, rating });
      });
    } else {
      console.error("❌ No se encontró el botón en", title);
    }
  }

  addToFavorites(movie) {
    console.log("Intentando guardar:", movie);

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favorites.find(m => m.id == movie.id);

    if (!exists) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      console.log("✅ Favoritos guardados:", favorites);
      alert(`${movie.title} agregada a favoritos 🎬`);

      // Si tienes el componente <favorite-list>
      const favList = document.querySelector("favorite-list");
      if (favList) favList.renderFavorites();
    } else {
      alert("Esta película ya está en favoritos 💾");
    }
  }
}

customElements.define("movie-card", MovieCard);
