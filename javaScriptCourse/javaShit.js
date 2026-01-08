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
}

Book.prototype.getInfo = function () {
  return `${this.title} by ${this.author}<br>
          ${this.pages} pages<br>
          ${this.isRead ? "was read" : "not read yet"}<br>
          id: ${this.id}`;
};

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  library.push(book); 
}

function renderBook(book) {
  const bookElement = document.createElement("div");
  bookElement.className = "book";
  bookElement.id = book.id;
  bookElement.innerHTML = book.getInfo();
  booksContainer.appendChild(bookElement);
}
  
function renderLibrary() {
  booksContainer.innerHTML = "";
  library.forEach(book => renderBook(book));
}

function newBookForm() {
  const dialog = document.querySelector("dialog");
  const form = document.querySelector("form");
  const openButton = document.querySelector("dialog + button");

  openButton.addEventListener("click", () => {
    dialog.showModal();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    dialog.close();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    addBookToLibrary(
      data.title,
      data.author,
      data.pages,
      data.isRead === 'true'

    );
    renderLibrary();;

    form.reset();
  });
}

function main() {
  newBookForm();
}

main();
