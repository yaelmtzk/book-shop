
function saveToStorage(key, value) {
    const json = JSON.stringify(value)
    localStorage.setItem(key, json)
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    const value = JSON.parse(json)
    return value
}

function getNextId() {
  var nextId = +localStorage.getItem('nextBookId') || 1
  localStorage.setItem('nextBookId', nextId + 1)
  console.log('nextId', nextId);
  
  return nextId
}