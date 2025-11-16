# GMT458 – Web GIS – Assignment 2: GeoGame

## 1. Game Concept

**Game name:** Geosport 

The game is a web-based geo-game where the player tries to guess **world cities** based on:
- A **satellite basemap** (Mapbox Satellite tiles displayed in the browser),
- A **sports-related hint** about the city (e.g. famous football club, number of championships, hosting a big tournament).

The player must click on the map to indicate their guess. The distance between the guessed point and the true city location determines the score.

---

## 2. Game Progression

- The game proceeds in **rounds**.
- In each round:
  1. A **random world city** is selected from a predefined list (with coordinates and a sports hint).
  2. The map is shown in **satellite view**, initially zoomed to a global/continental extent.
  3. A **sports hint text** is displayed on the right panel.
  4. A **45-second timer** starts.
  5. The player clicks on the map to guess the city location.
  6. When the player submits the guess (or the timer ends):
     - The distance between the guess and the true city is calculated.
     - If the guess is within a certain distance threshold (e.g. 150–200 km), the answer is considered **correct**.
     - The score is updated based on **distance** and **time left**.
     - A marker is shown for the true city location and (optionally) for the guess location, with a line between them.

- Difficulty can be increased by:
  - Choosing less obvious cities in later rounds,
  - Decreasing the distance threshold,
  - Or slightly zooming in the map (showing less context).

---

## 3. Number of Questions and Lives

- The player has **3 lives**:
  - A life is lost when:
    - The guess is too far away from the correct location (outside the distance threshold), or
    - The **45-second timer** runs out before submitting a guess.
  - When all 3 lives are used, the game ends immediately, even if there are remaining rounds.

---

## 4. Time / Temporal Component

- Each question has a **45-second countdown**.
- The timer is shown in the right panel (e.g. `Time left: 45 s`).
- When the timer reaches zero:
  - The round is automatically marked as **lost**,
  - The player loses **1 life**,
  - The correct city location is displayed on the map,
  - The game proceeds to the next round (if lives remain).

This provides the required temporal component for the assignment.

---

## 5. Scoring System

- Each correct answer gives a base score (e.g. 1000 points).
- The score is then reduced according to:
  - The **distance error** (km),
  - The **remaining time**.

- The scoreboard shows:
  - Current round,
  - Current total score,
  - Best score (stored in browser localStorage, optional).

---

## 6. Data: Cities and Sports Hints

- A small **JavaScript array** (hard-coded) will be used to store world cities:
  - City name,
  - Country,
  - Latitude and longitude,
  - Sports-related hint text.

Example data structure:

```js
const cities = [
  {
    name: "Barcelona",
    country: "Spain",
    lat: 41.3851,
    lon: 2.1734,
    hint: "This city is home to a football club that has won multiple UEFA Champions League titles."
  },
  {
    name: "Munich",
    country: "Germany",
    lat: 48.1351,
    lon: 11.5820,
    hint: "A football giant from this city has dominated the Bundesliga with many league championships."
  },
  // ... more cities
];
