class MainNav extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}
	connectedCallback() {
		this.renderNav();
	}

	renderNav() {
		const navContainer = document.createElement('nav');
		navContainer.innerHTML = `
    <div class="image_logo_container">
      <img src="" alt="logo"/>
    </div>
    <div>
      <button class="button_sign-in">Sign In</button>
      <i class="fa fa-bell" style="font-size:24px"></i>
    </div>

    `;

		const style = document.createElement('style');
		style.textContent = `
    nav {
      display:flex;
      flex-directino: row;
      justify-content: space-between;
    }
    `;

		this.shadowRoot?.appendChild(style);
		this.shadowRoot?.appendChild(navContainer);
	}
}

customElements.define('main-nav', MainNav);
