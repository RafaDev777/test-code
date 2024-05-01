import { notesData } from '../data/data.js';

class NoteList extends HTMLElement {
	constructor() {
		super();
		this.notes = notesData;
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.renderNotes();
		this.addNoteListener();
	}

	renderNotes() {
		const notesContainer = document.createElement('div');
		notesContainer.className = 'note_container';

		this.notes.forEach((note) => {
			const noteCard = this.createNoteCard(note);
			notesContainer.appendChild(noteCard);
		});

		const style = document.createElement('style');
		style.textContent = `
    .note_card{
      color:red
    }
    `;

		this.shadowRoot.appendChild(style);
		this.shadowRoot.appendChild(notesContainer);
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

	addNote(title, body) {
		const newNote = {
			title,
			body,
			createdAt: new Date().toISOString(),
			archived: false,
		};
		this.notes.push(newNote);
		const notesContainer = this.shadowRoot.querySelector('.note_container');
		const noteCard = this.createNoteCard(newNote);
		notesContainer.appendChild(noteCard);
	}

	addNoteListener() {
		document.addEventListener('newNoteAdded', (event) => {
			const { title, body } = event.detail;
			this.addNote(title, body);
		});
	}
}

customElements.define('note-list', NoteList);
