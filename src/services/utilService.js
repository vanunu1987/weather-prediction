function saveToStorage(key, value) {
    var str = JSON.stringify(value);
    localStorage.setItem(key, str);
}
function loadFromStorage(key) {
    // debugger
    var str = localStorage.getItem(key)
    return JSON.parse(str)
}

export default {
    saveToStorage,
    loadFromStorage,
}