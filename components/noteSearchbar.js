import { notesData } from '../data/data.js';

class NoteSearchbar extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.renderSearchBar();
		this.searchListener();
	}

	renderSearchBar() {
		const searchBar = document.createElement('div');
		searchBar.className = 'searchbar_container';
		searchBar.innerHTML = `
    <label for="input_search"><h2>Find Note</h2>
    <input id="input_search" name="input_search" placeholder="Enter Keywords..."/>
    `;

		const style = document.createElement('style');
		style.textContent = `
    `;

		this.shadowRoot.appendChild(style);
		this.shadowRoot.appendChild(searchBar);
	}

	createNoteCard(note) {
		const noteCard = document.createElement('div');
		noteCard.className = 'note_card';
		noteCard.innerHTML = `
    <h2>${note.title}</h2>
    <p>${note.body}</p>
    `;
		return noteCard;
	}

	searchListener() {
		const searchInput = this.shadowRoot.querySelector('#input_search');

		searchInput.addEventListener('input', () => {
			const searchTerm = searchInput.value.toLowerCase();
			const notesContainer = document
				.querySelector('note-list')
				.shadowRoot.querySelector('.note_container');

			notesContainer.innerHTML = '';
			notesData.forEach((note) => {
				if (
					note.title.toLowerCase().includes(searchTerm) ||
					note.body.toLowerCase().includes(searchTerm)
				) {
					const noteCard = this.createNoteCard(note);
					notesContainer.appendChild(noteCard);
				}
			});
		});
	}
}

customElements.define('note-searchbar', NoteSearchbar);
