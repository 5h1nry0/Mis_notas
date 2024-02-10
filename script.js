const createButton = document.querySelector(".create");
const notesContainer = document.querySelector(".notesContainer");
const input = document.querySelector("#input");
let notesArray_deserialized = JSON.parse(localStorage.getItem("note"))
let notesArray = notesArray_deserialized

localStorage.getItem("note") != null ? getNotes () : notesArray = []

function getNotes(){
    for (let i = 0; i < notesArray_deserialized.length; i++) {
        const note = document.createElement("div");
        note.classList.add("previousNotes");

        const noteText = document.createElement("p"); 
        noteText.classList.add("noteText"); 
        noteText.textContent = notesArray_deserialized[i];
        note.appendChild(noteText);  

        const notesArray_serialized = JSON.stringify(notesArray);
        localStorage.setItem("note", notesArray_serialized);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "Borrar";
        note.appendChild(deleteButton);

        deleteButton .addEventListener('click', () => {
            const index = notesArray.indexOf(noteText.textContent);
            notesContainer.removeChild(note);
            notesArray.splice(index, 1);
            const notesArray_serialized = JSON.stringify(notesArray)
            localStorage.setItem("note", notesArray_serialized);
        })

        notesContainer.appendChild(note);
    }
}

createButton.addEventListener('click',() => {
    const note = document.createElement("div");
    note.classList.add("previousNotes");

    const text = input.value;
    input.value = '';
    notesArray.push(text);
    const notesArray_serialized = JSON.stringify(notesArray)

    const noteText = document.createElement("p");
    noteText.textContent = text;
    noteText.classList.add("noteText"); 
    note.appendChild(noteText)

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "Borrar";
    note.appendChild(deleteButton);

    localStorage.setItem("note", notesArray_serialized);

    notesContainer.appendChild(note);
    
    deleteButton .addEventListener('click', () => {
        const index = notesArray.indexOf(noteText.textContent);
        notesContainer.removeChild(note);
        notesArray.splice(index, 1);
        const notesArray_serialized = JSON.stringify(notesArray)
        localStorage.setItem("note", notesArray_serialized);
    })
})