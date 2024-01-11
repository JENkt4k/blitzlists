function loadTimerControl() {
  fetch('timerControl.html')
      .then(response => response.text())
      .then(html => {
          document.getElementById('timer-control-container').innerHTML = html;
          initializeTimerControl(); // Function to add event listeners and initialize the control
      });
}

function initializeTimerControl() {
  // document.getElementById('start-timer').addEventListener('click', startTimer);
  // document.getElementById('stop-timer').addEventListener('click', stopTimer);
  const startButton = document.getElementById('start-timer');
  const stopButton = document.getElementById('stop-timer');
  if(startButton) {
    startButton.addEventListener('click', startTimer);
  }
  if(stopButton) {
    stopButton.addEventListener('click', stopTimer);
  } else {
    console.log("error");
  }
  // Additional initialization code...
}

// Additional functions for other app features like editing, deleting tasks, etc.
let timerInterval = null;
let totalSeconds = 0;

function updateTimer() {
    totalSeconds++;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Update the timer display
    document.getElementById('timer-display').textContent = 
        `${pad(minutes)}:${pad(seconds)}`;
}

function startTimer() {
  // Disable the start button and enable the stop button
  document.getElementById('start-timer').disabled = true;
  document.getElementById('stop-timer').disabled = false;

  // Reset the timer
  totalSeconds = 0;

  // Update the timer every second
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval); // Stop the interval
  document.getElementById('start-timer').disabled = false;
  document.getElementById('stop-timer').disabled = true;
}


function pad(val) {
  return val > 9 ? val : "0" + val;
}


export { loadTimerControl }; 