class Book {
  constructor(title, author, pages, isRead, color) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.color = color
  }

  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }
  get author() {
    return this._author;
  }
  set author(value) {
    this._author = value;
  }
  get pages() {
    return this._pages;
  } 
  set pages(value) {
    this._pages = value;
  }
  get isRead() {
    return this._isRead;
  }
  set isRead(value) {
    this._isRead = value;
  }
  get color() {
    return this._color;
  } 
  set color(value) {
    this._color = value;
  }

  getInfo() {
    return `${this.title} by ${this.author}<br>
            ${this.pages} pages<br>
            ${this.isRead ? "was read" : "not read yet"}<br>`;
  }
  changeStatus(){
    this.isRead = !this.isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }
  addBook(title, author, pages, isRead, color){
    const book = new Book(title, author, pages, isRead, color);
    this.books.push(book);
  }
  removeBook(id) {
  this.books = this.books.filter(book => book.id !== id);
  }
  changeReadStatus(id){
    const book = this.books.find(book => book.id === id);
    if (book) {
      book.changeStatus();
    }
  }
}

const booksContainer = document.getElementById('booksContainer');
const library = new Library();

booksContainer.addEventListener("click", (event) => {
  const bookElement = event.target.closest(".book");
  if (!bookElement) return;
  const bookId = bookElement.dataset.id;
  if(event.target.classList.contains("deleteButton")){
    library.removeBook(bookId);
  }
  if(event.target.classList.contains("isReadButton")){
    library.changeReadStatus(bookId);

  }
  renderLibrary();
});


function generateColors()
{
    let R = Math.floor((Math.random() * (54)) + 200);
    let G = Math.floor((Math.random() * 54) + 200);
    let B = Math.floor((Math.random() * 54) + 200);
    // let rgb = (R << 16) + (G << 8) + B;
    let rHex = R.toString(16);
    let gHex = G.toString(16);
    let bHex = B.toString(16);
    return `#${rHex}${gHex}${bHex}`;
    // return `#${rgb.toString(16)}`;
}

function renderBook(book) {
  const bookElement = document.createElement("div");
  bookElement.className = "book";
  bookElement.dataset.id = book.id;
  bookElement.innerHTML = book.getInfo();
  bookElement.style.backgroundColor = book.color;
  booksContainer.appendChild(bookElement);
  createDeleteButton(bookElement);
  createIsReadButton(bookElement);
}

function createDeleteButton(bookElement){
  const buttonElement = document.createElement('button');
  buttonElement.textContent = "Delete";
  buttonElement.className = "deleteButton";
  bookElement.appendChild(buttonElement);
}

function createIsReadButton(bookElement){
  const buttonElement = document.createElement('button');
  buttonElement.textContent = "Change read status";
  buttonElement.className = "isReadButton";
  bookElement.appendChild(buttonElement);

}

function renderLibrary() {
  booksContainer.innerHTML = "";
  library.books.forEach(book => renderBook(book));
}

function formValidation() {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input");
  let isValid = true;
  inputs.forEach(input => {
    const errorMsg = document.getElementById(`${input.name}Msg`);
    if(errorMsg) {
      errorMsg.textContent = "";
    }
    if(!input.checkValidity()) {
      if(errorMsg) {
        errorMsg.textContent = input.validationMessage;
      }
      isValid = false;
    }
  });
  return isValid;
}

function newBookForm() {
  const dialog = document.querySelector("dialog");
  const form = document.querySelector("form");
  const openButton = document.querySelector(".openButton.book");

  openButton.addEventListener("click", () => {
    dialog.showModal();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!formValidation()) {
      return;
    }
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    library.addBook(
      data.title,
      data.author,
      data.pages,
      data.isRead === 'true',
      generateColors()

    );
    renderLibrary();

    form.reset();
    dialog.close();
  });
}

newBookForm();
