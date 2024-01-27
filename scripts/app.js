import { PeerConnectionManager } from './peerConnectionManager.js';

import { db, addTaskToDB, fetchTasksFromDB } from './db.js';

import { loadListControl, loadTasks } from './taskList.js';

//initializing peer connection manager
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

  // Add other event listeners as needed
  loadListControl();

  // Example: Connect to a peer upon a button click
  document.getElementById('connect-btn').addEventListener('click', () => {
    const peerId = document.getElementById('peer-id-input').value;
    peerManager.connectToPeer(peerId);
  });

  document.getElementById('copy-p2p-id').addEventListener('click', () => {
    const myPeerId = document.getElementById('my-peer-id').value;
    navigator.clipboard.writeText(myPeerId).then(() => {
        console.log('Text copied to clipboard');
        showToast();
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
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

  document.getElementById('btn-scan-qr').addEventListener('click', () => {
    peerManager.startQRScanner();
  });

}

function showToast(message = "Text copied!", duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show'); // Add 'show' class, keep 'toast' class

  setTimeout(() => {
      toast.classList.remove('show'); // Remove 'show' class, keep 'toast' class
  }, duration);
}


function addTask() {
  const newTaskInput = document.getElementById('new-task');
  const { value: task } = newTaskInput;
  newTaskInput.value = ''; // Clear the input field

  if (task) {
    // Add the task to IndexedDB
    addTaskToDB(task).then(() => {
      // Update the task list display
      loadTasks();
    }).catch(error => console.error(error));
  }
}



