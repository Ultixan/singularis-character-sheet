class SkillRow extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="row">
      <label>
        <input type="radio" name="focus"/>
        <svg viewbox="0 0 8 8">
          <circle cx="4" cy="4" r="3" stroke="black" stroke-width="1" fill="black"/>
          <circle class="unchecked" cx="4" cy="4" r="3" stroke="black" stroke-width="1" fill="white"/>
        </svg>
      </label>
      <input type="text" class="name"/>
      <input type="text" class="value"/>
    </div>
    `
  }
}

class AttributeBlock extends HTMLElement {
  connectedCallback() {
    
  }
}

customElements.define("skill-row", SkillRow);
