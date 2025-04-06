import { ElixirListItem } from "./ElixirListItem.js";
import { Pagination } from './Pagination.js';

const noResultsOutput = `
    <p class="error-list">No elixirs found</p>
`;

const loadingOutput = `
    <p class="loading-msg">Loading elixirs...</p>
`;

export function ElixirsList() {
    const listElement = document.createElement('div');
    listElement.classList.add('list-panel');

    listElement.innerHTML = loadingOutput; // Initiating only with loading ouput
    
    return listElement;
}

export function ShowLoadingElixirsList(listElement) {
    listElement.innerHTML = loadingOutput;
}

/**
 * 
 * @param {Array} newArray 
 * @param {*} listElement 
 * @param {*} onElementClick 
 * @param {int} currentPage 
 * @returns 
 */
export function UpdateElixirsList(newArray, listElement, onElementClick, currentPage = 1) {
    listElement.innerHTML = '';

    if(newArray.length === 0) {
        listElement.innerHTML = noResultsOutput;
        return;
    }

    const numberOfResults = 10;
    const startIndex = (currentPage - 1) * numberOfResults;
    const endIndex = startIndex + numberOfResults;
    const shownArray = newArray.slice(startIndex, endIndex);
    
    shownArray.forEach(elixir => {
        listElement.appendChild(ElixirListItem(elixir, onElementClick))
    });
    
    const paginationElement = Pagination(newArray, numberOfResults, (newPage) => {
        UpdateElixirsList(newArray, listElement, onElementClick, newPage);
    }, currentPage);
    listElement.appendChild(paginationElement);
}