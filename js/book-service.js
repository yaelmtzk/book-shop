'use strict'

const STORAGE_KEY = 'booksDB'

var gBooks

_createBooks()

function getBook(idx){
    return gBooks.find(book => book.id === idx)
}

function getBooks(){
    return gBooks
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)

    _saveBooks()
}

function updatePrice(idx, newPrice) {
    var bookToUpdate = gBooks.find(book => book.id === idx )
    bookToUpdate.price = newPrice
    
    _saveBooks()
}

function addBook(title, price) {
    var newBook = _createBook(title, price)
    gBooks.push(newBook)

    _saveBooks()
}

function _createBook(titleTxt, bookPrice, imgUrl = ''){

    return {
        id: getNextId(),
        title: titleTxt,
        price: bookPrice,
        imgUrl
    }
}

function _createBooks() {
    gBooks = loadFromStorage(STORAGE_KEY)

    if (!gBooks || !gBooks.length) {
        gBooks = [
            _createBook('The Art of War', 15, 'https://images.meesho.com/images/products/548939233/4nnvn_512.avif?width=512'),
            _createBook('A Brief History of Time', 30, 'https://bf1af2.akinoncloudcdn.com/products/2024/12/06/220452/3dbfe013-d5d7-4423-9a46-699fd31750ec_size256_cropCenter.jpg'),
            _createBook('Clean Code', 40, 'https://mateuscosta.me/assets/images/books/clean_code.png'),
            _createBook('Pride and Prejudice', 25, 'https://files.idyllic.app/files/static/2143329?width=256&optimizer=image'),
            _createBook('The Selfish Gene', 35, 'https://play-lh.googleusercontent.com/-0R2fsJQfH-KGve9cRaTYy8EgOsHoECT6Tu5eJ0ML5eOrXEguc81McwWtAcqYuBse3qVdXQKHo_bnik=s256-rw')
        ]
    }
    _saveBooks()
}

function _saveBooks() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}