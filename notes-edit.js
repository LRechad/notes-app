const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const dateElement = document.querySelector('#last-edited');
const removeElement = document.querySelector('#remove-note');
const noteId = location.hash.substring(1);

let notes = getSavedNotes();
let note = notes.find((note) => note.id === noteId);

if (!noteId) {
    location.assign('index.html'); // redirect user on the index page
}

// Get the default value of note
titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);

titleElement.addEventListener('input', (e) => {
    note.title = e.target.value;
    // note.title = this.value;
    note.updatedAt = moment().valueOf();
    dateElement.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
})

bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value;
    //note.body = this.value;
    note.updatedAt = moment().valueOf();
    dateElement.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
})

removeElement.addEventListener('click', (e) => {
    removeNote(note.id);
    saveNotes(notes);
    location.assign('index.html');
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId);

        if (!noteId) {
            location.assign('index.html'); // redirect user on the index page
        }

        // Get the default value of note
        titleElement.value = note.title;
        bodyElement.value = note.body;
        dateElement.textContent = generateLastEdited(note.updatedAt);
    }
})