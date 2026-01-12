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
          ${this.isRead ? "was read" : "not read yet"}<br>`;
};
Book.prototype.changeStatus = function(){
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  library.push(book); 
  renderLibrary();
}

booksContainer.addEventListener("click", (event) => {
  const bookElement = event.target.closest(".book");
  if (!bookElement) return;
  const bookId = bookElement.dataset.id;
  if(event.target.classList.contains("deleteButton")){
    removeBookById(bookId);
  }
  if(event.target.classList.contains("isReadButton")){
    changeReadStatus(bookId);

  }
  renderLibrary();
});

function removeBookById(id) {
  const index = library.findIndex(book => book.id === id);
  if (index !== -1){ 
    library.splice(index, 1);
  } 
}

 function changeReadStatus(id){
  const book = library.find(book => book.id === id);
  if (book){
    book.changeStatus(); 
  }
 }
 
function renderBook(book) {
  const bookElement = document.createElement("div");
  bookElement.className = "book";
  bookElement.dataset.id = book.id;
  bookElement.innerHTML = book.getInfo();
  booksContainer.appendChild(bookElement);
  createDeleteButton(bookElement);
  createIsReadButton(bookElement);
}

function createDeleteButton(bookElement){
  const buttonElement = document.createElement('button');
  buttonElement.textContent = "delete";
  buttonElement.className = "deleteButton";
  // buttonElement.dataset.id = bookElement.dataset.id;
  bookElement.appendChild(buttonElement);
}

function createIsReadButton(bookElement){
  const buttonElement = document.createElement('button');
  buttonElement.textContent = "change read status";
  buttonElement.className = "isReadButton";
  bookElement.appendChild(buttonElement);

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

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    addBookToLibrary(
      data.title,
      data.author,
      data.pages,
      data.isRead === 'true'

    );

    form.reset();
    dialog.close();
  });
}

function main() {
  newBookForm();
}

main();
