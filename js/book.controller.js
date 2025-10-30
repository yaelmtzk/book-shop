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
            <td class="action-btns row${book.id}">
                <button class="read-btn">Read</button>
                <button onclick="onUpdateBook(${book.id})" class="update-btn">Update</button>
                <button onclick="onRemoveBook('${book.id}')"class="btn-delete">Delete</button>
            </td>
        </tr>`
    )

    document.querySelector('tbody').innerHTML = strHTMLs.join('')
}

function onRemoveBook (bookId) {
    removeBook(bookId)
    render()
}

function onUpdateBook(bookId){

    if (document.querySelector(`.form${bookId}`)) return

    var elRow = document.querySelector(`.row${bookId}`)

    elRow.innerHTML += `
        <form onsubmit="onChangePrice(${bookId}, event)" class="form${bookId}">
            <label>Enter new price:
            <input type="text" name="change=price" placeholder="e.g. 10"/>
            <button class="confirm-btn">Ok</button>
            </label>
        </form>
    `
}
