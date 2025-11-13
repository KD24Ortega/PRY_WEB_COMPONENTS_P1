export class FavoriteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.renderFavorites();
  }

  renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
      this.shadowRoot.innerHTML = `
        <p style="color: gray; text-align: center;">No hay películas favoritas aún.</p>
      `;
      return;
    }

    const cards = favorites
      .map(
        (m) => `
        <div class="fav-card">
          <img src="${m.image}" alt="${m.title}">
          <h4>${m.title}</h4>
          <p>${m.year}</p>
          <button data-id="${m.id}">❌ Quitar</button>
        </div>
      `
      )
      .join("");

    this.shadowRoot.innerHTML = `
      <style>
        .fav-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          padding: 10px;
        }
        .fav-card {
          background: #222;
          color: white;
          border-radius: 10px;
          padding: 10px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
        img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 6px;
        }
        button {
          background: crimson;
          border: none;
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 8px;
        }
      </style>
      <div class="fav-grid">${cards}</div>
    `;

    // Escuchar clics en botones para eliminar
    this.shadowRoot.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        this.removeFavorite(id);
      });
    });
  }

  removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(f => f.id != id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    this.renderFavorites();
  }
}

customElements.define("favorite-list", FavoriteList);
