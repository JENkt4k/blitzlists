let selected = null;

import { db, addTaskToDB, fetchTasksFromDB } from './db.js';

import { loadListControl, loadTasks } from './taskList.js';
import { initializePeer } from "./qrcodegen.js"

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the app
  initApp();
});

function initApp() {
  // Set up event listeners for UI elements
  const addButton = document.getElementById('add-task-button');
  
  if(addButton) {
    addButton.addEventListener('click', addTask);
  } 
  
  initializePeer();
  
  // Add other event listeners as needed
  loadListControl();

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



