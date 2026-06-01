import { useState, useEffect } from 'react'
import { fetchPokemon } from './utils/api'
import './App.css'
import PokemonCard from './components/PokemonCard'

function App() {
  // State Variablen
  const [playerCard, setPlayerCard] = useState(null)
  const [aiCard, setAiCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState(null)
  const [winner, setWinner] = useState(null)

  // Funktion, die die Karten lädt
  async function loadCards() {
    setLoading(true)
    setResult(null)
    setWinner(null) 
    const player = await fetchPokemon(Math.floor(Math.random() * 151) + 1)
    const ai = await fetchPokemon(Math.floor(Math.random() * 151) + 1)
    setPlayerCard(player)
    setAiCard(ai)
    setLoading(false)
  }

  // loadCards automatisch aufrufen, wenn die Seite lädt
  useEffect(() => {
    loadCards()
  }, [])
  // [] -> nur einmal ausführen, beim ersten Laden

  function handleStatSelect(stat) {
    const playerVal = playerCard.stats.find((s) => s.stat.name === stat).base_stat
    const aiVal = aiCard.stats.find((s) => s.stat.name === stat).base_stat

    if (playerVal > aiVal) {
      setResult('win')
      setWinner('player')
    } else if (playerVal < aiVal) {
      setResult('lose')
      setWinner('ai')
    } else {
      setResult('draw')
      setWinner(null)
    }
  }

  

  return (
    <div className="app">
      <h1>Pokémon Trumpf</h1>
      {loading ? (
        <p>Lade Pokémon...</p>
      ) : (
        <>
          <div className="board">
            <PokemonCard pokemon={aiCard} hidden={!result} isWinner={winner === 'ai'} isLoser={winner === 'player'} />
            <PokemonCard pokemon={playerCard} onStatSelect={handleStatSelect} isWinner={winner === 'player'} isLoser={winner === 'ai'} />
          </div>
          {result && (
            <div className="battle-scene">
              <img 
                src={aiCard.sprites.front_default} 
                alt={aiCard.name}
                className={winner === 'ai' ? 'battle-sprite battle-win-left' : 'battle-sprite battle-lose-left'}
              />
              <img 
                src={playerCard.sprites.front_default} 
                alt={playerCard.name}
                className={winner === 'player' ? 'battle-sprite battle-win-right' : 'battle-sprite battle-lose-right'}
              />
            </div>
          )}
          {result && (
            <p className="result">
              {result === 'win' ? '🎉 Gewonnen!' : result === 'lose' ? '😞 Verloren!' : '🤝 Unentschieden!'}
            </p>
          )}
          {result && (
            <button onClick={loadCards}>Nächste Runde</button>
          )}
        </>
      )}
    </div>
  )
}

export default App