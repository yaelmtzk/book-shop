'use strict'

const STORAGE_KEY = 'booksDB'
// var gFilterBy = {text:'', rate: 0}
var gBooks

_createBooks()

function getBook(idx){
    return gBooks.find(book => book.id === idx)
}

function getBooks(options={}){
    const filterBy = options.filterBy
    const sortBy = options.sortBy //{price: ''}

    var books = gBooks
    var books = _filterBooks(books, filterBy)
    const sortKey = Object.keys(sortBy)[0]    


    if (sortKey === 'title') {
        // const sortDir = sortBy.title
        books = books.toSorted((c1, c2) => c1.title.localeCompare(c2.title))
        //filteredBooks = filteredBooks.toSorted((c1, c2) => c1.title.localeCompare(c2.titleTxt) * sortDir)
    }
    else if (sortKey === 'price' || sortKey === 'rate') {

        // const sortDir = sortBy.price
        books = books.toSorted((c1, c2) => (+c1[sortKey] - +c2[sortKey]))
    }

    return books
}

function _filterBooks(books, filterBy) {
    if (filterBy.text!==undefined) {
        books = books.filter (book => book.title.toLowerCase().includes(filterBy.text.toLowerCase()))        
    }
    if (filterBy.rate) {
        books = books.filter(book => book.rate === filterBy.rate)
    }
    return books    
}


function addBook(title, price) {
    var newBook = _createBook(title, price)
    gBooks.push(newBook)

    _saveBooks()
}

function updatePrice(idx, newPrice) {
    var bookToUpdate = gBooks.find(book => book.id === idx )
    bookToUpdate.price = newPrice
    
    _saveBooks()
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === +bookId)

    // if (bookIdx !== -1) 
    gBooks.splice(bookIdx, 1)

    _saveBooks()
}

function getBookStatistics() {
    return gBooks.reduce((acc, book) => {
        if (book.price <= 80) acc.cheap++
        else if (book.price > 200) acc.expensive++
        else acc.avg++
        return acc
    }, { cheap: 0, avg: 0, expensive: 0 })
}

function _createBook(titleTxt, bookPrice, imgUrl){

    return {
        id: getNextId(),
        title: titleTxt,
        price: bookPrice,
        imgUrl: imgUrl || 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg',
        desc: makeLorem(100),
        rate: getRandomInt(1, 6)
    }
}

function _createBooks() {
    gBooks = loadFromStorage(STORAGE_KEY)
    
    if (!gBooks || !gBooks.length) {
        gBooks = [
            _createBook('The Art of War', 157, 'https://images.meesho.com/images/products/548939233/4nnvn_512.avif?width=512'),
            _createBook('A Brief History of Time', 53, 'https://bf1af2.akinoncloudcdn.com/products/2024/12/06/220452/3dbfe013-d5d7-4423-9a46-699fd31750ec_size256_cropCenter.jpg'),
            _createBook('Clean Code', 218, 'https://mateuscosta.me/assets/images/books/clean_code.png'),
            _createBook('Pride and Prejudice', 89, 'https://files.idyllic.app/files/static/2143329?width=256&optimizer=image'),
            _createBook('The Selfish Gene', 42, 'https://play-lh.googleusercontent.com/-0R2fsJQfH-KGve9cRaTYy8EgOsHoECT6Tu5eJ0ML5eOrXEguc81McwWtAcqYuBse3qVdXQKHo_bnik=s256-rw'),
            _createBook('Rich Dad Poor Dad', 241, 'https://play-lh.googleusercontent.com/mVqPit0R1qo_ZNzI-snEboKwkHSIYb3fXs0N3fy1NheNHbiK3J49XEH8MowWbVZFuPym=s256-rw'),
            _createBook('Dune', 96, 'https://krydder.bib.no/2002/11250024.bilde.1656673610.n.jpg'),
            _createBook('The 7 Habits of Highly Effective People', 49, 'https://play-lh.googleusercontent.com/E5iqDbDk0qPxh3FQD-gGBGHw5ve3dZD0ViJlkJK7EqWSTVR5FrZFvfs9S0WfGNUJEld3bWzW0Ur1AA=s256-rw'),
            _createBook('The Power of Now', 112, 'https://images.cdn.kukufm.com/w:256/f:webp/q:50/https://images.cdn.kukufm.com/f:webp/https://s3.ap-south-1.amazonaws.com/kukufm/cu_icons/fa40a51dae7e4e089694d0d9c73be100.png'),
            _createBook('To Kill a Mockingbird', 73, 'https://files.idyllic.app/files/static/2242609?width=256&optimizer=image')

        ]
    }
    _saveBooks()
}

function _saveBooks() {
    saveToStorage(STORAGE_KEY, gBooks)
}

