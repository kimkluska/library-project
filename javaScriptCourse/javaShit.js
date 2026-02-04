const library = [];
const booksContainer = document.getElementById('booksContainer');

class Book {
  constructor(title, author, pages, isRead, color) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.color = color
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

function addBookToLibrary(title, author, pages, isRead, color) {
  const book = new Book(title, author, pages, isRead, color);
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
  // buttonElement.dataset.id = bookElement.dataset.id;
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
  library.forEach(book => renderBook(book));
}

function formValidation() {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input");
  let isValid = true;
  inputs.forEach(input => {
    console.log(input.checkValidity());
    const errorMsg = document.getElementById(`${input.name}Msg`);
    if(errorMsg) {
      errorMsg.textContent = "";
    }
    if(!input.checkValidity()) {
      if(errorMsg) {
        errorMsg.textContent = input.validationMessage;
      }
      console.log(input.validationMessage);   
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

    addBookToLibrary(
      data.title,
      data.author,
      data.pages,
      data.isRead === 'true',
      generateColors()

    );

    form.reset();
    dialog.close();
  });
}

function main() {
  newBookForm();
}

main();
