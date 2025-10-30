'use strict'

function onInit() {
    
    render()
    
}


function render() {
    
    const books = getBooks()

    var strHTMLs = books.map(book =>
        `<tr >
            <td class="title">${book.title}</td>
            <td class="price">${book.price}</td>
            <td class="action-btns">
                <button class="btn-read">Read</button>
                <button class="btn-update">Update</button>
                <button class="btn-delete">Delete</button>
            </td>
        </tr>`
    )

function onRemoveBook (bookId) {
    removeBook(bookId)
    render()
}