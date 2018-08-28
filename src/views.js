import moment from 'moment';
import {
    sortNotes, getNotes
} from './notes';
import {
    getFilters
} from './filters';

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a');
    const textEl = document.createElement('p');
    const statusEl = document.createElement('p');

    // Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = 'Unnamed note';
    }
    textEl.classList.add('list-item__title');
    noteEl.appendChild(textEl);

    // Setup the status message
    statusEl.textContent = generateLastEdited(note.updatedAt);
    statusEl.classList.add('list-item__subtitle');
    noteEl.appendChild(statusEl);

    // Setup the link
    noteEl.setAttribute('href', `edit.html#${note.id}`);
    noteEl.classList.add('list-item');

    return noteEl;
}

// Render applications notes
const renderNotes = () => {
    const filters = getFilters();
    const notes = sortNotes(filters.sortBy);
    const notesEl = document.querySelector('#notes');
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    notesEl.innerHTML = '';

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note);
            document.querySelector('#notes').appendChild(noteEl);
        })
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No notes to show';
        emptyMessage.classList.add('empty-message');
        notesEl.appendChild(emptyMessage);
    }

}

// Generate the last edited message
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`;

const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title');
    const bodyElement = document.querySelector('#note-body');
    const dateElement = document.querySelector('#last-edited');
    let notes = getNotes();
    const note = notes.find((note) => note.id === noteId);
    if (!noteId) {
        location.assign('index.html'); // redirect user on the index page
    }

    // Get the default value of note
    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
}

export {
    renderNotes,
    generateNoteDOM,
    generateLastEdited,
    initializeEditPage
}