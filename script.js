// || DOM
const libraryUi = document.querySelector('.library');
const btnAdd = document.querySelector('.btn-add');
// | Modal
const modal = document.querySelector('dialog');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const inputPages = document.getElementById('input-pages');
const inputYear = document.getElementById('input-year');
const inputRead = document.getElementById('input-read');
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
function clearInput() {
  document.querySelectorAll('input').forEach((element) => {
    if (element.getAttribute('type') !== 'checkbox') {
      element.value = '';
    } else {
      element.checked = false;
    }
  });
}
function addBookToLibrary() {
  const book = new Book(
    inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    inputYear.value,
    inputRead.value
  );
  library.push(book);
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
btnSubmit.addEventListener('click', function () {
  addBookToLibrary();
  console.log(library);
});
