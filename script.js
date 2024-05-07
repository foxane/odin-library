// || DOM
const libraryUi = document.querySelector('.library');
const btnAdd = document.querySelector('.btn-add');
// | Modal
const modal = document.querySelector('dialog');

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
function addBookToLibrary(title, author, pages, year, read = false) {
  const book = new Book(title, author, pages, year, read);
  library.push(book);
  console.log(library);
}

// UI control

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
  // Iterate inputs
  const inputs = [];
  document.querySelectorAll('input').forEach((el) => {
    if (el.getAttribute('type') !== 'checkbox') {
      inputs.push(el.value ? el.value : 'Unknown');
    } else {
      inputs.push(el.checked);
    }
  });
  addBookToLibrary(...inputs);
  console.log(inputs);
});
