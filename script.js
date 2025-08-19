const missiles = [
  { name: "AIM-7", counter: ["chaff", "chaffs"] },
  { name: "AIM-9C", counter: ["chaff", "chaffs"] },
  { name: "Matra Super 530", counter: ["chaff", "chaffs"] },
  { name: "PL-11", counter: ["chaff", "chaffs"] },
  { name: "R-27R", counter: ["chaff", "chaffs"] },
  { name: "AA-10R", counter: ["chaff", "chaffs"] },
  { name: "R-33", counter: ["chaff", "chaffs"] },
  { name: "AA-9", counter: ["chaff", "chaffs"] },
  { name: "AIM-9", counter: ["flare", "flares"] },
  { name: "ASRAAM", counter: ["flare", "flares"] },
  { name: "AIM-132", counter: ["flare", "flares"] },
  { name: "IRIS-T", counter: ["flare", "flares"] },
  { name: "AAM-3", counter: ["flare", "flares"] },
  { name: "Bozdoğan", counter: ["flare", "flares"] },
  { name: "Merlin", counter: ["flare", "flares"] },
  { name: "Python 5", counter: ["flare", "flares"] },
  { name: "Matra Magic II", counter: ["flare", "flares"] },
  { name: "Matra R.510", counter: ["flare", "flares"] },
  { name: "Matra R.530", counter: ["flare", "flares"] },
  { name: "MAA-1A", counter: ["flare", "flares"] },
  { name: "MAA-1B", counter: ["flare", "flares"] },
  { name: "MICA IR", counter: ["flare", "flares"] },
  { name: "PL-9", counter: ["flare", "flares"] },
  { name: "R-60", counter: ["flare", "flares"] },
  { name: "AA-8", counter: ["flare", "flares"] },
  { name: "R-27T", counter: ["flare", "flares"] },
  { name: "AA-10T", counter: ["flare", "flares"] },
  { name: "Sky Sword 1", counter: ["flare", "flares"] },
  { name: "TC-1", counter: ["flare", "flares"] },
  { name: "AIM-120", counter: ["chaff", "chaffs"] },
  { name: "AMRAAM", counter: ["chaff", "chaffs"] },
  { name: "Meteor", counter: ["chaff", "chaffs"] },
  { name: "Astra", counter: ["chaff", "chaffs"] },
  { name: "AAM-4", counter: ["chaff", "chaffs"] },
  { name: "Gökdoğan", counter: ["chaff", "chaffs"] },
  { name: "Peregrine", counter: ["chaff", "chaffs"] },
  { name: "Derby", counter: ["chaff", "chaffs"] },
  { name: "Derby-ER", counter: ["chaff", "chaffs"] },
  { name: "Matra R.511", counter: ["chaff", "chaffs"] },
  { name: "R-Darter", counter: ["chaff", "chaffs"] },
  { name: "MICA EM", counter: ["chaff", "chaffs"] },
  { name: "PL-15", counter: ["chaff", "chaffs"] },
  { name: "R-77", counter: ["chaff", "chaffs"] },
  { name: "AA-12", counter: ["chaff", "chaffs"] },
  { name: "R-27EA", counter: ["chaff", "chaffs"] },
  { name: "AA-10EA", counter: ["chaff", "chaffs"] },
  { name: "Sky Sword 2", counter: ["chaff", "chaffs"] },
  { name: "TC-2", counter: ["chaff", "chaffs"] }
];

let currentMissile = null;
let score = 0;
let timeLeft = 5;
let timer = null;
const missileName = document.getElementById('missileName');
const counterInput = document.getElementById('counterInput');
const submitButton = document.getElementById('submitButton');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timerDisplay');

function getRandomMissile() {
  return missiles[Math.floor(Math.random() * missiles.length)];
}

function displayNewMissile() {
  if (timer) {
    clearInterval(timer);
  }
  
  currentMissile = getRandomMissile();
  missileName.textContent = currentMissile.name;
  counterInput.value = '';
  counterInput.focus();
  feedback.className = 'feedback';
  feedback.textContent = '';
  
  timeLeft = 5;
  updateTimerDisplay();
  
  timer = setInterval(updateTimer, 1000);
}

function updateTimerDisplay() {
  timerDisplay.textContent = `Time: ${timeLeft}s`;
  if (timeLeft <= 3) {
    timerDisplay.classList.add('timer-warning');
  } else {
    timerDisplay.classList.remove('timer-warning');
  }
}

function updateTimer() {
  timeLeft--;
  updateTimerDisplay();
  
  if (timeLeft <= 0) {
    clearInterval(timer);
    const correctAnswer = Array.isArray(currentMissile.counter) 
      ? currentMissile.counter[0] 
      : currentMissile.counter;
    feedback.textContent = `Time's up! ${currentMissile.name} was countered by ${correctAnswer}`;
    feedback.className = 'feedback incorrect';
    setTimeout(displayNewMissile, 2000);
  }
}

function checkAnswer() {
  if (timer) {
    clearInterval(timer);
  }
  
  const userAnswer = counterInput.value.trim();
  
  if (!userAnswer) {
    feedback.textContent = 'Please enter a countermeasure!';
    feedback.className = 'feedback incorrect';
    timer = setInterval(updateTimer, 1000);
    return;
  }

  let isCorrect = false;
  if (Array.isArray(currentMissile.counter)) {
    isCorrect = currentMissile.counter.some(counter => 
      userAnswer.toLowerCase() === counter.toLowerCase()
    );
  } else {
    isCorrect = userAnswer.toLowerCase() === currentMissile.counter.toLowerCase();
  }

  const correctAnswer = Array.isArray(currentMissile.counter) 
    ? currentMissile.counter[0] 
    : currentMissile.counter;
  
  if (isCorrect) {
    score += 1;
    scoreDisplay.textContent = score;
    feedback.textContent = `Correct! ${currentMissile.name} is countered by ${correctAnswer}`;
    feedback.className = 'feedback correct';
  } else {
    feedback.textContent = `Incorrect! ${currentMissile.name} is countered by ${correctAnswer}, not "${userAnswer}"`;
    feedback.className = 'feedback incorrect';
  }

  setTimeout(displayNewMissile, 2000);
}

submitButton.addEventListener('click', checkAnswer);

counterInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

function Url1() {
    window.location.href = "https://github.com/bismarck017";
}

function Url2() {
    window.location.href = "https://discord.com/invite/gWwJ5SQq4g";
}

displayNewMissile();
