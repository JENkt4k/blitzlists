let taskListRoot = null;
// Function to load the list control
import { db, addTaskToDB, fetchTasksFromDB } from './db.js';
import { displayTasks } from './taskItem.js';
function loadListControl() {
  fetch('/taskList/taskList.html')
      .then(response => response.text())
      .then(html => {
          taskListRoot = document.getElementById('task-list-control-container').innerHTML = html;
          initializeListControl(); // Initialize the list control
      });
}

// Function to initialize the list control
function initializeListControl() {
  // Load tasks from the database and create list item controls
  loadTasks(); // Assuming loadTasks will handle populating the list
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

export { loadListControl, loadTasks };
