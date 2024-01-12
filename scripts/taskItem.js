import { createTimerControl, initializeTaskDefaults } from './timerControl.js';
// Function to create a list item control
function createListItemControl(task) {
  // Fetch and return a list item control element
  return fetch('/taskList/taskItem.html')
      .then(response => response.text())
      .then(html => {
          const div = document.createElement('div');
          div.innerHTML = html;
          const taskItem = div.firstChild;
          const taskNameQry = taskItem.querySelector('.task-name');
          if(taskNameQry){
            taskNameQry.textContent = task.name;
          }
          else {
            console.log(response);
          }
          return createTimerControl(task).then(timer => {
            // Append the timerElement to the task item
            taskItem.appendChild(timer);
            // Add event listeners and other logic to the task item
            return taskItem;
        });
      });
}

function displayTasks(tasks) {
  const tasksListElement = document.getElementById('task-list-control-container');
  tasks.forEach(task => {      
        initializeTaskDefaults(task);
        createListItemControl(task).then(taskItem => {
        tasksListElement.appendChild(taskItem);
      });
      
  });
}

export { displayTasks };