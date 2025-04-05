// export function getElixirsLength() {
//     return elixirs.length;
// }

export async function getAllElixirs() {
    try {
        const elixirs = await fetch('https://wizard-world-api.herokuapp.com/Elixirs', {
            method: 'GET'
        })
        .then(response => response.json());
        return elixirs;
    }
    catch (error) {
        console.error('Failed to fetch:', error);
        return [];
    }
    
}

/**
 * Returns elixirs from start_index to end_index, defaults to first end_index elements
 * @param {int} start_index  - Inclusive starting index
 * @param {int} end_index - Exclusive ending index
 */
export function getElixirs(start_index = 0, end_index = 20) {
    return elixirs.slice(start_index, end_index);
}

/**
 * Returns an elixir
 * @param {string} id - UUID of an elixir 
 * @returns 
 */
export async function getElixir(id) {
    return await fetch(`https://wizard-world-api.herokuapp.com/Elixirs/${id}`, {
        method: 'GET'
    })
    .then(response => response.json())
}