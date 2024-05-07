# odin-library

function createCard() {
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
createCard();
