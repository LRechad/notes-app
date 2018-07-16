const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const removeElement = document.querySelector('#remove-note');
const noteId = location.hash.substring(1);
const notes = getSavedNotes();

const note = notes.find(function(note) {
    return note.id === noteId;
});

if (noteId === undefined) {
    location.assign('index.html'); // redirect user on the index page
}

// Get the default value of note
titleElement.value = note.title;
bodyElement.value = note.body;

titleElement.addEventListener('input', function(e) {
    // note.title = e.target.value;
    note.title = this.value;
    saveNotes(notes);
})

bodyElement.addEventListener('input', function(e) {
    note.body = this.value;
    saveNotes(notes);
})

removeElement.addEventListener('click', function(e) {
    removeNote(note.id);
    saveNotes(notes);
    location.assign('index.html');
})
