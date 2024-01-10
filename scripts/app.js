import { db, addTaskToDB, fetchTasksFromDB } from './db.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the app
  initApp();
});

function initApp() {
  // Set up event listeners for UI elements
  const addButton = document.getElementById('add-task-button');
  if(addButton) {
    addButton.addEventListener('click', addTask);
  } else {
    console.log("error");
  }
  // Add other event listeners as needed

  // Load tasks from IndexedDB and display them
  loadTasks();
}

function addTask() {
  const newTaskInput = document.getElementById('new-task');
  const task = newTaskInput.value;
  newTaskInput.value = ''; // Clear the input field

  if (task) {
      // Add the task to IndexedDB
      addTaskToDB(task).then(() => {
          // Update the task list display
          loadTasks();
      }).catch(error => console.error(error));
  }
}

function loadTasks() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if(loadingIndicator){
    loadingIndicator.style.display = 'block'; // Show loading indicator
  }
  if (!db) {
      console.log("Database is not initialized yet. Retrying...");
      setTimeout(loadTasks, 1000); // Retry after 1 second
      return;
  }
  // Fetch tasks from IndexedDB
  fetchTasksFromDB().then(tasks => {
      // Display the tasks on the page
      displayTasks(tasks);
  }).catch(error => console.error(error));
}


function displayTasks(tasks) {
  const tasksListElement = document.getElementById('tasks-list');
  tasksListElement.innerHTML = ''; // Clear existing tasks

  tasks.forEach(task => {
      // Create and append task elements to the list
      const taskElement = document.createElement('div');
      taskElement.textContent = task.name; // Assuming tasks have a 'name' property
      tasksListElement.appendChild(taskElement);
  });
}

// Add IndexedDB interaction functions: addToDatabase and fetchFromDatabase

async function addToDatabase(taskName) {
  // Logic to add a task to IndexedDB
}

async function fetchFromDatabase() {
  // Logic to fetch tasks from IndexedDB
  return []; // Placeholder return
}

// Additional functions for other app features like editing, deleting tasks, etc.
