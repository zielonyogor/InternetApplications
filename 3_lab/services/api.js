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
        //alert('Failed to load elixirs. Try again later.');
        return [];
    }
    
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