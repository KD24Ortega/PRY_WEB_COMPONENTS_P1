export class RatingStar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const rating = parseInt(this.getAttribute("rating")) || 0;
    const stars = Array(5)
      .fill("☆")
      .map((_, i) => (i < rating ? "★" : "☆"))
      .join("");

    this.shadowRoot.innerHTML = `
      <style>
        .stars {
          color: gold;
          font-size: 1.3rem;
        }
      </style>
      <div class="stars">${stars}</div>
    `;
  }
}

customElements.define("rating-star", RatingStar);
