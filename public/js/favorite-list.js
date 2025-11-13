class FavoriteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.favorites = [];
  }

  connectedCallback() {
    this.render();
  }

  // Quitar favorito
  removeFavorite(id) {
    this.favorites = this.favorites.filter(f => f.id != id);
    this.#save();
    this.render();
  }

  // Guardar en localStorage
  #save() {
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  // Cargar desde localStorage
  #load() {
    this.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  }

  // Renderizar la lista
  render() {
    // Recargar los favoritos del localStorage
    this.#load();

    if (this.favorites.length === 0) {
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="public/css/styles.css">
        <div class="filmstrip-inner empty">
          <p style="text-align:center;opacity:0.8;">No has agregado nada aún.</p>
        </div>
      `;
      return;
    }

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="public/css/styles.css">
      <div class="filmstrip-inner">
        ${this.favorites.map(f => `
          <div class="coming-card fade-item" style="position:relative;" data-id="${f.id}">
            <button
              class="remove-fav-btn"
              title="Quitar de favoritos"
              aria-label="Quitar de favoritos"
            >✖</button>

            <span class="coming-label">★</span>
            <h3>${f.title}</h3>
            <p>${f.genre} · ${f.duration}</p>
            <span class="coming-date">${f.rating}/5 ⭐</span>
          </div>
        `).join("")}
      </div>
    `;

    // Añade los eventos de eliminación
    this.shadowRoot.querySelectorAll(".remove-fav-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const card = e.target.closest(".coming-card");
        const id = card.dataset.id;
        this.removeFavorite(id);
      });
    });
  }
}

customElements.define("favorite-list", FavoriteList);
