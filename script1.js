const missiles = [
    "AIM-7",
        "AIM-9C",
        "Matra Super 530",
        "PL-11",
        "R-27R",
        "AA-10R",
        "R-33",
        "AA-9",
        "AIM-9",
        "ASRAAM",
        "AIM-132",
        "IRIS-T",
        "AAM-3",
        "Bozdoğan",
        "Merlin",
        "Python 5",
        "Matra Magic II",
        "Matra R.510",
        "Matra R.530",
        "MAA-1A",
        "MAA-1B",
        "MICA IR",
        "PL-9",
        "R-60",
        "AA-8",
        "R-27T",
        "AA-10T",
        "Sky Sword 1",
        "TC-1",
        "AIM-120",
        "AMRAAM",
        "Meteor",
        "Astra",
        "AAM-4",
        "Gökdoğan",
        "Peregrine",
        "Derby",
        "Derby-ER",
        "Matra R.511",
        "R-Darter",
        "MICA EM",
        "PL-15",
        "R-77",
        "AA-12",
        "R-27EA",
        "AA-10EA",
        "Sky Sword 2",
        "TC-2",
        "SM-2",
        "SM-6",
        "RIM-7",
        "Sea Sparrow",
        "RIM-162",
        "ESSM",
        "Aster 15",
        "Aster 30",
        "S-300",
        "S-350",
        "HHQ-9",
        "Barak 8",
  ];
  const callsigns = [
    "Blackjack",
        "Windrunner",
        "Firestar",
        "Gunslinger",
        "Nelson",
        "G-2AATW",
        "rhemmer702",
        "gascogne[U]",
        "scharnhorst[U]",
        "H[U]MAN",
        "Mustang-1",
        "Mustang-1",
        "Mustang-2",
        "Mustang-3",
        "Mustang-4",
        "M-1",
        "M-2",
        "M-3",
        "M-4",
        "Diana-1",
        "Diana-2",
        "Diana-3",
        "Diana-4",
        "D-1",
        "D-2",
        "D-3",
        "D-4",
        "Zayed-1",
        "Zayed-2",
        "Zayed-3",
        "Zayed-4",
        "Z-1",
        "Z-2",
        "Z-3",
        "Z-4",
        "Izhevsk-1", 
        "Izhevsk-2",
        "Izhevsk-3",
        "Izhevsk-4",
        "I-1",
        "I-2",
        "I-3",
        "I-4",
        "Texas-1",
        "Ghost-1",
        "Ghost-2",
        "Ghost-3",
        "Orion-1",
        "Orion-2",
        "Orion-3",
        "Orion-4",
        "O-1",
        "O-2",
        "O-3",
        "O-4",
        "Svir-1", 
        "Svir-2",
        "Svir-3",
        "Svir-4",
        "S-1",
        "S-2",
        "S-3",
        "S-4",
  ];

  let currentTarget = null;
  let shotCount = 0;
  let targetCount = 0;
  let trainingStartTime = null;
  let startTime = null; 
  let totalResponseTime = 0;
  let shotData = [];
  let timeElapsed = 0;
  let timer = null;

  const lockStatus = document.getElementById('lockStatus');
  const fireInput = document.getElementById('fireInput');
  const fireButton = document.getElementById('fireButton');
  const endButton = document.getElementById('endButton');
  const feedback = document.getElementById('feedback');
  const shotDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timerDisplay');
  const resultsSection = document.getElementById('resultsSection');

  function getRandomTarget() {
    const missile = missiles[Math.floor(Math.random() * missiles.length)];
    const callsign = callsigns[Math.floor(Math.random() * callsigns.length)];
    return { missile, callsign };
  }

  function displayNewTarget() {
    if (timer) {
      clearInterval(timer);
    }
    
    if (!trainingStartTime) {
      trainingStartTime = performance.now();
    }
    
    currentTarget = getRandomTarget();
    lockStatus.textContent = `Locking ${currentTarget.missile} on ${currentTarget.callsign}`;
    fireInput.value = '';
    fireInput.focus();
    feedback.className = 'feedback';
    feedback.textContent = '';

    startTime = new Date();
    targetCount++;
    
    timeElapsed = 0;
    updateTimerDisplay();
    timer = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    timeElapsed++;
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    timerDisplay.textContent = `Time: ${timeElapsed}s`;
  }

  function fireMissile() {
    if (timer) {
      clearInterval(timer);
    }
    
    const endTime = new Date();
    const responseTime = (endTime - startTime) / 1000; 
    totalResponseTime += responseTime;

    const sentence = `Locking ${currentTarget.missile} on ${currentTarget.callsign}`;
    const wordCount = sentence.trim().split(/\s+/).length;

    const minutes = responseTime / 60;
    const wpm = minutes > 0 ? (wordCount / minutes) : 0;

    shotCount++;
    shotDisplay.textContent = shotCount;

    feedback.textContent = `${responseTime.toFixed(1)}s`;
    feedback.className = 'feedback correct';

    shotData.push({
      shot: shotCount,
      wpm: wpm,
      responseTime: responseTime
    });

    setTimeout(displayNewTarget, 2000);
  }

  function endTraining() {
    if (timer) {
      clearInterval(timer);
    }
    
    const averageResponseTime = shotCount > 0 ? (totalResponseTime / shotCount).toFixed(2) : 0;

    const averageWpm = shotCount > 0
      ? (shotData.reduce((sum, d) => sum + d.wpm, 0) / shotData.length).toFixed(1)
      : 0;

    const accuracy = targetCount > 0 ? ((shotCount / targetCount) * 100).toFixed(1) + "%" : "0%";

    document.getElementById('wpmValue').textContent = averageWpm;
    document.getElementById('accuracyValue').textContent = accuracy;
    document.getElementById('responseTimeValue').textContent = averageResponseTime + "s";

    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });

    createChart();
  }

  function createChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');

    const shots = shotData.map(d => d.shot);
    const wpms = shotData.map(d => d.wpm);
    const responseTimes = shotData.map(d => d.responseTime);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: shots,
        datasets: [
          {
            label: 'WPM',
            data: wpms,
            borderColor: '#ff7e5f',
            backgroundColor: 'rgba(255, 126, 95, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            yAxisID: 'y'
          },
          {
            label: 'Response Time (s)',
            data: responseTimes,
            borderColor: '#9370db', 
            backgroundColor: 'rgba(147, 112, 219, 0.1)', 
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
              text: 'WPM'
            }
          },
          y1: {
            beginAtZero: true,
            position: 'right',
            title: {
              display: true,
              text: 'Response Time (s)'
            },
            grid: {
              drawOnChartArea: false, 
            },
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

  fireButton.addEventListener('click', fireMissile);
  endButton.addEventListener('click', endTraining);
  fireInput.addEventListener('keypress', e => { if (e.key === 'Enter') fireMissile(); });

  displayNewTarget();
