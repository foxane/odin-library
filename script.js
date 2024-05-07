// || DOM
const libraryUi = document.querySelector('.library');
const btnAdd = document.querySelector('.btn-add');
// | Modal
const modal = document.querySelector('dialog');
const form = document.querySelector('form');
const inputNodes = document.querySelectorAll('input');
const btnSubmit = document.querySelector('.btn-submit');
const btnCancel = document.querySelector('.btn-cancel');

const library = [];

function Book(
  // Default values
  title,
  author = 'Unknown',
  pages = 'Unknown',
  year = 'Unknown',
  read = false
) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.year = year;
  this.read = read;
}

// Input control
// fuck you e,+,-
const invalidChars = ['-', '+', 'e'];
inputNodes.forEach((el) => {
  if (el.getAttribute('type') === 'number') {
    el.addEventListener('keydown', (e) => {
      if (invalidChars.includes(e.key)) e.preventDefault();
    });
  }
});
// prevent input retain their value after submission
function clearInput() {
  document.querySelectorAll('input').forEach((element) => {
    if (element.getAttribute('type') !== 'checkbox') {
      element.value = '';
    } else {
      element.checked = false;
    }
  });
}
function addBookToLibrary(title, author, pages, year, read) {
  const book = new Book(title, author, pages, year, read);
  library.push(book);
  console.log(library);
}

// Button control
btnAdd.addEventListener('click', function () {
  clearInput();
  modal.showModal();
});
btnCancel.addEventListener('click', function () {
  modal.close();
  clearInput();
});
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const cleanInput = [];
  inputNodes.forEach((el) => {
    if (el.getAttribute('type') !== 'checkbox') {
      cleanInput.push(el.value ? el.value : 'Unknown');
    } else {
      cleanInput.push(el.checked);
    }
  });

  addBookToLibrary(...cleanInput);
  this.submit();
});

// UI control
//oh boy..
