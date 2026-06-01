import { useState, useEffect } from 'react'
import { fetchPokemon } from './utils/api'
import './App.css'
import PokemonCard from './components/PokemonCard'

const STAT_LABEL = {
  'hp': 'KP',
  'attack': 'Angriff',
  'defense': 'Verteid.',
  'special-attack': 'Sp-Ang',
  'special-defense': 'Sp-Vert',
  'speed': 'Initiative',
}

function App() {
  const [playerCard, setPlayerCard] = useState(null)
  const [aiCard, setAiCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState(null)
  const [winner, setWinner] = useState(null)
  const [selectedStat, setSelectedStat] = useState(null)
  const [battlePhase, setBattlePhase] = useState(null) // 'fighting' | 'done'

  async function loadCards() {
    setLoading(true)
    setResult(null)
    setWinner(null)
    setSelectedStat(null)
    setBattlePhase(null)
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

    setSelectedStat(stat)
    setBattlePhase('fighting')

    if (playerVal > aiVal)       { setResult('win');  setWinner('player') }
    else if (playerVal < aiVal)  { setResult('lose'); setWinner('ai') }
    else                         { setResult('draw'); setWinner(null) }

    // Nach 2s Kampfanimation → Phase 'done'
    setTimeout(() => setBattlePhase('done'), 2200)
  }

  const playerVal = selectedStat ? playerCard?.stats.find(s => s.stat.name === selectedStat)?.base_stat : null
  const aiVal     = selectedStat ? aiCard?.stats.find(s => s.stat.name === selectedStat)?.base_stat : null
  const winnerCard = winner === 'player' ? playerCard : winner === 'ai' ? aiCard : null

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
                isLoser={winner === 'player' && battlePhase === 'done'}
              />
              <p className="card-label">Gegner</p>
            </div>
            <div className="board-vs">VS</div>
            <div className="card-slot">
              <PokemonCard
                pokemon={playerCard}
                onStatSelect={!result ? handleStatSelect : undefined}
                isWinner={winner === 'player'}
                isLoser={winner === 'ai' && battlePhase === 'done'}
              />
              <p className="card-label">{result ? '' : 'Du — wähle einen Wert!'}</p>
            </div>
          </div>

          {/* Mittel-Panel nach Kampf */}
          {battlePhase === 'done' && (
            <div className="result-panel">
              {winnerCard && (
                <img
                  className="result-panel__sprite"
                  src={winnerCard.sprites.front_default}
                  alt={winnerCard.name}
                />
              )}
              <div className="result-panel__text">
                {result === 'win' ? '🎉 Gewonnen!' : result === 'lose' ? '😞 Verloren!' : '🤝 Unentschieden!'}
              </div>
              <div className="result-panel__stat">
                {STAT_LABEL[selectedStat]}: <span className={winner === 'player' ? 'val--win' : 'val--lose'}>{playerVal}</span>
                {' vs '}
                <span className={winner === 'ai' ? 'val--win' : 'val--lose'}>{aiVal}</span>
              </div>
              <button onClick={loadCards}>Nächste Runde</button>
            </div>
          )}

          {/* Kampfanimation Overlay — verschwindet nach 2s */}
          {battlePhase === 'fighting' && (
            <div className="battle-scene battle-scene--fade">
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
        </>
      )}
    </div>
  )
}

export default App