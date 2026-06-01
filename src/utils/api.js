export async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Es kann nicht auf die Daten zugegriffen werden.');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler:', error);
    }
}
