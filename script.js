class Book {
  static bookArr = []; // I dont know how pivate static field work
  #title;
  #author;
  #pages;
  #year;
  #read = false;

  constructor(title, author, pages, year, read) {
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#year = year;
    this.#read = read;
  }

  pushBook() {
    Book.bookArr.push(this);
  }
  removeBook() {
    Book.bookArr.splice(Book.bookArr.indexOf(this), 1);
  }
  readBook() {
    this.#read = true;
  }
  get title() {
    return this.#title;
  }
  get author() {
    return this.#author;
  }
  get pages() {
    return this.#pages;
  }
  get year() {
    return this.#year;
  }
  get read() {
    return this.#read;
  }
}

const DOM = (function () {
  // || DOM
  const libraryUi = document.querySelector('.library');
  const btnAdd = document.querySelector('.btn-add');
  // | Modal
  const modal = document.querySelector('dialog');
  const form = document.querySelector('form');
  const inputNodes = document.querySelectorAll('input');
  const inputTitle = document.querySelector('#input-title');
  const btnCancel = document.querySelector('.btn-cancel');

  // <--- UI control --->
  function updateUi() {
    libraryUi.innerHTML = '';
    if (Book.bookArr.length === 0) {
      libraryUi.innerHTML = `<p class="center-text" style="margin: auto; font-style: italic">
      Why am i empty?
    </p>`;
    }
    for (const [index, bookObj] of Book.bookArr.entries()) {
      libraryUi.appendChild(createBookEl(index, bookObj));
    }
  }

  // <--- Input validation --->
  // Prevent symbol inputted in number field
  const invalidChars = ['-', '+', 'e', '.'];
  inputNodes.forEach((el) => {
    if (el.getAttribute('type') === 'number') {
      el.addEventListener('keydown', (e) => {
        if (invalidChars.includes(e.key)) e.preventDefault();
      });
    }
  });
  // remove value after sumbit
  function clearInput() {
    document.querySelectorAll('input').forEach((element) => {
      if (element.getAttribute('type') !== 'checkbox') {
        element.value = '';
      } else {
        element.checked = false;
      }
    });
  }

  // <--- Button control --->
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
    if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Every books need title. Change my mind');
      inputTitle.reportValidity();
      return;
    }
    inputNodes.forEach((el) => {
      if (el.getAttribute('type') !== 'checkbox') {
        cleanInput.push(el.value ? el.value : 'Unknown');
      } else {
        cleanInput.push(el.checked);
      }
    });
    addBookToLibrary(cleanInput);
    updateUi();
    this.submit();
  });

  return { updateUi };
})();

const addBookToLibrary = function (bookData) {
  const newBook = new Book(...bookData);
  newBook.pushBook();
};

// The argument is book object from the static array with their index
const createBookEl = function (index, bookObj) {
  const div = document.createElement('div');
  div.setAttribute('id', `card-${Book.bookArr.indexOf(bookObj)}`);
  div.setAttribute('class', 'card-book');

  const img = document.createElement('img');
  img.setAttribute('src', 'images/Drawing.jpeg');
  img.setAttribute('alt', `${bookObj.title}-cover`);
  img.setAttribute('width', '180');

  const bookContent = document.createElement('div');
  bookContent.setAttribute('class', 'book-content');

  const titleP = document.createElement('p');
  titleP.setAttribute('class', 'bold');
  titleP.textContent = bookObj.title;

  const authorP = document.createElement('p');
  const authorSpan = document.createElement('span');
  authorSpan.setAttribute('class', 'bold');
  authorSpan.textContent = bookObj.author;
  authorP.appendChild(document.createTextNode('By '));
  authorP.appendChild(authorSpan);

  const pagesP = document.createElement('p');
  const pagesSpan = document.createElement('span');
  pagesSpan.setAttribute('class', 'bold');
  pagesSpan.textContent = bookObj.pages;
  pagesP.appendChild(pagesSpan);
  pagesP.appendChild(document.createTextNode(' Pages'));

  const yearP = document.createElement('p');
  const yearSpan = document.createElement('span');
  yearSpan.setAttribute('class', 'bold');
  yearSpan.textContent = bookObj.year;
  yearP.appendChild(document.createTextNode('Released in: '));
  yearP.appendChild(yearSpan);

  const readP = document.createElement('p');
  const readSpan = document.createElement('span');
  readSpan.setAttribute('class', 'bold');
  readSpan.textContent = bookObj.read ? 'Has been read' : 'Not read yet';
  readP.appendChild(document.createTextNode('Status: '));
  readP.appendChild(readSpan);

  const btnDiv = document.createElement('div');
  btnDiv.setAttribute('class', 'buttons');

  btnRemove = document.createElement('button');
  btnRemove.setAttribute('type', 'button');
  btnRemove.setAttribute('class', 'btn-remove');
  btnRemove.setAttribute('id', `remove-${index}`);
  btnRemove.textContent = 'Remove';

  btnRead = document.createElement('button');
  btnRead.setAttribute('type', 'button');
  btnRead.setAttribute('class', 'btn-read');
  btnRead.setAttribute('id', `read-${index}`);
  btnRead.textContent = 'Read';

  div.appendChild(img);
  div.appendChild(bookContent);
  bookContent.appendChild(titleP);
  bookContent.appendChild(authorP);
  bookContent.appendChild(pagesP);
  bookContent.appendChild(yearP);
  bookContent.appendChild(readP);
  bookContent.appendChild(btnDiv);
  btnDiv.appendChild(btnRemove);
  if (!bookObj.read) btnDiv.appendChild(btnRead);

  btnRemove.addEventListener('click', () => {
    bookObj.removeBook();
    DOM.updateUi();
  });
  btnRead.addEventListener('click', () => {
    bookObj.readBook();
    DOM.updateUi();
  });
  return div;
};
