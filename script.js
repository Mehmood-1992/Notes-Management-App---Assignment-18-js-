document.addEventListener("DOMContentLoaded", function () {
    const noteForm = document.getElementById("note-form");
    const notesContainer = document.getElementById("notes-container");
    const titleInput = document.getElementById("note-title");
    const descriptionInput = document.getElementById("note-description");
  
    // Retrieve notes from localStorage
    function getNotes() {
      return JSON.parse(localStorage.getItem("notes")) || [];
    }
  
    // Save notes to localStorage
    function saveNotes(notes) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  
    // Render notes on the page
    function displayNotes() {
      const notes = getNotes();
      notesContainer.innerHTML = ""; // Clear existing notes
      notes.forEach(function (note, index) {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");
  
        const noteTitle = document.createElement("h3");
        noteTitle.textContent = note.title;
  
        const noteDescription = document.createElement("p");
        noteDescription.textContent = note.description;
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
          deleteNote(index);
        });
  
        noteCard.appendChild(noteTitle);
        noteCard.appendChild(noteDescription);
        noteCard.appendChild(deleteButton);
  
        notesContainer.appendChild(noteCard);
      });
    }
  
    // Add a new note
    function addNote(title, description) {
      const notes = getNotes();
      notes.push({ title, description });
      saveNotes(notes);
      displayNotes();
    }
  
    // Delete a note
    function deleteNote(index) {
      const notes = getNotes();
      notes.splice(index, 1);
      saveNotes(notes);
      displayNotes();
    }
  
    // Handle form submission
    noteForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const title = titleInput.value.trim();
      const description = descriptionInput.value.trim();
  
      if (!title || !description) {
        alert("Both title and description are required!");
        return;
      }
  
      addNote(title, description);
      titleInput.value = "";
      descriptionInput.value = "";
    });
  
    // Initial render
    displayNotes();
  });
  