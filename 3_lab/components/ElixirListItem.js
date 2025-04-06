export function ElixirListItem(elixirInfo, onClick) {
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');

    listItem.dataset.elixirId = elixirInfo['id'];
    listItem.innerHTML = `
         <p>${elixirInfo['name']}</p> ${elixirInfo['effect'] === null ? '' : `<p>${elixirInfo['effect']}</p>`}
    `;
    listItem.addEventListener('click', () => {
        onClick(elixirInfo['id']);
    });

    return listItem;
}