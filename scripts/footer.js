let footerRoot = null;
function loadFooterControl(peerManager) {
  fetch('/footer.html')
    .then(response => response.text())
    .then(html => {
      footerRoot = document.getElementById('footer-container').innerHTML = html;
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

          peerId = hasConnection ? peerId : firstConnectionId;
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
    });
}


function loadConnectionFooter(peerManager) {
  fetch('/footer.html')
    .then(response => response.text())
    .then(html => {
      footerRoot = document.getElementById('footer-container').innerHTML = html;
      //console.log(html);
      loadFooterControl(peerManager);
    });


}

export { loadConnectionFooter }