// =====================
// Map Initialization
// =====================

// Free satellite-like basemap (Esri World Imagery)
const rasterLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

// Vector layer for guess + true city markers
const vectorSource = new ol.source.Vector();
const vectorLayer = new ol.layer.Vector({
  source: vectorSource
});

const map = new ol.Map({
  target: 'map',
  layers: [rasterLayer, vectorLayer],
  view: new ol.View({
    center: ol.proj.fromLonLat([0, 20]), // world view
    zoom: 2
  })
});

// =====================
// Game State Variables
// =====================

let shuffledCities = [];
let currentRound = 0; // just a counter, no max
let lives = 3;
let score = 0;
let highScore = 0;

let currentCity = null;
let lastClickCoordLonLat = null; // [lon, lat]
let timerInterval = null;
let timeLeft = 45;
let gameActive = false;

// =====================
// DOM Elements
// =====================

const timerEl = document.getElementById('timer');
const livesEl = document.getElementById('lives');
const roundEl = document.getElementById('round');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const hintTitleEl = document.getElementById('hint-title');
const hintTextEl = document.getElementById('hint-text');
const feedbackEl = document.getElementById('feedback');
const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');

// Modal
const rulesModal = document.getElementById('rules-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

// =====================
// Helpers
// =====================

function loadHighScore() {
  const stored = localStorage.getItem('geoGameHighScore');
  if (stored) {
    highScore = Number(stored) || 0;
  }
  highScoreEl.textContent = `High score: ${highScore}`;
}

function saveHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('geoGameHighScore', String(highScore));
    highScoreEl.textContent = `High score: ${highScore}`;
  }
}

function updateLivesUI() {
  const hearts = "❤".repeat(Math.max(lives, 0));
  livesEl.textContent = `Lives: ${hearts || '0'}`;
}

function updateRoundUI() {
  if (currentRound === 0) {
    roundEl.textContent = `Round: -`;
  } else {
    roundEl.textContent = `Round: ${currentRound}`;
  }
}

function updateScoreUI() {
  scoreEl.textContent = `Score: ${score}`;
}

function resetFeedback() {
  feedbackEl.textContent = "";
  feedbackEl.classList.remove('ok', 'error');
}

function setFeedback(message, type = "") {
  feedbackEl.textContent = message;
  feedbackEl.classList.remove('ok', 'error');
  if (type === "ok") feedbackEl.classList.add('ok');
  if (type === "error") feedbackEl.classList.add('error');
}

function resetTimerUI() {
  timerEl.textContent = `Time: ${timeLeft} s`;
  timerEl.classList.remove('low-time');
}

function setTimerLowTime(active) {
  if (active) {
    timerEl.classList.add('low-time');
  } else {
    timerEl.classList.remove('low-time');
  }
}

// Haversine distance in kilometers
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const toRad = deg => deg * Math.PI / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Shuffle helper
function shuffleArray(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// =====================
// Map interaction
// =====================

// Style for guess point
const guessStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({ color: 'rgba(239, 68, 68, 0.9)' }),
    stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
  })
});

// Style for true city point
const trueStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({ color: 'rgba(34, 197, 94, 0.9)' }),
    stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
  })
});

// Style for line between guess and true location
const lineStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'rgba(249, 250, 251, 0.8)',
    width: 2,
    lineDash: [6, 6]
  })
});

map.on('click', function (evt) {
  if (!gameActive || !currentCity) return;

  const lonLat = ol.proj.toLonLat(evt.coordinate);
  lastClickCoordLonLat = lonLat;

  // Remove only old guess features
  vectorSource.getFeatures().forEach(f => {
    if (f.get('type') === 'guess') {
      vectorSource.removeFeature(f);
    }
  });

  const guessFeature = new ol.Feature({
    geometry: new ol.geom.Point(evt.coordinate),
    type: 'guess'
  });
  guessFeature.setStyle(guessStyle);
  vectorSource.addFeature(guessFeature);

  setFeedback('Guess selected. Now press "Submit Guess".', "ok");
  submitBtn.disabled = false;
});

// =====================
// Timer
// =====================

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 45;
  resetTimerUI();
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    timerEl.textContent = `Time: ${timeLeft} s`;

    if (timeLeft <= 10) {
      setTimerLowTime(true);
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      onTimeUp();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  setTimerLowTime(false);
}

// =====================
// Game Flow
// =====================

function startGame() {
  gameActive = true;
  currentRound = 0;
  lives = 3;
  score = 0;
  shuffledCities = shuffleArray(cities); // from cities.js
  resetFeedback();

  updateLivesUI();
  updateScoreUI();
  updateRoundUI();
  lastClickCoordLonLat = null;
  vectorSource.clear();
  submitBtn.disabled = true;

  nextRound();
}

function endGame(message) {
  gameActive = false;
  stopTimer();
  submitBtn.disabled = true;

  setFeedback(message, "error");
  saveHighScore();

  hintTitleEl.textContent = "Game Over";
  hintTextEl.textContent = "Press \"Start Game\" to play again.";
}

