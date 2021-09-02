// get input

const getInput = document.getElementById('book-name');

document.getElementById('search-btn').addEventListener('click', function () {
    const api = `http://openlibrary.org/search.json?q=${getInput.value}`;
    getInput.value = '';
    fetch(api)
        .then(res => res.json())
        .then(data => getData(data.docs))
});

/* function getImg(imageId) {
    const api = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
} */

function getData(books) {
    const bookInfo = document.getElementById('book-info');
    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book}</h5>
            </div>
        </div>
        `;
        bookInfo.appendChild(div);
    });
}