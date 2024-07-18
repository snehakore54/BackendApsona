const noteForm = document.getElementById('note-form');
const notesList = document.getElementById('notes-list');

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const response = await fetch('http://localhost:3001/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });

  if (response.ok) {
    const note = await response.json();
    addNoteToList(note);
    noteForm.reset();
  } else {
    console.error('Failed to create note:', response.status, response.statusText);
  }
});

async function addNoteToList(note) {
  const noteElement = document.createElement('li');
  noteElement.textContent = `${note.title} - ${note.content}`;
  notesList.appendChild(noteElement);
}
