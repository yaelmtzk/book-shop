'use strict'

const gQueryOptions = {
    filterBy: { text: '', rate: 0 },
    sortBy: {},
    page: { idx: 0, size: 3 }
}

function onInit() {
    readQueryParams()
    render() 
}

function render() {
    
    const books = getBooks(gQueryOptions)
    
    const layout = loadFromStorage('layout_db') || 'table'
 
    if (layout === 'table') renderBooksTable(books)
    else renderBooksCards(books)

    renderStat()
}

function renderBooksTable(books) {
    // Hide cards container
    document.querySelector('.cards-container ').style.display = 'none'

    var strHTML
    if (!books.length) {
        strHTML = `<tr>
                        <td colspan="3">No matching books were found...</td>
                   </tr>`
    } 
    else {
        strHTML = books.map(book =>
        `<tr >
            <td class="title">${book.title}</td>
            <td class="price">$<span>${book.price}</span></td>
            <td class="rate"><span>${'⭐'.repeat(book.rate)}</span></td>
            <td class="action-btns row${book.id}">
                <button onclick="onDisplayDetails(${book.id}, 'details-book')" class="read-btn">Details</button>
                <button onclick="onUpdateBook(${book.id})" class="update-btn">Update</button>
                <button onclick="onRemoveBook(${book.id})" class="delete-btn">Delete</button>
            </td>
        </tr>`
    ).join('')
    }

    // Show and render table container 
    document.querySelector('.table-container tbody').innerHTML = strHTML
    document.querySelector('.table-container').style.display = 'table'
}

function renderBooksCards(books) {
    // Hide table container
    document.querySelector('.table-container').style.display = 'none'

    var strHTML
    if (!books.length) {
        strHTML = `<div class="book-card">No matching books were found...</div>`
    } else {
        strHTML = books.map(book => {
            return `
            <div class="book-card">
            <p><strong>title:</strong> ${book.title}</p>
            <img src="${book.imgUrl}" />
                <div class="actions">
                    <button onclick="onDisplayDetails(${book.id}, 'details-book')" class="read-btn">Details</button>
                    <button onclick="onUpdateBook(${book.id})" class="update-btn">Update</button>
                    <button onclick="onRemoveBook('${book.id}')" class="delete-btn">Delete</button>
                </div>
            </div>`
        }).join('')
    }
    // Show and render cards container
    const elCardsContainer = document.querySelector('.cards-container')
    elCardsContainer.innerHTML = strHTML
    elCardsContainer.style.display = 'flex'
}
function renderStat() {
    const elFooter = document.querySelector('footer')
    const bookStatisticMap = getBookStatistics()

    elFooter.querySelector('.expensive-count').innerText = bookStatisticMap.expensive
    elFooter.querySelector('.avg-count').innerText = bookStatisticMap.avg
    elFooter.querySelector('.cheap-count').innerText = bookStatisticMap.cheap
}

function onSetLayout(layout) {
    saveToStorage('layout_db', layout)
    render()
}

function onSetFilterBy(filterBy) {
    
    if (filterBy.text!==undefined) {
  
        gQueryOptions.filterBy.text = filterBy.text
    } else if (filterBy.rate){
        gQueryOptions.filterBy.rate = +filterBy.rate
    }

    setQueryParams()
    render()
}

function onClearFilter(filterBy){

    gQueryOptions.filterBy.text = ''
    gQueryOptions.filterBy.rate = 0

    setQueryParams()

    var elSearchBox = document.querySelector('.filter-by .book-title')
    elSearchBox.value = ''

    var elRate = document.querySelector('.filter-by-rate select')
    elRate.value = 0

    render()
}

function onSetSortBy(sortFilter) {
    
    // const sortDir = (elSortDir.checked) ? -1 : 1
    var sortDir = ''
    gQueryOptions.sortBy = { [sortFilter] : sortDir }

    // gQueryOptions.page.idx = 0

    setQueryParams()
    render()
}

function onRemoveBook (bookId) {
    removeBook(bookId)
    render()
    showMsg('removed')
}

