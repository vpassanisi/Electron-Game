export default class HealthBar extends HTMLElement {
  constructor() {
    super();
    this.innerText = "hello world";
  }

  connectedCallback() {
    console.log("connected");
  }
}

customElements.define("health-bar", HealthBar);
