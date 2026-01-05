const library = [];
const booksContainer = document.getElementById('booksContainer');

function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' keyword to call the constructor");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.getInfo = function () {
    if (!this.isRead) {
      return `${this.title} by ${this.author}<br> ${this.pages} pages<br> not read yet<br> id: ${this.id}`;
    }
    return `${this.title} by ${this.author}<br> ${this.pages} pages<br> was read<br> id: ${this.id}`;
  };
}

function AddBookToLibrary(data) {
  const title = data["title"];
  const author = data["author"];
  const pages = data["pages"];
  const isRead = data["isRead"];
  const book = new Book(title, author, pages, isRead);
  library.push(book);
}

function renderBook() {
  const book = library[library.length - 1];
  const bookElement = document.createElement("div");
  bookElement.className = "book";
  bookElement.id = book.id;
  bookElement.innerHTML = book.getInfo();
  booksContainer.appendChild(bookElement);
}
  
function renderLibrary() {
  library.forEach(book => {
    renderBook(book);
  });
}

function newBookForm(){
  const dialog = document.querySelector("dialog");
  const form = document.querySelector("form");
  const closeButton = document.querySelector("dialog > button");
  const openButton = document.querySelector("dialog + button");
  openButton.addEventListener("click", () => {
    dialog.showModal();
  });

  // "Close" button closes the dialog
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    dialog.close();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    AddBookToLibrary(data);
    renderBook();
  });
}

function main() {
  // AddBookToLibrary("Homo", "Eyal", 295, true);
  // AddBookToLibrary("Bla", "Kim", 67, false);
  newBookForm();
}

main();