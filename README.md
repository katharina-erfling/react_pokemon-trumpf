<img width="920" height="584" alt="Screenshot 2026-06-01 124811" src="https://github.com/user-attachments/assets/bc43670c-9662-4812-b85e-83b79560e344" />

# Pokémon Trumpf

Ein rundenbasiertes Kartenvergleichsspiel – gebaut mit React und der PokéAPI.

<br>

## Projektstruktur

```
pokemon-quartett/
├── src/
│   ├── components/
│   │   └── PokemonCard.jsx
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── index.html
└── package.json
```

<br>

## Themen & Technologien

- React – funktionale Komponenten, JSX, Props
- React Hooks – `useState`, `useEffect`
- JavaScript (ES6+) – async/await, fetch, Arrow Functions, Template Literals, Destructuring
- CSS3 – Animationen mit `@keyframes`, Flexbox
- PokéAPI (https://pokeapi.co) – REST API, keine Authentifizierung nötig

<br>

## Spielablauf

- Zwei zufällige Pokémon aus Generation 1 werden beim Start geladen
- Die gegnerische Karte liegt verdeckt
- Der Spieler wählt einen Stat (KP, Angriff, Verteidigung, Sp. Angriff, Speed)
- Beide Karten werden aufgedeckt und die Werte verglichen
- Eine Kampfanimation zeigt wer gewonnen und wer verloren hat
- Mit „Nächste Runde" werden zwei neue Pokémon geladen

<br>

## Besonderheiten

> **Kampfanimation** – nach der Stat-Auswahl fliegen beide Sprites als Layer in die Mitte, stoßen zusammen – der Verlierer fliegt aus dem Bild

> **Live-Daten** – alle Pokémon-Daten werden direkt von der PokéAPI geladen, kein lokaler Datensatz nötig

<br>

## Kontext

Teil der **Softwareentwicklerin Frontend Javascript Zertifizierung** bei GFN (extern zertifiziert durch WPI), März – Juni 2026.
