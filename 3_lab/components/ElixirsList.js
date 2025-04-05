import { ElixirListItem } from "./ElixirListItem.js";

const noResultsOutput = `
    <p class="error-list">No elixirs found</p>
`;

const loadingOutput = `
    <p class="loading-msg">Loading elixirs...</p>
`;

export function ElixirsList() {
    const listElement = document.createElement('div');
    listElement.classList.add('list-panel');

    listElement.innerHTML = loadingOutput;
    
    return listElement;
}

export function ShowLoadingElixirsList(listElement) {
    listElement.innerHTML = loadingOutput;
}

export function UpdateElixirsList(newArray, listElement, onElementClick) {
    listElement.innerHTML = '';

    if(newArray.length === 0) {
        listElement.innerHTML = noResultsOutput;
        return;
    }
    
    newArray.forEach(elixir => {
        listElement.appendChild(ElixirListItem(elixir, onElementClick))
    });
}