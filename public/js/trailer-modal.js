class TrailerModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="modal">
        <div class="modal-content">
          <span class="close-btn">&times;</span>
          <iframe id="trailerFrame" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
    `;

    this.querySelector(".close-btn").addEventListener("click", () => this.closeModal());
    this.querySelector(".modal").addEventListener("click", e => {
      if (e.target.classList.contains("modal")) this.closeModal();
    });
  }

  openModal(trailerUrl) {
    const modal = this.querySelector(".modal");
    const iframe = this.querySelector("#trailerFrame");
    iframe.src = trailerUrl + "?autoplay=1";
    modal.style.display = "flex";
  }

  closeModal() {
    const modal = this.querySelector(".modal");
    const iframe = this.querySelector("#trailerFrame");
    modal.style.display = "none";
    iframe.src = "";
  }
}

customElements.define("trailer-modal", TrailerModal);
