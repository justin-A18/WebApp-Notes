// <===============LOGICA MODAL===================>
// Obtener elementos del DOM relacionados con el modal
const $openModalButton = document.getElementById('open-modal');
const $modal = document.getElementById('modal');
const $closeModalButton = document.getElementById('close-modal');

// Abrir el modal al hacer clic en el botón "Abrir Modal"
$openModalButton.addEventListener("click", () => {
    $modal.style.display = "block";
});

// Cerrar el modal al hacer clic en el botón "Cerrar Modal"
$closeModalButton.addEventListener("click", () => {
    $modal.style.display = "none";
});

// Cerrar el modal al hacer clic en cualquier lugar fuera del modal
window.addEventListener("click", (e) => {
    // Verificar si se hizo clic en el área del modal
    if (e.target === $modal) {
        $modal.style.display = "none";
    } else {
        console.error("Ocurrió un error");
    }
});

// <===============LOGICA NOTAS===================>

// Función para generar un color de fondo pastel aleatorio
function getRandomPastelColor() {
    // Genera colores pasteles ajustando manualmente los canales RGB
    const r = Math.floor(Math.random() * 100) + 100; // Rojo suave
    const g = Math.floor(Math.random() * 100) + 100; // Verde suave
    const b = Math.floor(Math.random() * 100) + 155; // Azul suave
    return `rgb(${r}, ${g}, ${b})`;
}

// Clase principal de la aplicación de notas
class NoteApp {
    constructor() {
        // Obtener elementos del DOM relacionados con las notas
        this.noteInput = document.getElementById('note-input');
        this.addNoteButton = document.getElementById('add-note');
        this.noteList = document.getElementById('note-list');
        // Cargar notas desde localStorage o crear un array vacío
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        // Inicializar la aplicación
        this.init();
    }

    init() {
        // Agregar eventos al botón "Agregar Nota" y al campo de entrada de texto
        this.addNoteButton.addEventListener('click', () => {
            this.addNote();
        });

        this.noteInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNote();
            }
        });

        // Mostrar las notas existentes al cargar la aplicación
        this.displayNotes();
    }

    addNote() {
        // Obtener el texto de la entrada de texto y eliminar espacios en blanco
        const text = this.noteInput.value.trim();
        if (text !== '') {
            // Crear una nueva nota y agregarla al array de notas
            const note = new NoteItem(text);
            this.notes.push(note);
            // Guardar las notas en localStorage y actualizar la lista de notas en el DOM
            this.saveNotes();
            this.displayNotes();
            // Limpiar el campo de entrada de texto
            this.noteInput.value = '';
        }
    }

    saveNotes() {
        // Guardar el array de notas en localStorage como JSON
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    displayNotes() {
        // Limpiar la lista de notas en el DOM
        this.noteList.innerHTML = '';
        // Iterar a través de las notas y crear una tarjeta de nota para cada una
        this.notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('nota');
            noteElement.style.backgroundColor = getRandomPastelColor(); // Aplicar un color de fondo pastel
            noteElement.innerHTML = `
                <span class="nota-close" data-index=${index}>
                    <i class='bx bxs-trash bx-lg'></i>
                </span>
                <p class="nota-text">${note.text}</p>
            `;
            
            // Agregar un evento para eliminar la nota al hacer clic en el botón "Eliminar"
            const deleteButton = noteElement.querySelector('.nota-close');
            deleteButton.addEventListener('click', () => {
                this.deleteNote(index);
            });

            // Agregar la tarjeta de nota al DOM
            this.noteList.appendChild(noteElement);
        });
    }

    deleteNote(index) {
        // Eliminar la nota del array de notas
        this.notes.splice(index, 1);
        // Guardar las notas actualizadas en localStorage y actualizar la lista de notas en el DOM
        this.saveNotes();
        this.displayNotes();
    }
}

// Clase para representar una nota
class NoteItem {
    constructor(text) {
        this.text = text;
    }
}

// Crear una instancia de la aplicación de notas al cargar la página
const noteApp = new NoteApp();

// <===============LOGICA SEARCH===================>
// Obtén referencias a los elementos HTML
const searchInput = document.getElementById("search-input");
const $listNote = document.getElementById('note-list');
// Agrega un evento de entrada al campo de búsqueda
searchInput.addEventListener("input", function () {
  // Obtén el texto de búsqueda
  const searchText = searchInput.value.toLowerCase();

  // Obtén todas las notas
  const notes = $listNote.getElementsByTagName("div");

  // Itera a través de las notas y muestra/oculta según la búsqueda
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const noteText = note.innerText.toLowerCase();
    
    // Comprueba si la nota contiene el texto de búsqueda
    if (noteText.includes(searchText)) {
      note.style.display = "block"; // Muestra la nota
    } else {
      note.style.display = "none"; // Oculta la nota
    }
  }
});

// <===============LOGICA BG-DARK===================>
const $moon = document.getElementById("moon");
const $section = document.getElementById("dark-bg");
const $text = document.querySelectorAll(".text-dark");

$moon.addEventListener("click", () => {
    $section.classList.toggle("bg-dark");
    $text.forEach(e => {
        e.classList.toggle("text-white")
    })

})



