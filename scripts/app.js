import { PeerConnectionManager } from './peerConnectionManager.js';

import { db, addTaskToDB, fetchTasksFromDB } from './db.js';

import { loadListControl, loadTasks } from './taskList.js';
//import { initializePeer } from "./qrcodegen.js"

let selected = null;

const peerManager = new PeerConnectionManager();

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the app
  initApp();
});

function initApp() {
  // Set up event listeners for UI elements
  const addButton = document.getElementById('add-task-button');

  if (addButton) {
    addButton.addEventListener('click', addTask);
  }

  //initializePeer();

  // Add other event listeners as needed
  loadListControl();

  // Example: Connect to a peer upon a button click
  document.getElementById('connect-btn').addEventListener('click', () => {
    const peerId = document.getElementById('peer-id-input').value;
    peerManager.connectToPeer(peerId);
  });

  // Example: Send a message to a specific peer
  document.getElementById('send-msg-btn').addEventListener('click', () => {
    //you can't send without active connection, lets get it and compare it to the connections
    let peerId = document.getElementById('peer-id-input').value;
    const connectionMap = peerManager.connections;
    if (connectionMap.size > 0) {
      const firstConnectionId = connectionMap.keys[0];
      const hasConnection = peerId != "" && connectionMap.has(peerId);

      peerId = hasConnection  ? peerId : firstConnectionId;
    }

    if (peerId == "") {
      console.log('Connection not established or not open. peerId:', peerId);
    } else {
      const message = document.getElementById('message-input').value;
      peerManager.sendMessageToPeer(peerId, message);      
    }


  });

}

document.getElementById('btn-scan-qr').addEventListener('click', () => {
  peerManager.startQRScanner();
});

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