function nextRound() {
  stopTimer();
  setTimerLowTime(false);
  vectorSource.clear();
  lastClickCoordLonLat = null;
  submitBtn.disabled = true;
  resetFeedback();

  if (!gameActive) return;

  if (lives <= 0) {
    endGame(`You ran out of lives! Final score: ${score}`);
    return;
  }

  currentRound += 1;
  updateRoundUI();

  // Cycle through cities indefinitely
  if (shuffledCities.length === 0) {
    shuffledCities = shuffleArray(cities);
  }
  const index = (currentRound - 1) % shuffledCities.length;
  currentCity = shuffledCities[index];

  hintTitleEl.textContent = "Sports Hint";
  hintTextEl.textContent = currentCity.hint;

  // Zoom out to world view each round
  map.getView().animate({
    center: ol.proj.fromLonLat([0, 20]),
    zoom: 2,
    duration: 500
  });

  timeLeft = 45;
  resetTimerUI();
  startTimer();
}

function onTimeUp() {
  if (!gameActive || !currentCity) return;

  lives -= 1;
  updateLivesUI();

  showTrueLocationOnly();

  setFeedback(
    `Time is up! The correct city was ${currentCity.name}, ${currentCity.country}. You lost 1 life.`,
    "error"
  );

  if (lives <= 0) {
    setTimeout(() => {
      endGame(`You ran out of lives! Final score: ${score}`);
    }, 3000);
  } else {
    setTimeout(nextRound, 3000);
  }
}

// =====================
// Guess Submission & Scoring
// =====================

function showTrueLocationOnly() {
  vectorSource.clear();

  const trueCoord = ol.proj.fromLonLat([currentCity.lon, currentCity.lat]);
  const trueFeature = new ol.Feature({
    geometry: new ol.geom.Point(trueCoord),
    type: 'true'
  });
  trueFeature.setStyle(trueStyle);
  vectorSource.addFeature(trueFeature);

  map.getView().animate({
    center: trueCoord,
    zoom: 4,
    duration: 800
  });
}

function showGuessAndTrue(distanceKm) {
  vectorSource.clear();

  const trueCoord = ol.proj.fromLonLat([currentCity.lon, currentCity.lat]);
  const guessCoord = ol.proj.fromLonLat(lastClickCoordLonLat);

  const trueFeature = new ol.Feature({
    geometry: new ol.geom.Point(trueCoord),
    type: 'true'
  });
  trueFeature.setStyle(trueStyle);

  const guessFeature = new ol.Feature({
    geometry: new ol.geom.Point(guessCoord),
    type: 'guess'
  });
  guessFeature.setStyle(guessStyle);

  const lineFeature = new ol.Feature({
    geometry: new ol.geom.LineString([guessCoord, trueCoord]),
    type: 'line'
  });
  lineFeature.setStyle(lineStyle);

  vectorSource.addFeature(trueFeature);
  vectorSource.addFeature(guessFeature);
  vectorSource.addFeature(lineFeature);

  const extent = vectorSource.getExtent();
  map.getView().fit(extent, {
    padding: [40, 40, 40, 40],
    duration: 800
  });
}

function submitGuess() {
  if (!gameActive || !currentCity) return;

  if (!lastClickCoordLonLat) {
    setFeedback("Please click somewhere on the map before submitting your guess.", "error");
    return;
  }

  stopTimer();

  const guessedLon = lastClickCoordLonLat[0];
  const guessedLat = lastClickCoordLonLat[1];
  const distanceKm = getDistanceKm(
    currentCity.lat,
    currentCity.lon,
    guessedLat,
    guessedLon
  );

  const thresholdKm = 200; // "correct" distance threshold

  const baseScore = 1000;
  const distancePenalty = distanceKm * 2;
  const timeBonus = timeLeft * 5;
  let roundScore = Math.max(0, Math.round(baseScore - distancePenalty + timeBonus));

  if (distanceKm <= thresholdKm) {
    score += roundScore;
    updateScoreUI();
    setFeedback(
      `Nice! You were ${distanceKm.toFixed(1)} km away. Round score: ${roundScore}.`,
      "ok"
    );
  } else {
    lives -= 1;
    updateLivesUI();
    roundScore = 0;
    setFeedback(
      `Too far! You were ${distanceKm.toFixed(1)} km away from ${currentCity.name}, ${currentCity.country}. You lost 1 life.`,
      "error"
    );
  }

  showGuessAndTrue(distanceKm);

  if (lives <= 0) {
    setTimeout(() => {
      endGame(`You ran out of lives! Final score: ${score}`);
    }, 3000);
  } else {
    setTimeout(nextRound, 3000);
  }

  submitBtn.disabled = true;
}

// =====================
// Event Listeners
// =====================

startBtn.addEventListener('click', () => {
  startGame();
});

submitBtn.addEventListener('click', () => {
  submitGuess();
});

// Modal: show on page load
window.onload = () => {
  rulesModal.style.display = 'flex';
};

closeModalBtn.addEventListener('click', () => {
  rulesModal.style.display = 'none';
});

// =====================
// Initial Setup
// =====================

loadHighScore();
updateLivesUI();
updateRoundUI();
updateScoreUI();
resetFeedback();
submitBtn.disabled = true;
