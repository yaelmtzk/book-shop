'use strict'

const gBooks = [
  {
    id: 1,
    title: 'The Art of War',
    price: 15,
    imgUrl: 'https://images.meesho.com/images/products/548939233/4nnvn_512.avif?width=512'
  },
  {
    id: 2,
    title: 'A Brief History of Time',
    price: 30,
    imgUrl:'https://bf1af2.akinoncloudcdn.com/products/2024/12/06/220452/3dbfe013-d5d7-4423-9a46-699fd31750ec_size256_cropCenter.jpg'
  },
  {
    id: 3,
    title: 'Clean Code',
    price: 40,
    imgUrl: 'https://mateuscosta.me/assets/images/books/clean_code.png'
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    price: 25,
    imgUrl: 'https://files.idyllic.app/files/static/2143329?width=256&optimizer=image'
  },
  {
    id: 5,
    title: 'The Selfish Gene',
    price: 35,
    imgUrl: 'https://play-lh.googleusercontent.com/-0R2fsJQfH-KGve9cRaTYy8EgOsHoECT6Tu5eJ0ML5eOrXEguc81McwWtAcqYuBse3qVdXQKHo_bnik=s256-rw'
  }
]

function getBooks(){

    return gBooks
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
}

function updatePrice(idx, newPrice) {
    var bookToUpdate = gBooks.find(book => book.id === idx )
    bookToUpdate.price = newPrice
}