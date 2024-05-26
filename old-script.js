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
  iterateLibrary();
  this.submit();
});

// UI control
//oh boy..
function iterateLibrary() {
  console.time('IterateLibrary');
  console.log(library);
  libraryUi.innerHTML = '';
  let libEl = '';
  for (const [i, book] of library.entries()) {
    libEl += createCard(i, book);
  }
  libraryUi.innerHTML = libEl;
  document.querySelectorAll('.btn-remove').forEach((btn) => {
    btn.addEventListener('click', function () {
      library.splice(btn.getAttribute('id'), 1);
      iterateLibrary();
    });
  });
  document.querySelectorAll('.btn-read').forEach((btn) => {
    btn.addEventListener('click', function () {
      library[btn.getAttribute('id')].read = true;
      iterateLibrary();
    });
  });
  console.timeEnd('IterateLibrary');
}
function createCard(i, book) {
  const isRead = book.read;
  const card = `<div id="card-${i}" class="card-book">
  <img src="images/Drawing.jpeg" alt="book cover" width="180" />
  <div class="book-info">
    <p id="title">${book.title}</p>
    <p>
      By
      <span id="author">${book.author}</span>
    </p>
    <p>
      <span id="pages">${book.pages}</span>
      Pages
    </p>
    <p>
      Released:
      <span id="year">${book.year}</span>
    </p>
    <p>
      Status:
      <span id="read">${book.read ? 'Has been read' : 'Not read yet'}</span>
    </p>
    <div class="buttons">
      <button type="button" class="btn-remove" id="${i}">Remove</button>
      ${
        !isRead
          ? `<button type="button" class="btn-read" id="${i}">Read</button>`
          : ''
      }
    </div>
  </div>
</div>`;
  return card;
}
