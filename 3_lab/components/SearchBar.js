import {ListFilter} from './ListFilter.js';

let currentArray = new Array();

/**
 * 
 * @param {*} arrayForSearch 
 * @param {*} searchProperty 
 * @param {*} onSearchResult 
 * @returns Search element
 */
export function SearchBar(arrayForSearch, searchProperty, filterProperty, filterOptions, onSearchResult) {
    currentArray = arrayForSearch;

    const searchElement = document.createElement('div');
    searchElement.innerHTML = `
        <input type="text" id="search-input" placeholder="Search here" />
    `;
    
    const inputField = searchElement.querySelector('#search-input');
    inputField.addEventListener('input', () => {
        onSearchResult(showSearchResult(currentArray, searchProperty, inputField.value));
    });

    const filterElement = ListFilter(currentArray, filterProperty, filterOptions, (array) => {
        currentArray = array;
        onSearchResult(showSearchResult(array, searchProperty, inputField.value));
    });
    searchElement.appendChild(filterElement);

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
    console.log(array);
    console.log(property);
    const re = new RegExp(`.*${query}.*`);
    return array.filter((item) => re.test(item[property].toLowerCase()));
}
