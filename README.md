<img width="816" height="601" alt="Screenshot 2026-06-01 224231" src="https://github.com/user-attachments/assets/0b864faf-60e4-46b5-857a-b53af7fc271e" />


# 🃏 Pokémon Trumpf

Ein browserbasiertes Pokémon-Trumpf-Spiel mit echter PokéAPI-Anbindung und originalgetreuem TCG-Karten-Design.

---

## ✨ Besonderheiten

> ⚛️ **Mehrere React-States im Zusammenspiel** – `playerCard`, `aiCard`, `loading`, `result`, `winner`, `selectedStat` und `battlePhase` steuern gemeinsam den gesamten Spielablauf

> 🌐 **Echte PokéAPI-Anbindung** – Pokémon werden per `fetch` aus der öffentlichen PokéAPI geladen, zufällig aus den ersten 151 ausgewählt

> 🎨 **TCG-Typ-Farben** – jede Karte erhält eine dem echten Pokémon Trading Card Game nachempfundene Farbgebung je nach primärem Typ (Grass, Fire, Water, Psychic, Darkness etc.)

> 🎬 **Kampfanimation mit `battlePhase`** – ein zweistufiger Ablauf (`fighting` → `done`) steuert Overlay-Animation und Ergebnis-Panel mit `setTimeout`

> 🃏 **Kartenrückseite als Pokéball** – die gegnerische Karte zeigt bis zur Auflösung eine detaillierte CSS-Pokéball-Rückseite

> 🧩 **Komponentenstruktur** – `PokemonCard` als wiederverwendbare Komponente mit Props für Zustand, Gewinner/Verlierer-Styling und optionalem Stat-Select-Handler

---

## 🎮 Spielablauf

Zwei zufällige Pokémon werden geladen. Der Spieler wählt einen Stat seiner Karte – der höhere Wert gewinnt. Nach der Kampfanimation wird das Ergebnis angezeigt, dann geht es in die nächste Runde.

<img width="1087" height="805" alt="Screenshot 2026-06-01 224246" src="https://github.com/user-attachments/assets/98049498-d090-446c-989b-47229ffe672d" />


---

## 📁 Projektstruktur

```
/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── components/
│   │   └── PokemonCard.jsx
│   └── utils/
│       └── api.js
├── index.html
└── package.json
```

---

## 🛠️ Technologien

- **React** – `useState`, `useEffect`, funktionale Komponenten, Props, JSX
- **PokéAPI** – `https://pokeapi.co` – öffentliche REST API
- **CSS3** – dynamische Inline-Styles, Typ-Farben, Keyframe-Animationen, Pokéball-Rückseite
- **Vite** – Build-Tool

---

## 📚 Kontext

Teil der **Softwareentwicklerin Frontend Javascript Zertifizierung** bei GFN (extern zertifiziert durch WPI), März – Juni 2026.
