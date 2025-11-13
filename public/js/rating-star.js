class RatingStar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get template() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-size: 20px;
          color: gold;
          letter-spacing: 3px;
        }
      </style>
      <div id="stars"></div>
    `;
    return template;
  }

  connectedCallback() {
    this.shadowRoot.appendChild(RatingStar.template.content.cloneNode(true));
    
    const value = Number(this.getAttribute("value")) || 0;
    const max = 5;
    const stars = Array.from({ length: max }, (_, i) =>
      i < value ? "★" : "☆"
    ).join(" ");

    this.shadowRoot.getElementById('stars').textContent = stars;
  }
}

customElements.define("rating-star", RatingStar);