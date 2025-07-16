function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('expanded');
}

function expandNote() {
  document.getElementById('collapsed-note').style.display = 'none';
  document.getElementById('expanded-note').style.display = 'flex';
}

function collapseNote() {
  document.getElementById('collapsed-note').style.display = 'block';
  document.getElementById('expanded-note').style.display = 'none';
}

// ------------------- Notes Logic ----------------------

let notes = [];

function addNote() {
  const title = document.getElementById("noteTitle").value.trim();
  const text = document.getElementById("noteText").value.trim();

  if (title === "" && text === "") return;

  const note = { title, text };
  notes.push(note);
  displayNotes();

  document.getElementById("noteTitle").value = "";
  document.getElementById("noteText").value = "";
  collapseNote();
}

function deleteNote(index) {
  notes.splice(index, 1);
  displayNotes();
}

function displayNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const noteEl = document.createElement("div");
    noteEl.className = "note-item";
    noteEl.innerHTML = `
      <h4>${note.title}</h4>
      <p>${note.text}</p>
      <button onclick="deleteNote(${index})">Delete</button>
    `;
    notesList.appendChild(noteEl);
  });
}
