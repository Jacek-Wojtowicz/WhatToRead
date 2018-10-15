const formInput = document.querySelector('#form-add');
const bookList = document.querySelector('#books')
const search = document.getElementById('input-search');


const addBook = (nameOfTheBook) => {
  const book = document.createElement('li');
  const deleteButton = document.createElement("button");
  deleteButton.classList.add('btn');
  deleteButton.classList.add('btn-remove');
  deleteButton.innerHTML = 'Remove';
  bookTitle = document.createElement('span');
  bookTitle.classList.add('title')
  bookTitle.innerHTML = nameOfTheBook;
  book.appendChild(bookTitle);
  book.appendChild(deleteButton);
  bookList.append(book)
}

document.addEventListener('DOMContentLoaded', function () {

  formInput.addEventListener("submit", function(e){
    e.preventDefault();
    const nameOfTheBook = this.querySelector("#input-add-book");
    if (nameOfTheBook.value !== '') {
      addBook(nameOfTheBook.value);
      nameOfTheBook.value = '';
    }
  });

  bookList.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-remove')) {
      e.target.parentElement.remove();
    }
  });

  search.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const books = bookList.querySelectorAll('li');
    books.forEach(function (book) {
      const text = book.querySelector('span').innerText.toLowerCase();
      if (text.indexOf(searchValue) != -1) {
        book.style.display = ''
      } else {
        book.style.setProperty('display', 'none');
      }
    })
  })

  function removeAllBooks() {
    while (bookList.firstChild) {
      bookList.removeChild(bookList.firstChild);
    }
  }

  function sortTitle(listToSort, sortFunction) {
    removeAllBooks();
    let sortedList = [];

    listToSort.map(function (title) {
      sortedList.push(title.querySelector('span').innerText);
    })

    //Sort array
    sortedList.sort(sortFunction).map(function (singleTitle) {
      addBook(singleTitle);
    })
  }

  function sortBooks(e) {
    let listToSort = Array.from(bookList.querySelectorAll('li'));
    switch (e.target.value) {
      case 'a-z':
        sortTitle(listToSort, function (a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        break;
      case 'z-a':
        sortTitle(listToSort, function (a, b) {
          return b.toLowerCase().localeCompare(a.toLowerCase());
        })
        break;
    }
  }
  document.getElementById('select-sort').onchange = sortBooks;
});