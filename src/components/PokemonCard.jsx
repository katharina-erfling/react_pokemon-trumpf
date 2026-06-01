// Typ → Hintergrundfarbe der echten Pokémon TCG-Karte
// Im TCG: Normal/Flying = Colorless (weiß/creme), Poison/Ghost = Psychic (lila),
// Ice/Flying = Water (blau), Bug/Grass = Grass (grün), Rock/Ground = Fighting (orange-braun)
const TYPE_COLORS = {
  // TCG-Grass: satt grün
  grass:    { bg: 'linear-gradient(160deg, #5db85a 0%, #2d7a2a 100%)', accent: '#1a5018' },
  // TCG-Fire: leuchtendes rot-orange
  fire:     { bg: 'linear-gradient(160deg, #f05030 0%, #c02000 100%)', accent: '#801000' },
  // TCG-Water: mittelblau
  water:    { bg: 'linear-gradient(160deg, #4878d0 0%, #1848a0 100%)', accent: '#0c2870' },
  // TCG-Lightning: knallgelb
  electric: { bg: 'linear-gradient(160deg, #f8d030 0%, #d4a000 100%)', accent: '#907000' },
  // TCG-Psychic: pink-lila (auch Poison, Ghost)
  psychic:  { bg: 'linear-gradient(160deg, #e05898 0%, #a01860 100%)', accent: '#700040' },
  poison:   { bg: 'linear-gradient(160deg, #e05898 0%, #a01860 100%)', accent: '#700040' },
  ghost:    { bg: 'linear-gradient(160deg, #c050b8 0%, #783078 100%)', accent: '#401050' },
  // TCG-Fighting: orange-braun (auch Rock, Ground)
  fighting: { bg: 'linear-gradient(160deg, #c88040 0%, #906020 100%)', accent: '#604010' },
  rock:     { bg: 'linear-gradient(160deg, #c88040 0%, #906020 100%)', accent: '#604010' },
  ground:   { bg: 'linear-gradient(160deg, #d09050 0%, #a06830 100%)', accent: '#704820' },
  // TCG-Darkness: dunkel, fast schwarz mit lila Schimmer
  dark:     { bg: 'linear-gradient(160deg, #504850 0%, #201820 100%)', accent: '#100810' },
  // TCG-Metal: silber-grau
  steel:    { bg: 'linear-gradient(160deg, #c0c8d8 0%, #8090a8 100%)', accent: '#506070' },
  // TCG-Dragon: blau-lila
  dragon:   { bg: 'linear-gradient(160deg, #6050c8 0%, #302080 100%)', accent: '#181050' },
  // TCG-Fairy: pink
  fairy:    { bg: 'linear-gradient(160deg, #f090b8 0%, #d05080 100%)', accent: '#901850' },
  // TCG-Colorless: creme-weiß (Normal, Flying, Ice)
  normal:   { bg: 'linear-gradient(160deg, #f0ece0 0%, #d8d0b8 100%)', accent: '#a89878' },
  flying:   { bg: 'linear-gradient(160deg, #f0ece0 0%, #d8d0b8 100%)', accent: '#a89878' },
  ice:      { bg: 'linear-gradient(160deg, #4878d0 0%, #1848a0 100%)', accent: '#0c2870' },
  bug:      { bg: 'linear-gradient(160deg, #5db85a 0%, #2d7a2a 100%)', accent: '#1a5018' },
}

const STAT_LABEL = {
  'hp': 'KP',
  'attack': 'Angriff',
  'defense': 'Verteid.',
  'special-attack': 'Sp-Ang',
  'special-defense': 'Sp-Vert',
  'speed': 'Initiative',
}

function PokemonCard({ pokemon, onStatSelect, hidden, isWinner, isLoser }) {
  const primaryType = pokemon?.types?.[0]?.type?.name ?? 'normal'
  const colors = TYPE_COLORS[primaryType] ?? TYPE_COLORS.normal
  const hp = pokemon?.stats?.find(s => s.stat.name === 'hp')?.base_stat ?? '?'

  return (
    <div className={`pcard ${hidden ? 'pcard--hidden' : ''} ${isWinner ? 'pcard--winner' : ''} ${isLoser ? 'pcard--loser' : ''}`}>
      {/* Äußerer Rahmen (cream/weiß wie echte Karte) */}
      <div className="pcard__border">
        {hidden ? (
          <div className="pcard__back">
            <div className="pcard__back-rays" />
            <div className="pcard__back-ring pcard__back-ring--lg" />
            <div className="pcard__back-ring pcard__back-ring--md" />
            <div className="pcard__back-ring pcard__back-ring--sm" />
            <div className="pcard__back-ball">
              <div className="pcard__ball-top" />
              <div className="pcard__ball-band" />
              <div className="pcard__ball-bot" />
              <div className="pcard__ball-center" />
              <div className="pcard__ball-shine" />
            </div>
            <div className="pcard__back-logo pcard__back-logo--top">Pokémon</div>
            <div className="pcard__back-logo pcard__back-logo--bot">Pokémon</div>
          </div>
        ) : (
          <div className="pcard__face" style={{ background: colors.bg }}>
            {/* Header */}
            <div className="pcard__header">
              <div className="pcard__name-row">
                <span className="pcard__stage">Basic</span>
                <span className="pcard__name">{pokemon.name}</span>
              </div>
              <div className="pcard__hp-row">
                <span className="pcard__hp-val">{hp}</span>
                <span className="pcard__hp-label">KP</span>
              </div>
            </div>

            {/* Artwork-Fenster */}
            <div className="pcard__art-frame" style={{ borderColor: colors.accent }}>
              <div className="pcard__art-inner">
                <img
                  key={isWinner ? 'win' : isLoser ? 'lose' : 'idle'}
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className={`pcard__sprite ${isWinner ? 'animate-win' : isLoser ? 'animate-lose' : ''}`}
                />
              </div>
            </div>

            {/* Typ-Zeile unter Bild */}
            <div className="pcard__type-row">
              {pokemon.types?.map(t => (
                <span key={t.type.name} className={`type-badge type-${t.type.name}`}>{t.type.name}</span>
              ))}
            </div>

            {/* Stats-Panel (heller Bereich unten) */}
            <div className="pcard__stats-panel">
              <ul className="pcard__stats">
                {pokemon.stats.map((s) => (
                  <li
                    key={s.stat.name}
                    className="pcard__stat"
                    onClick={() => onStatSelect && onStatSelect(s.stat.name)}
                  >
                    <span className="pcard__stat-name">{STAT_LABEL[s.stat.name] ?? s.stat.name}</span>
                    <div className="pcard__stat-bar-wrap">
                      <div
                        className="pcard__stat-bar"
                        style={{
                          width: `${Math.min(100, (s.base_stat / 255) * 100)}%`,
                          background: colors.accent,
                        }}
                      />
                    </div>
                    <span className="pcard__stat-val">{s.base_stat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonCard