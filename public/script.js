const noteForm = document.getElementById('note-form');
const notesList = document.getElementById('notes-list');
const toggleFormButton = document.getElementById('toggleForm');
const cancelButton = document.getElementById('cancel');

// Toggle the note form visibility
toggleFormButton.addEventListener('click', () => {
  noteForm.classList.toggle('hidden');
});

// Cancel adding a new note
cancelButton.addEventListener('click', () => {
  noteForm.classList.add('hidden');
});

// Submit new note form
noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });

  if (response.ok) {
    const note = await response.json();
    addNoteToList(note);
    noteForm.reset();
    noteForm.classList.add('hidden');
  } else {
    console.error('Failed to create note');
  }
});

// Fetch and display existing notes
async function getNotes() {
  try {
    const response = await fetch('/api/notes');
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    const notes = await response.json();
    notes.forEach(addNoteToList);
  } catch (error) {
    console.error(error.message);
  }
}

// Add a single note to the list
function addNoteToList(note) {
  const noteElement = document.createElement('div');
  noteElement.classList.add('note-item');

  const noteTitle = document.createElement('h3');
  noteTitle.textContent = note.title;
  noteElement.appendChild(noteTitle);

  const noteContent = document.createElement('p');
  noteContent.textContent = note.content;
  noteElement.appendChild(noteContent);

  const deleteIcon = document.createElement('span');
  deleteIcon.textContent = '❌';
  deleteIcon.classList.add('delete-icon');
  deleteIcon.addEventListener('click', async () => {
    const deleteResponse = await fetch(`/api/notes/${note.id}`, {
      method: 'DELETE',
    });
    if (deleteResponse.ok) {
      noteElement.remove();
    } else {
      console.error('Failed to delete note');
    }
  });
  noteElement.appendChild(deleteIcon);

  notesList.appendChild(noteElement);
}

getNotes();
