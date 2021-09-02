// get input
const bookCount = document.createElement('h3');
const getInput = document.getElementById('book-name');
const bookContainer = document.getElementById('book-container');
const bookDetails = document.getElementById('show-detail');


document.getElementById('search-btn').addEventListener('click', function () {

    bookContainer.innerHTML = `
    <div class="w-100 h-100 d-flex justify-content-center align-items-center">
        <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `;
    const api = `https://openlibrary.org/search.json?q=${getInput.value}`;
    getInput.value = '';
    fetch(api)
        .then(res => res.json())
        .then(data => showBookData(data.docs))
});

const showBookData = (books) => {
    
    let bookArr = books.filter(arr => arr.cover_i !== undefined && arr.author_name !== undefined && arr.publisher !== undefined && arr.title !== undefined && arr.first_publish_year !== undefined);

    if (bookArr.length === 0) {

        bookCount.innerHTML = '';
        bookContainer.innerHTML = `<h4 class="mx-auto text-center text-warning">No Result Found !!</h4>`;

    } else {
        
        bookCount.innerHTML = `<h4 class="mx-auto text-center rounded bg-info text-white">Total book is ${bookArr.length}</h4>`;
        bookDetails.innerHTML = '';
        bookDetails.appendChild(bookCount);

        bookContainer.innerHTML = '';
        bookArr.forEach(book => {

            const div = document.createElement('div');
            div.classList.add('card', 'm-2' );
            div.innerHTML= `
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" style="height: 350px; width: 100%; margin-top: 15px;" alt="${book.title}">
                <div class="card-body">
                    <h5 class="card-title text-primary my-3">${book.title}</h5>
                    <p class="card-text text-info">${book.author_name[0]}</p>
                    <p class="card-text text-danger">${book.publisher[0]}</p>
                    <p class="card-text text-secondary">${book.first_publish_year}</p>
                </div>
            `;
            bookContainer.appendChild(div);

        });

    }

}