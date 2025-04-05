/**
 * 
 * @param {*} arrayForSearch 
 * @param {*} searchProperty 
 * @param {*} onSearchResult 
 * @returns Search element
 */
export function SearchBar(arrayForSearch, searchProperty, onSearchResult) {
    const searchElement = document.createElement('div');
    searchElement.innerHTML = `
        <input type="text" id="search-input" placeholder="Search here" />
    `;
    
    const inputField = searchElement.querySelector('#search-input');
    inputField.addEventListener('input', () => {
        onSearchResult(showSearchResult(arrayForSearch, searchProperty, inputField.value));
    });

    return searchElement;
}

/**
 * 
 * @param {Array} array
 * @param {*} property  
 * @param {*} query 
 * @returns 
 */
function showSearchResult(array, property, query) {
    const re = new RegExp(`.*${query}.*`);
    return array.filter((item) => re.test(item[property].toLowerCase()));
}
