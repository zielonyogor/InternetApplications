import { ElixirListItem } from "./ElixirListItem.js";

const noResultsOutput = `
    <p class="error-list">No elixirs found</p>
`;

export function ElixirsList(elixirsArray, onElementClick) {
    const listElement = document.createElement('div');
    listElement.classList.add('list-panel');

    if(elixirsArray.length === 0) {
        listElement.innerHTML = noResultsOutput;
        return listElement;
    }
    
    elixirsArray.forEach(elixir => {
        listElement.appendChild(ElixirListItem(elixir, onElementClick))
    });
    
    return listElement;
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