class SkillRow extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <input type="text" class="name"/>
    <span class="value"></span>
    `
  }
}

class AttributePoint extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <svg viewbox="0 0 8 8">
      <rect x="1" y="1" height="6" width="6" rx="1" ry="1" stroke="black" stroke-width="1" fill="black"/>
      <rect class="unchecked" x="1" y="1" height="6" width="6" rx="1" ry="1" stroke="black" stroke-width="1" fill="white"/>
    </svg>
    `

    this.addEventListener('click', function() {
      if (!this.disabled) {
        this.checked = !this.checked;
        this.dispatchEvent(new Event('change'));
      }
    }, true);
  }

  static get observedAttributes() {
    return ['name', 'checked', 'disabled'];
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(name) {
    this.setAttribute('name', attributeName);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(isDisabled) {
    if (isDisabled) {
      this.setAttribute('disabled', 'disabled');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(isChecked) {
    if (isChecked) {
      this.setAttribute('checked', 'checked');
    } else {
      this.removeAttribute('checked');
    }
  }
}

customElements.define('skill-row', SkillRow);
customElements.define('attribute-point', AttributePoint);
