function PokemonCard({ pokemon, onStatSelect, selectedStat, hidden, isWinner, isLoser }) {
    return (
  <div className="card">
    {hidden ? (
      <p className="hidden-card">?</p>
    ) : (
      <>
        <img 
            key={isWinner ? 'win' : isLoser ? 'lose' : 'idle'}
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            className={isWinner ? 'animate-win' : isLoser ? 'animate-lose' : ''}
        />
        <p>{pokemon.name}</p>
        <ul>
          {pokemon.stats.map((s) => (
            <li key={s.stat.name} onClick={() => onStatSelect(s.stat.name)}>
                {s.stat.name}: {s.base_stat}
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
)
}

export default PokemonCard