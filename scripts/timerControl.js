function createTimerControl(task) {
  console.log('createTimerControl called for task:', task);
  console.log('createTimerControl called for task mod:', task);
  // Return a new Promise
  return new Promise((resolve, reject) => {
      fetch('/taskList/timerControl.html')
          .then(response => response.text())
          .then(html => {
              const div = document.createElement('div');
              div.innerHTML = html;
              const timer = div.firstChild;

              // Initialize and set up the timer control
              //initializeTaskDefaults(task);
              initializeTimerControl(timer, task); // Pass the timer element and task to the initializer

              // Resolve the promise with the timer element
              resolve(timer);
              updateTimerDisplay(timer,task.totalSeconds);
          })
          .catch(error => {
              console.error('Error loading timer control:', error);
              reject(error);
          });
  });
}

function initializeTaskDefaults(task) {
  if (task.timerInterval === undefined) {
    task.timerInterval = "00:00";
  }
  if (task.totalSeconds === undefined) {
      task.totalSeconds = 0;
  }
  task.timerInterval = task.timerInterval || "00:00";
  task.totalSeconds = task.totalSeconds || 0;
  // Add other default values as needed
}


// function initializeTimerControl(timer, task) {
//   const startButton = timer.getElementById('start-timer');
//   const stopButton = timer.getElementById('stop-timer');
//   if(startButton) {
//     startButton.addEventListener('click', startTimer);
//   }
//   if(stopButton) {
//     stopButton.addEventListener('click', stopTimer);
//   } else {
//     console.log("error");
//   }
//   updateTimerDisplay(timer, task.totalSeconds)
//   // Additional initialization code...
// }

// Additional functions for other app features like editing, deleting tasks, etc.
// let timerInterval = null;
// let totalSeconds = 0;

// function updateTimer() {
//     totalSeconds++;
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;

//     // Update the timer display
//     document.getElementById('timer-display').textContent = 
//         `${pad(minutes)}:${pad(seconds)}`;
// }

function updateTimerDisplay(timerElement, totalSeconds) {
  console.log(totalSeconds);
  console.log(typeof totalSeconds);
  const secs = totalSeconds;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timerElement.querySelector('.timer-display').textContent = 
      `${pad(minutes)}:${pad(seconds)}`;
}


function initializeTimerControl(timer, task) {
  if (!task) {
    console.error("Task object is undefined");
    return;
  }

  console.log(timer);
  const startButton = timer.querySelector('.start-timer');
  const stopButton = timer.querySelector('.stop-timer');

  if (startButton && stopButton) {
      startButton.addEventListener('click', () => startTimer(task, timer));
      stopButton.addEventListener('click', () => stopTimer(task, timer));
  } else {
      console.log("Error: Buttons not found");
  }
  // if (task && task.totalSeconds !== undefined) {
  //   console.log(task);
  //   updateTimerDisplay(timer. task.totalSeconds)
  // } else {
  //     console.error("Task object is undefined or missing totalSeconds property");
  // }

}

function startTimer(task, timer) {
  // Use 'timer' to find and update specific start and stop buttons
  timer.querySelector('.start-timer').disabled = true;
  timer.querySelector('.stop-timer').disabled = false;
  task.timerInterval = setInterval(() => {
      updateTimer(task, timer);
  }, 1000);
  // ... rest of your start logic ...
}

function stopTimer(task, timer) {
  // Use 'timer' to find and update specific start and stop buttons
  timer.querySelector('.start-timer').disabled = false;
  timer.querySelector('.stop-timer').disabled = true;
  clearInterval(task.timerInterval);

  // ... rest of your stop logic ...
}


// function startTimer() {
//   // Disable the start button and enable the stop button
//   document.getElementById('start-timer').disabled = true;
//   document.getElementById('stop-timer').disabled = false;

//   // Reset the timer
//   totalSeconds = 0;

//   // Update the timer every second
//   timerInterval = setInterval(updateTimer, 1000);
// }

// function stopTimer() {
//   clearInterval(timerInterval); // Stop the interval
//   document.getElementById('start-timer').disabled = false;
//   document.getElementById('stop-timer').disabled = true;
// }

function updateTimer(task, timerElement) {
  if (task.totalSeconds > 0) {
      // Decrease the total seconds by one
      task.totalSeconds--;

      // Update the timer display
      const minutes = Math.floor(task.totalSeconds / 60);
      const seconds = task.totalSeconds % 60;
      timerElement.querySelector('.timer-display').textContent = 
          `${pad(minutes)}:${pad(seconds)}`;
  } else {
      // Handle the case when the timer reaches zero
      clearInterval(task.timerInterval);
      task.timerInterval = null;
      // You can add additional logic here, such as notifying the user
  }
}

function pad(val) {
  return val > 9 ? val : "0" + val;
}


export { createTimerControl, initializeTaskDefaults }; 