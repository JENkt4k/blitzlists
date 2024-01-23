//import {Peer}  from "https://esm.sh/peerjs@1.5.2?bundle-deps"
//import SimplePeer from 'simple-peer.js'

function initializePeer(){
  const peerButton = document.getElementById('initiate-p2p');
  peerButton.addEventListener('click', function() {
    // Initialize a Peer instance
    const peer = new Peer();

    peer.on('open', (id) => {
        // When the peer is ready, generate a QR code with its ID
        generateQRCode(id);
    });

    // Listen for incoming connections
    peer.on('connection', (conn) => {

        document.getElementById('send-msg-btn').addEventListener('click', () => {
            if (conn && conn.open) {
                conn.send('Your message here');
            } else {
                console.log('Connection not established or not open.');
            }
        });

        conn.on('data', (data) => {
            // Handle received data
            console.log('Received:', data);
        });

        conn.on('open', () => {
            conn.send('Hello from the other peer!');
        });
    });

    // Function to handle scanning the QR code of another peer
    function connectToPeer(peerId) {
        const conn = peer.connect(peerId);
        conn.on('open', () => {
            conn.send('Hello from the initiating peer!');
        });
    }
});
}

function generateQRCode(text) {
  // Empty the container
  const qrContainer = document.getElementById('qrcode');
  qrContainer.innerHTML = '';

  // Generate QR code
  new QRCode(qrContainer, {
      text: text,
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
  });
}

export { initializePeer, generateQRCode };