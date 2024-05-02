class NoteForm extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}
	connectedCallback() {
		this.renderForm();
		this.addNote();
		this.validateInputs();
	}

	renderForm() {
		const form = document.createElement('form');
		form.innerHTML = `    
    <h2>Add New Note</h2>
    <label for="note_title">Title</label>
    <input type="text" id="note_title" name="note_title" placeholder="input your title here" required>
    <label for="note_body">Description</label>
    <input type="textarea" id="note_body" name="note_body" placeholder="your description ..." rows="4" cols="25" required></textarea>
    <button type="submit">Add Note</button>
    `;

		const style = document.createElement('style');
		style.textContent = ``;

		this.shadowRoot.appendChild(style);
		this.shadowRoot.appendChild(form);
	}

	validateInputs() {
		const form = this.shadowRoot.querySelector('form');
		const inputTitle = form.querySelector('#note_title');
		const inputBody = form.querySelector('#note_body');
		const titleRegex = /\d/;

		inputTitle.addEventListener('input', () => {
			const titleValue = inputTitle.value.trim();
			if (!titleValue) {
			  inputTitle.setCustomValidity('Cannot submit empty title');
			} else if (!titleRegex.test(titleValue)) {
			  inputTitle.setCustomValidity('Title must contain at least one number');
			} else {
			  inputTitle.setCustomValidity('');
			}
		  });

		inputBody.addEventListener('input', () => {
			if (!inputBody.value.trim()) {
				inputBody.setCustomValidity('Cannot submit empty description');
			} else {
				inputBody.setCustomValidity('');
			}
		});
	}

	addNote() {
		const form = this.shadowRoot.querySelector('form');

		form.addEventListener('submit', (event) => {
			event.preventDefault();
			if (form.checkValidity()) {
				const formData = new FormData(form);
				const title = formData.get('note_title');
				const body = formData.get('note_body');
				const eventAddNote = new CustomEvent('newNoteAdded', {
					detail: { title, body },
				});
				document.dispatchEvent(eventAddNote);
				form.reset();
			}
		});
	}
}

customElements.define('note-form', NoteForm);
