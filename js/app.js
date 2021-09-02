// get input

const getInput = document.getElementById('book-name');
const bookContainer = document.getElementById('book-container');
const bookDetails = document.getElementById('show-detail');


document.getElementById('search-btn').addEventListener('click', function () {

    bookContainer.innerHTML = `
    <div class="w-100 h-100 d-flex justify-content-center align-items-center">
        <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `;
    const api = `http://openlibrary.org/search.json?q=${getInput.value}`;
    getInput.value = '';
    fetch(api)
        .then(res => res.json())
        .then(data => showBookData(data.docs))
});

const showBookData = (books) => {
    
    let bookArr = books.filter(arr => arr.cover_i !== undefined && arr.author_name !== undefined && arr.publisher !== undefined && arr.title !== undefined && arr.first_publish_year !== undefined);

    if (bookArr.length === 0) {
        
        bookContainer.innerHTML = `No Result Found`;

    } else {
        
        const bookCount = document.createElement('h3');
        bookCount.innerHTML = `Total book is ${bookArr.length}`;
        bookDetails.innerHTML = '';
        bookDetails.appendChild(bookCount);

        bookContainer.innerHTML = '';
        bookArr.forEach(book => {

            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML= `
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" style="height: 200; width: 200px;" alt="${book.title}">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.publisher[0]}</p>
                    <p class="card-text">${book.first_publish_year}</p>
                </div>
            `;
            bookContainer.appendChild(div);

        });

    }

}