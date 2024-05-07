const myLibrary = [];

function Book(
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

function addBookToLibrary() {
  const book = new Book('lala');
  myLibrary.push(book);
  myLibrary.push(book);
  myLibrary.push(book);
}

const addBtn = document.querySelector('.btn-add');
const dialog = document.querySelector('.dialog');
const libraryUi = document.querySelector('.library');

addBtn.addEventListener('click', function () {
  dialog.showModal();
});
addBookToLibrary();
console.log(myLibrary);

function updateUi() {
  for (const [i, book] of myLibrary.entries()) {
    libraryUi.innerHTML += `
    <div id="card-${i}" class="card-book">
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
        Status:
        <span id="read">${book.read ? 'Read' : 'Unread'}</span>
      </p>
      <p>
      Released:
      <span id="year">${book.year}</span>
    </p>
      <div class="buttons">
        <button type="button" class="btn-remove">Remove</button>
        <button type="button" class="btn-read">Read</button>
      </div>
    </div>
  </div>
    `;
  }
}
updateUi();
