import { PeerConnectionManager } from './peerConnectionManager.js';

import { db, addTaskToDB, fetchTasksFromDB } from './db.js';

import { loadListControl, loadTasks } from './taskList.js';

import { loadHeaderControl } from './header.js';
import { loadMenuControl } from './menu.js';

import { loadConnectionFooter } from './footer.js';

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

  loadMenuControl();

  loadHeaderControl();

  // Add other event listeners as needed
  loadListControl();

  loadConnectionFooter(peerManager);

  // // Example: Connect to a peer upon a button click
  // document.getElementById('connect-btn').addEventListener('click', () => {
  //   const peerId = document.getElementById('peer-id-input').value;
  //   peerManager.connectToPeer(peerId);
  // });

  document.getElementById('copy-p2p-id').addEventListener('click', () => {
    const myPeerId = document.getElementById('my-peer-id').value;
    navigator.clipboard.writeText(myPeerId).then(() => {
        console.log('Text copied to clipboard');
        showToast();
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  });

  // // Example: Send a message to a specific peer
  // document.getElementById('send-msg-btn').addEventListener('click', () => {
  //   //you can't send without active connection, lets get it and compare it to the connections
  //   let peerId = document.getElementById('peer-id-input').value;
  //   const connectionMap = peerManager.connections;
  //   if (connectionMap.size > 0) {
  //     const firstConnectionId = connectionMap.keys[0];
  //     const hasConnection = peerId != "" && connectionMap.has(peerId);

  //     peerId = hasConnection  ? peerId : firstConnectionId;
  //   }

  //   if (peerId == "") {
  //     console.log('Connection not established or not open. peerId:', peerId);
  //   } else {
  //     const message = document.getElementById('message-input').value;
  //     peerManager.sendMessageToPeer(peerId, message);      
  //   }


  // });

  // document.getElementById('btn-scan-qr').addEventListener('click', () => {
  //   peerManager.startQRScanner();
  // });

//   document.getElementById('hamburger-menu-button').addEventListener('click', function() {
//     const drawer = document.getElementById('drawer-container');
//     if (drawer.classList.contains('drawer-open')) {
//         drawer.classList.remove('drawer-open');
//         drawer.classList.add('drawer-closed');
//     } else {
//         drawer.classList.remove('drawer-closed');
//         drawer.classList.add('drawer-open');
//     }
// });


}

/**
 * Saving State to localStorage
Whenever the state changes (e.g., a user selects a different task list), save the new state to localStorage. Since localStorage can only store strings, you may need to serialize your state object into a JSON string.
 */
// function saveStateToLocalStorage(state) {
//   const serializedState = JSON.stringify(state);
//   localStorage.setItem('appState', serializedState);
// }

// // Example usage: Save current view
// saveStateToLocalStorage({ currentView: 'taskList', selectedListId: 'list123' });

/**
 * When the application loads, check localStorage for the saved state and restore it.

Example:
 * 
 */
/*function restoreStateFromLocalStorage() {
  const serializedState = localStorage.getItem('appState');
  if (serializedState) {
      return JSON.parse(serializedState);
  }
  return null; // or a default state object
}

const savedState = restoreStateFromLocalStorage();
if (savedState) {
  // Restore the UI based on the saved state
  switchToView(savedState.currentView, savedState.selectedListId);
}
*/


/**
 * 
 * @param {*} message 
 * @param {*} duration 
 */

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



