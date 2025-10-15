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
  { name: "TC-2", counter: ["chaff", "chaffs"] },
  { name: "SM-2", counter: ["chaff", "chaffs"] },
  { name: "SM-6", counter: ["chaff", "chaffs"] },
  { name: "RIM-7", counter: ["chaff", "chaffs"] },
  { name: "Sea Sparrow", counter: ["chaff", "chaffs"] },
  { name: "RIM-162", counter: ["chaff", "chaffs"] },
  { name: "ESSM", counter: ["chaff", "chaffs"] },
  { name: "Aster 15", counter: ["chaff", "chaffs"] },
  { name: "Aster 30", counter: ["chaff", "chaffs"] },
  { name: "S-300", counter: ["chaff", "chaffs"] },
  { name: "S-350", counter: ["chaff", "chaffs"] },
  { name: "HHQ-9", counter: ["chaff", "chaffs"] },
  { name: "Barak 8", counter: ["chaff", "chaffs"] },
  { name: "guns", counter: ["evade"] }
];

let currentMissile = null;
let score = 0;
let timeLeft = 5;
let timer = null;
let shotCount = 0;
let totalResponseTime = 0;
let shotData = [];
let startTime = null;
let trainingStartTime = null;

const missileName = document.getElementById('missileName');
const counterInput = document.getElementById('counterInput');
const submitButton = document.getElementById('submitButton');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timerDisplay');
const resultsSection = document.getElementById('resultsSection');
const endButton = document.getElementById('endButton');

function getRandomMissile() {
  return missiles[Math.floor(Math.random() * missiles.length)];
}

function displayNewMissile() {
  if (timer) {
    clearInterval(timer);
  }
  
  if (!trainingStartTime) {
    trainingStartTime = new Date();
  }
  
  currentMissile = getRandomMissile();
  missileName.textContent = currentMissile.name;
  counterInput.value = '';
  counterInput.focus();
  feedback.className = 'feedback';
  feedback.textContent = '';
  
  timeLeft = 5;
  updateTimerDisplay();
  startTime = new Date();
  
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
    
    // Record missed shot
    const endTime = new Date();
    const responseTime = (endTime - startTime) / 1000;
    totalResponseTime += responseTime;
    shotCount++;
    
    shotData.push({
      shot: shotCount,
      responseTime: responseTime,
      correct: false
    });
    
    setTimeout(displayNewMissile, 2000);
  }
}

function checkAnswer() {
  if (timer) {
    clearInterval(timer);
  }
  
  const userAnswer = counterInput.value.trim();
  const endTime = new Date();
  const responseTime = (endTime - startTime) / 1000;
  totalResponseTime += responseTime;
  
  if (!userAnswer) {
    feedback.textContent = 'Please enter a countermeasure!';
    feedback.className = 'feedback incorrect';
    
    shotData.push({
      shot: shotCount + 1,
      responseTime: responseTime,
      correct: false
    });
    
    setTimeout(displayNewMissile, 2000);
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

  shotCount++;
  shotData.push({
    shot: shotCount,
    responseTime: responseTime,
    correct: isCorrect
  });

  setTimeout(displayNewMissile, 2000);
}

function endTraining() {
  if (timer) {
    clearInterval(timer);
  }
  
  const accuracy = shotCount > 0 ? ((score / shotCount) * 100).toFixed(1) + "%" : "0%";
  const averageResponseTime = shotCount > 0 ? (totalResponseTime / shotCount).toFixed(2) : 0;
  
  document.getElementById('accuracyValue').textContent = accuracy;
  document.getElementById('responseTimeValue').textContent = averageResponseTime + "s";

  resultsSection.style.display = 'block';
  resultsSection.scrollIntoView({ behavior: 'smooth' });

  createChart();
}

function createChart() {
  const ctx = document.getElementById('performanceChart').getContext('2d');

  const shots = shotData.map(d => d.shot);
  const responseTimes = shotData.map(d => d.responseTime);
  const correctness = shotData.map(d => d.correct ? 1 : 0);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: shots,
      datasets: [
        {
          label: 'Response Time (s)',
          data: responseTimes,
          borderColor: '#9370db',
          backgroundColor: 'rgba(147, 112, 219, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          label: 'Correctness',
          data: correctness,
          borderColor: '#ff7e5f',
          backgroundColor: 'rgba(255, 126, 95, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Response Time (s)'
          }
        },
        y1: {
          beginAtZero: true,
          position: 'right',
          title: {
            display: true,
            text: 'Accuracy'
          },
          grid: {
            drawOnChartArea: false,
          },
          max: 1,
          min: 0
        },
        x: {
          title: {
            display: true,
            text: 'Shot'
          }
        }
      }
    }
  });
}

submitButton.addEventListener('click', checkAnswer);
endButton.addEventListener('click', endTraining);

counterInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

displayNewMissile();
