'use strict'

function onInit() {
    
    render() 
}

function render() {
    
    const books = getBooks()

    var strHTMLs = books.map(book =>
        `<tr >
            <td class="title">${book.title}</td>
            <td class="price">$<span>${book.price}</span></td>
            <td class="action-btns row${book.id}">

                <button onclick="onDisplayDetails(${book.id}, 'details-book')" class="read-btn">Details</button>
                <button onclick="onUpdateBook(${book.id})" class="update-btn">Update</button>
                <button onclick="onRemoveBook(${book.id}) "class="delete-btn">Delete</button>
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
        <form onsubmit="onChangePrice(${bookId}, event)" class="change-price-form form${bookId}">
            <label>Enter new price:</label>
            <input type="text" name="change-price" placeholder="e.g. 10"/>
            <button class="confirm-btn">Ok</button>
        </form>
    `
}

function onChangePrice(bookId, ev) {
    ev.preventDefault()
    const elInput = document.querySelector('[name="change-price"]')
    const price =  parseInt(elInput.value)

    updatePrice(bookId, price)

    render()
}

function onAddBook(ev, backDropClass){
    ev.preventDefault()

    const elTitleInput = document.querySelector('[name="title"]')
    const bookTitle = elTitleInput.value

    const elPriceInput = document.querySelector('[name="price"]')
    const bookPrice =  elPriceInput.value

    addBook(bookTitle, bookPrice)

    elTitleInput.value = ''
    elPriceInput.value = ''

    closeModal(ev, backDropClass)

    render()
}

function openModal(backDropclass){
    var elBackdrop = document.querySelector(`.${backDropclass}`)

    var elModal = document.querySelector(`.${backDropclass} .modal`)
   
    elBackdrop.style.opacity = '1'
    elModal.style.opacity = '1'

    elBackdrop.style.zIndex = '10'
}

function closeModal(ev, backDropclass) {
    ev.preventDefault()

    var elBackdrop = document.querySelector(`.${backDropclass}`)

    var elModal = document.querySelector(`.${backDropclass} .modal`)
   
    elBackdrop.style.opacity = '0'
    elModal.style.opacity = '0'

    elBackdrop.style.zIndex = '-2'
}