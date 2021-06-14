class SkillRow extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <input type="text" class="name"/>
    `
  }
}

customElements.define("skill-row", SkillRow);
