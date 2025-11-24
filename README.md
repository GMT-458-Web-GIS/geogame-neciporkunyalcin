# GMT458 – Web GIS – Assignment 2: GeoGame

## 1. Game Title

**Satellite Sports City Guessr**

---

## 2. Aim

The aim of this project is to design and develop a web-based **geo-game** that runs in the browser and includes:

- An interactive web map,
- A temporal component (round timer),
- A scoring system,
- A clear set of game rules.

The game is implemented using **HTML, CSS, and JavaScript** with **OpenLayers** as the main mapping library.

---

## 3. Game Concept

**Satellite Sports City Guessr** is a world-city guessing game based on:

- A **satellite-like basemap** (Esri World Imagery),
- A **sports-related hint** for each round.

The player:

- Reads a sports-related hint about a city (e.g. football club success, Olympic host city, famous derby),
- Tries to guess where this city is by clicking on the map,
- Submits their guess and receives a score based on:
  - **Distance** between their guess and the true city location,
  - **Remaining time** on the countdown.

The game continues **until the player loses all 3 lives**.  
There is **no fixed question limit** (no “10 questions only”); rounds continue as long as the player survives.

---

## 4. Game Rules (as shown in the in-game modal)

When the page loads, a modal window appears with the rules. In summary:

- The game continues until the player loses all **3 lives**.
- Each round has a **45-second timer**.
- In every round, the player sees **one sports-related hint** about a world city.
- The player must:
  1. Look at the hint,
  2. Click on the map to choose a city location,
  3. Press **“Submit Guess”**.
- The score is higher when the guess is:
  - **closer** to the real city,
  - **faster** (more time left on the timer).
- If the guess is **too far away** (beyond a distance threshold) or the **time runs out**, the player loses **one life**.
- The game ends when **all 3 lives are lost**.

These rules are also shown to the user in a **“How to Play”** modal before the first game starts.

---

## 5. Game Progression

### 5.1 Rounds

- There is **no fixed maximum number of rounds**.
- The game keeps a **round counter** (Round: 1, 2, 3, …),
- Each new round:
  - Selects a city from a shuffled list of cities (`cities.js`),
  - Shows a new sports hint,
  - Resets the timer to 45 seconds,
  - Resets the map view to a global extent.

### 5.2 Lives

- The player starts with **3 lives**.
- A life is lost when:
  - The guess is outside the allowed distance threshold from the true city, or
  - The timer reaches zero before a guess is submitted.
- When lives reach **0**, the game ends and the final score is displayed.

### 5.3 Temporal Component

- Each round has a **45-second countdown timer** (temporal component).
- The timer is shown in the UI (`Time: 45 s` → `Time: 0 s`).
- When the remaining time is below **10 seconds**, the timer text changes style (CSS animation, red color + pulse) to warn the player.
- If the timer reaches zero:
  - The round is lost automatically,
  - The correct city location is shown,
  - The player loses one life,
  - The game proceeds to the next round (if there are remaining lives).

---
## Link:  https://gmt-458-web-gis.github.io/geogame-neciporkunyalcin/
## 6. Questions, Difficulty and Data

### 6.1 Cities Dataset

The cities and hints are stored in a separate file:

- **`cities.js`**

with a structure like:

```js
const cities = [
  {
    name: "Barcelona",
    country: "Spain",
    lat: 41.3851,
    lon: 2.1734,
    hint: "This city is home to a world-famous football club that plays in red and blue and dominated Europe around 2009–2015.",
    difficulty: 5
  },
  ...
];

