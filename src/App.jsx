import { useState, useEffect } from 'react'
import { fetchPokemon } from './utils/api'
import './App.css'
import PokemonCard from './components/PokemonCard'

function App() {
  const [playerCard, setPlayerCard] = useState(null)
  const [aiCard, setAiCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState(null)
  const [winner, setWinner] = useState(null)

  async function loadCards() {
    setLoading(true)
    setResult(null)
    setWinner(null)
    const player = await fetchPokemon(Math.floor(Math.random() * 151) + 1)
    const ai     = await fetchPokemon(Math.floor(Math.random() * 151) + 1)
    setPlayerCard(player)
    setAiCard(ai)
    setLoading(false)
  }

  useEffect(() => { loadCards() }, [])

  function handleStatSelect(stat) {
    const playerVal = playerCard.stats.find(s => s.stat.name === stat).base_stat
    const aiVal     = aiCard.stats.find(s => s.stat.name === stat).base_stat

    if (playerVal > aiVal)       { setResult('win');  setWinner('player') }
    else if (playerVal < aiVal)  { setResult('lose'); setWinner('ai') }
    else                         { setResult('draw'); setWinner(null) }
  }

  return (
    <div className="app">
      <h1>Pokémon Trumpf</h1>

      {loading ? (
        <p className="loading-text">Lade Pokémon …</p>
      ) : (
        <>
          <div className="board">
            <div className="card-slot">
              <PokemonCard
                pokemon={aiCard}
                hidden={!result}
                isWinner={winner === 'ai'}
                isLoser={winner === 'player'}
              />
              <p className="card-label">Gegner</p>
            </div>
            <div className="card-slot">
              <PokemonCard
                pokemon={playerCard}
                onStatSelect={!result ? handleStatSelect : undefined}
                isWinner={winner === 'player'}
                isLoser={winner === 'ai'}
              />
              <p className="card-label">Du — wähle einen Wert!</p>
            </div>
          </div>

          {/* Kampfanimation */}
          {result && (
            <div className="battle-scene">
              <img
                src={aiCard.sprites.front_default}
                alt={aiCard.name}
                className={`battle-sprite ${winner === 'ai' ? 'battle-win-left' : 'battle-lose-left'}`}
              />
              <img
                src={playerCard.sprites.front_default}
                alt={playerCard.name}
                className={`battle-sprite ${winner === 'player' ? 'battle-win-right' : 'battle-lose-right'}`}
              />
            </div>
          )}

          {/* Ergebnis + Button — immer sichtbar, über allem */}
          {result && (
            <div className="result-area">
              <p className="result">
                {result === 'win' ? '🎉 Gewonnen!' : result === 'lose' ? '😞 Verloren!' : '🤝 Unentschieden!'}
              </p>
              <button onClick={loadCards}>Nächste Runde</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App