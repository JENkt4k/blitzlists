// peerConnectionManager.js

export class PeerConnectionManager {
    constructor() {
        this.peer = new Peer(); // Assuming Peer.js is being used
        this.connections = new Map(); // Store connections by peer ID

        this.peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
            this.generateQRCode(id);
            document.getElementById('my-peer-id').value = id;
            console.log('generateQRCode called with ID: ' + id);
        });

        this.peer.on('connection', (conn) => {
            this.setupConnectionEventHandlers(conn);
        });
        // Assuming Html5QrcodeScanner is available globally
        this.qrScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
    }

    setupConnectionEventHandlers(conn) {
        conn.on('data', (data) => {
            let messageOut = document.getElementById('message-output');
            messageOut.value += data; 
            console.log('Received data:', data);
            // You can emit custom events or call other methods here
        });

        conn.on('open', () => {
            console.log('Connection opened:', conn.peer);
            document.getElementById('peer-id-input').value = conn.peer;
            this.connections.set(conn.peer, conn);
        });

        conn.on('close', () => {
            console.log('Connection closed:', conn.peer);
            this.connections.delete(conn.peer);
        });
    }

    connectToPeer(peerId) {
        const conn = this.peer.connect(peerId);
        this.setupConnectionEventHandlers(conn);
    }

    sendMessageToPeer(peerId, message) {
        const conn = this.connections.get(peerId);
        if (conn && conn.open) {
            conn.send(message);
        } else {
            console.log('Connection not established or not open.');
        }
    }

    generateQRCode(text) {
        // Empty the container
        const qrContainer = document.getElementById('qrcode');
        qrContainer.innerHTML = '';

        // Generate QR code
        new QRCode(qrContainer, {
            text: text,
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    startQRScanner() {
        this.qrScanner.render((decodedText, decodedResult) => {
            // Use the decoded text to connect to a peer
            this.connectToPeer(decodedText);
        }, (errorMessage) => {
            // handle scan error
            console.log("QR Scanning error:", errorMessage);
        });
    }

    stopQRScanner() {
        this.qrScanner.clear(); // Stop scanning
    }
}