function onUpdateBook(bookId){

    if (document.querySelector(`.form${bookId}`)) return

    var elRow = document.querySelector(`.row${bookId}`)

    elRow.innerHTML += `
        <form onsubmit="onChangePrice(${bookId}, event)" class="change-price-form form${bookId}">
            <label>Enter new price:</label>
            <input type="text" name="change-price" placeholder="e.g. 10" required/>
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

    showMsg('updated')
}

function onAddBook(ev, backDropClass){
    ev.preventDefault()

    const elTitleInput = document.querySelector('[name="title"]')
    const bookTitle = elTitleInput.value

    const elPriceInput = document.querySelector('[name="price"]')
    const bookPrice =  elPriceInput.value

    elTitleInput.value = ''
    elPriceInput.value = ''

    addBook(bookTitle, bookPrice)

    closeBackDrop(ev, backDropClass)

    render()

    showMsg('added')
}

function onDisplayDetails(bookId, bkDrclass) {

    const book = getBook(bookId)
    
    var img = book.imgUrl.length!==0? `<img src="${book.imgUrl}"
    alt="${book.title.toLowerCase().split(' ').join('-')}-img">`: 
    'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg' 

    var strHTMLs = `
            ${img}
            <p><strong>Title</strong>: ${book.title}</p>
            <p><strong>Rating</strong>: ${'⭐'.repeat(book.rate)}</p>
            <p>${book.desc}</p>
        `
    var elDetails = document.querySelector('.details-board')
    elDetails.innerHTML = strHTMLs

    openModal(bkDrclass)
}

function openModal(backDropclass){
    var elBackdrop = document.querySelector(`.${backDropclass}`)

    var elModal = document.querySelector(`.${backDropclass} .modal`)
   
    elBackdrop.style.opacity = '1'
    elModal.style.opacity = '1'

    elBackdrop.style.zIndex = '10'
}

function closeBackDrop(ev, backDropclass) {
    ev.preventDefault()

    var elBackdrop = document.querySelector(`.${backDropclass}`)

    var elModal = document.querySelector(`.${backDropclass} .modal`)
   
    elBackdrop.style.opacity = '0'
    elModal.style.opacity = '0'

    elBackdrop.style.zIndex = '-2'
}

function showMsg(action) {
    const elMsg = document.querySelector('.user-msg')
    const elTxt = elMsg.querySelector('p span')

    elTxt.innerText = action

    elMsg.style.opacity = '1'
    elMsg.style.zIndex = '11' 

    setTimeout(() => {
        elMsg.style.opacity = '0'
        elMsg.style.zIndex = '-1'
    }, 2000)

}

function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)

    gQueryOptions.filterBy = {
        text: queryParams.get('text') || '',
        rate: +queryParams.get('rate') || 0,
    }

    if (queryParams.get('sortBy')) {
        const field = queryParams.get('sortBy')
        const dir = queryParams.get('sortDir')
        gQueryOptions.sortBy = { [field]: dir }
    }

    // gQueryOptions.page = {
    //     idx: +queryParams.get('pageIdx') || 0,
    //     size: +queryParams.get('pageSize') || 3
    // }
    renderQueryParams()
}

function renderQueryParams() {

    document.querySelector('.filter-by .book-title').value = gQueryOptions.filterBy.text
    document.querySelector('.filter-by-rate select').value = gQueryOptions.filterBy.rate

    // const sortKeys = Object.keys(gQueryOptions.sortBy)
    // if (sortKeys.length) {
    //     const sortBy = sortKeys[0]
    //     const dir = gQueryOptions.sortBy[sortKeys[0]]

    //     // document.querySelector('.sort-by select').value = sortBy || ''
    //     // document.querySelector('.sort-by .sort-desc').checked = (dir === '-1') ? true : false
    // }
}
//URL
function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('text', gQueryOptions.filterBy.text)
    queryParams.set('rate', gQueryOptions.filterBy.rate)

    const sortKeys = Object.keys(gQueryOptions.sortBy)
    
    if (sortKeys.length) {
        queryParams.set('sortBy', sortKeys[0])
        
    //  queryParams.set('sortDir', gQueryOptions.sortBy[sortKeys[0]])
    }

    // queryParams.set('pageIdx', gQueryOptions.page.idx)
    // queryParams.set('pageSize', gQueryOptions.page.size)

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}