let notes = [];
let archived = [];

function addNote() {
  const title = document.getElementById("note-title").value;
  const text = document.getElementById("note-text").value;
  const reminder = document.getElementById("note-reminder").value;

  if (title || text) {
    notes.push({ title, text, reminder });
    document.getElementById("note-title").value = '';
    document.getElementById("note-text").value = '';
    document.getElementById("note-reminder").value = '';
    renderNotes();
  }
}

function renderNotes() {
  const notesContainer = document.getElementById("notes-container");
  const archiveContainer = document.getElementById("archive-container");

  notesContainer.innerHTML = '';
  archiveContainer.innerHTML = '';

  notes.forEach((note, index) => {
    const card = createNoteCard(note, index, false);
    notesContainer.appendChild(card);
  });

  archived.forEach((note, index) => {
    const card = createNoteCard(note, index, true);
    archiveContainer.appendChild(card);
  });
}

function createNoteCard(note, index, isArchived) {
  const div = document.createElement("div");
  div.className = "note-card";

  div.innerHTML = `
    <h3 contenteditable="true" onblur="editTitle(${index}, this.innerText, ${isArchived})">${note.title}</h3>
    <p contenteditable="true" onblur="editText(${index}, this.innerText, ${isArchived})">${note.text}</p>
    <div class="reminder">${note.reminder ? "🔔 " + note.reminder : ""}</div>
    <button onclick="deleteNote(${index}, ${isArchived})">Delete</button>
    <button onclick="toggleArchive(${index}, ${isArchived})">${isArchived ? "Unarchive" : "Archive"}</button>
  `;
  return div;
}

function editTitle(index, newTitle, isArchived) {
  if (isArchived) {
    archived[index].title = newTitle;
  } else {
    notes[index].title = newTitle;
  }
}

function editText(index, newText, isArchived) {
  if (isArchived) {
    archived[index].text = newText;
  } else {
    notes[index].text = newText;
  }
}

function deleteNote(index, isArchived) {
  if (isArchived) {
    archived.splice(index, 1);
  } else {
    notes.splice(index, 1);
  }
  renderNotes();
}

function toggleArchive(index, isArchived) {
  if (isArchived) {
    notes.push(archived[index]);
    archived.splice(index, 1);
  } else {
    archived.push(notes[index]);
    notes.splice(index, 1);
  }
  renderNotes();
}

renderNotes();
